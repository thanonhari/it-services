import { Hono } from "hono"
import { cors } from 'hono/cors'

type Bindings = {
  LINE_CHANNEL_ACCESS_TOKEN: string
  LINE_CHANNEL_SECRET: string
  GEMINI_API_KEY: string
  ADMIN_LINE_USER_ID: string
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', cors({
  origin: ['https://myitdev.com', 'http://localhost:5173'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

const SYSTEM_INSTRUCTION = `คุณคือ AI Assistant ของ MYITDEV.COM (มาย-ไอที-เดฟ) 
ผู้ให้บริการด้านไอทีครบวงจรในจังหวัดฉะเชิงเทรา
บริการประกอบด้วย: ซ่อมคอมพิวเตอร์, ทำเว็บไซต์, เขียนโปรแกรม, ทำ LINE Bot
บุคลิกภาพ: สุภาพ ลงท้ายด้วย "ครับ" เสมอ เป็นมืออาชีพ
คำแนะนำพิเศษ: หากลูกค้าถามเรื่องราคา ให้บอกว่า "ราคาเริ่มต้นเป็นกันเอง รบกวนทิ้งรายละเอียดไว้เพื่อให้เจ้าหน้าที่ประเมินราคาที่แม่นยำและติดต่อกลับครับ"`

const FALLBACK_MSG = "ขออภัยครับ ขณะนี้ระบบอัตโนมัติขัดข้อง รบกวนทิ้งคำถามไว้ แล้วจะมีเจ้าหน้าที่ติดต่อกลับโดยเร็วที่สุดครับ";

app.get("/", (c) => c.text("MYITDEV AI Bot is Active! Status: Debug Mode"))

app.post("/submit-form", async (c) => {
  const body = await c.req.json()
  const { name, email, subject, message } = body

  // 1. Save to D1
  await c.env.DB.prepare(
    "INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)"
  ).bind(name, email, subject, message).run()

  // 2. Send LINE Notification to Admin
  if (c.env.ADMIN_LINE_USER_ID && c.env.LINE_CHANNEL_ACCESS_TOKEN) {
    const adminMessage = `🔔 *New Contact Form*\n\n👤 Name: ${name}\n📧 Email: ${email}\n📌 Subject: ${subject}\n💬 Message: ${message}`
    
    await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${c.env.LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({
        to: c.env.ADMIN_LINE_USER_ID,
        messages: [{ type: "text", text: adminMessage }]
      })
    })
  }

  return c.json({ success: true })
})

app.post("/webhook", async (c) => {
  const bodyText = await c.req.text()
  let data;
  try {
    data = JSON.parse(bodyText)
  } catch (e) { return c.text("Bad Request", 400) }

  const events = data.events || []

  for (const event of events) {
    if (event.type === "message" && event.message && event.message.type === "text") {
      const replyToken = event.replyToken
      const userMessage = event.message.text.trim()
      const userId = event.source.userId

      // Log to D1
      c.executionCtx.waitUntil(
        c.env.DB.prepare("INSERT INTO messages (userId, message) VALUES (?, ?)").bind(userId, userMessage).run()
      )

      let replyMessages: any[] = []

      // Menu Buttons
      if (userMessage === "บริการของเรา") {
        replyMessages = [{ type: "text", text: "🔧 บริการของ MYITDEV:\n1. ซ่อมคอม/โน๊ตบุ๊ค\n2. ทำเว็บไซต์/SEO\n3. เขียนโปรแกรมตามสั่ง\n4. ทำ LINE Bot\n\nดูรายละเอียดเพิ่ม: https://myitdev.com/#services" }]
      } else if (userMessage === "ติดต่อเรา") {
        replyMessages = [{ type: "text", text: "📞 ติดต่อเรา\nEmail: info@myitdev.com\nพิกัด: ฉะเชิงเทรา\nทิ้งข้อความไว้ที่นี่ได้เลยครับ" }]
      } else {
        // --- GEMINI REST API CALL ---
        try {
          // ลองใช้ v1 แทน v1beta
          const apiURL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${c.env.GEMINI_API_KEY}`;
          
          const geminiResponse = await fetch(apiURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: `${SYSTEM_INSTRUCTION}\n\nลูกค้าถามว่า: "${userMessage}"` }]
              }]
            })
          });

          const geminiData: any = await geminiResponse.json();
          
          if (geminiData.candidates && geminiData.candidates[0].content.parts[0].text) {
            replyMessages = [{ type: "text", text: geminiData.candidates[0].content.parts[0].text }];
          } else {
            // ถ้า AI ตอบกลับมาแปลกๆ ให้ส่ง Error Code ไปด้วยเพื่อ Debug
            const errCode = geminiData.error ? geminiData.error.status : "UNKNOWN_AI_ERR";
            replyMessages = [{ type: "text", text: `${FALLBACK_MSG}\n(Code: ${errCode})` }];
          }
        } catch (aiErr: any) {
          replyMessages = [{ type: "text", text: `${FALLBACK_MSG}\n(Code: FETCH_ERR)` }];
        }
      }

      // --- SEND REPLY TO LINE ---
      try {
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${c.env.LINE_CHANNEL_ACCESS_TOKEN}`
          },
          body: JSON.stringify({ replyToken, messages: replyMessages })
        })
      } catch (err) { console.error("Line Send Error:", err) }
    }
  }

  return c.text("OK")
})

export default app
