import { Hono } from "hono"
import { cors } from 'hono/cors'

type Bindings = {
  LINE_CHANNEL_ACCESS_TOKEN: string
  LINE_CHANNEL_SECRET: string
  GEMINI_API_KEY: string
  ADMIN_LINE_USER_ID: string
  TELEGRAM_BOT_TOKEN: string
  TELEGRAM_CHAT_ID: string
  DB: D1Database
}

const app = new Hono<{ Bindings: Bindings }>()
// ... (rest of app config and endpoints)

app.use('*', cors({
  origin: ['https://myitdev.com', 'http://localhost:5173', 'https://main.myitdev-web.pages.dev'],
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

app.post("/submit-liff", async (c) => {
  const body = await c.req.json()
  const { name, phone, service, details, userId } = body

  // 1. Save to D1
  await c.env.DB.prepare(
    "INSERT INTO liff_leads (name, phone, service, details) VALUES (?, ?, ?, ?)"
  ).bind(name, phone, service, details).run()

  // 2. Notify Telegram (Admin)
  if (c.env.TELEGRAM_BOT_TOKEN && c.env.TELEGRAM_CHAT_ID) {
    const tgMsg = `📋 *New Service Request (LIFF)*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n🛠 Service: ${service}\n💬 Details: ${details}`
    await fetch(`https://api.telegram.org/bot${c.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: c.env.TELEGRAM_CHAT_ID, text: tgMsg, parse_mode: "Markdown" })
    })
  }

  // 3. Send Flex Message back to user (if userId exists)
  if (userId && c.env.LINE_CHANNEL_ACCESS_TOKEN) {
    const serviceName = {
      'repair': 'ซ่อมคอมพิวเตอร์ / โน๊ตบุ๊ค',
      'web': 'ทำเว็บไซต์ / SEO',
      'software': 'เขียนโปรแกรมเฉพาะทาง',
      'line': 'ทำ LINE Bot อัจฉริยะ',
      'other': 'ปรึกษาปัญหาไอทีอื่นๆ'
    }[service as string] || service;

    const flexMsg = {
      type: "flex",
      altText: "ได้รับข้อมูลการแจ้งซ่อม/ปรึกษาแล้วครับ",
      contents: {
        type: "bubble",
        styles: { header: { backgroundColor: "#020617" }, footer: { separator: true } },
        header: {
          type: "box",
          layout: "vertical",
          contents: [
            { type: "text", text: "MYITDEV SOLUTIONS", color: "#3b82f6", weight: "bold", size: "sm", letterSpacing: "0.1em" },
            { type: "text", text: "RECEIVED SUCCESSFULLY", color: "#ffffff", size: "xl", weight: "bold", margin: "sm" }
          ]
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            { type: "text", text: "เราได้รับข้อมูลความประสงค์ของคุณแล้วครับ เจ้าหน้าที่กำลังตรวจสอบและจะติดต่อกลับโดยเร็วที่สุด", color: "#94a3b8", size: "xs", wrap: true },
            {
              type: "box",
              layout: "vertical",
              margin: "lg",
              spacing: "sm",
              contents: [
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    { type: "text", text: "ชื่อ", color: "#475569", size: "sm", flex: 1 },
                    { type: "text", text: name, wrap: true, color: "#f8fafc", size: "sm", flex: 4 }
                  ]
                },
                {
                  type: "box",
                  layout: "baseline",
                  spacing: "sm",
                  contents: [
                    { type: "text", text: "บริการ", color: "#475569", size: "sm", flex: 1 },
                    { type: "text", text: serviceName, wrap: true, color: "#3b82f6", size: "sm", flex: 4, weight: "bold" }
                  ]
                }
              ]
            }
          ]
        },
        footer: {
          type: "box",
          layout: "vertical",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "primary",
              height: "sm",
              color: "#3b82f6",
              action: { type: "uri", label: "โทรหาช่างด่วน", uri: "tel:0887602708" }
            },
            {
              type: "text",
              text: "สอบถามเพิ่มเติมพิมพ์ทิ้งไว้ได้เลยครับ 😊",
              size: "xxs",
              color: "#94a3b8",
              textAlign: "center",
              margin: "md"
            }
          ]
        }
      }
    };

    await fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${c.env.LINE_CHANNEL_ACCESS_TOKEN}`
      },
      body: JSON.stringify({ to: userId, messages: [flexMsg] })
    });
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

      // 1. ตอบกลับทันที (Priority 1) เพื่อป้องกัน Timeout
      c.executionCtx.waitUntil((async () => {
        let replyMessages: any[] = []

        // Create Carousel Message
        const carouselMsg = {
          type: "template",
          altText: "บริการของเรา MYITDEV.COM",
          template: {
            type: "carousel",
            columns: [
              {
                thumbnailImageUrl: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&q=80&w=800",
                imageBackgroundColor: "#020617",
                title: "ซ่อมคอมพิวเตอร์ / โน๊ตบุ๊ค",
                text: "ตรวจเช็คอาการฟรี! อัปเกรดความแรง กู้ข้อมูล และซ่อมฮาร์ดแวร์ทุกอาการ",
                actions: [
                  { type: "uri", label: "แจ้งซ่อมทันที", uri: "https://liff.line.me/2009380094-gwpeKOqV" },
                  { type: "uri", label: "โทรหาช่าง", uri: "tel:0887602708" }
                ]
              },
              {
                thumbnailImageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
                imageBackgroundColor: "#020617",
                title: "รับทำเว็บไซต์ / SEO",
                text: "เว็บไซต์บริษัท ร้านค้าออนไลน์ และระบบหลังบ้าน พร้อมดันอันดับ Google",
                actions: [
                  { type: "uri", label: "ประเมินราคา", uri: "https://liff.line.me/2009380094-gwpeKOqV" },
                  { type: "uri", label: "ดูผลงาน", uri: "https://myitdev.com/#portfolio" }
                ]
              },
              {
                thumbnailImageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
                imageBackgroundColor: "#020617",
                title: "ทำ LINE Bot / โปรแกรม",
                text: "ระบบตอบกลับอัตโนมัติอัจฉริยะ และซอฟต์แวร์เฉพาะทางเพื่อธุรกิจคุณ",
                actions: [
                  { type: "uri", label: "ปรึกษาช่าง", uri: "https://liff.line.me/2009380094-gwpeKOqV" },
                  { type: "uri", label: "คุยรายละเอียด", uri: "tel:0887602708" }
                ]
              }
            ],
            imageAspectRatio: "rectangle",
            imageSize: "cover"
          }
        };

        replyMessages = [carouselMsg];

        // ส่งข้อความกลับไป LINE
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${c.env.LINE_CHANNEL_ACCESS_TOKEN}`
          },
          body: JSON.stringify({ replyToken, messages: replyMessages })
        });
      })());

      // 2. งานเบื้องหลัง: เก็บ Log และ Tracking (ไม่ขวางการตอบแชท)
      c.executionCtx.waitUntil((async () => {
        try {
          await c.env.DB.prepare("INSERT INTO messages (userId, message) VALUES (?, ?)").bind(userId, userMessage).run();
          
          const profileRes = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
            headers: { "Authorization": `Bearer ${c.env.LINE_CHANNEL_ACCESS_TOKEN}` }
          });
          const profile: any = await profileRes.json();
          const displayName = profile.displayName || "Unknown User";

          await c.env.DB.prepare(`
            INSERT INTO line_leads (userId, displayName, lastMessage, timestamp) 
            VALUES (?, ?, ?, datetime('now'))
            ON CONFLICT(userId) DO UPDATE SET 
              displayName = excluded.displayName,
              lastMessage = excluded.lastMessage,
              timestamp = datetime('now')
          `).bind(userId, displayName, userMessage).run();
        } catch (e) { console.error("Background tasks error:", e); }
      })());
    }
  }

  return c.text("OK")
})

app.get("/test-telegram", async (c) => {
  if (!c.env.TELEGRAM_BOT_TOKEN || !c.env.TELEGRAM_CHAT_ID) return c.text("Missing Telegram Config")
  
  const testMsg = "🚀 MYITDEV System Test: Telegram Connection OK!"
  const url = `https://api.telegram.org/bot${c.env.TELEGRAM_BOT_TOKEN}/sendMessage`
  
  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: c.env.TELEGRAM_CHAT_ID, text: testMsg })
  })
  
  return c.text("Test message sent to Telegram")
})

export default {
  fetch: app.fetch,
  async scheduled(event: any, env: Bindings, ctx: ExecutionContext) {
    // 1. Get Web Contacts
    const { results: webContacts } = await env.DB.prepare(
      "SELECT name, email, subject FROM contacts WHERE timestamp >= datetime('now', '-1 day') ORDER BY timestamp DESC"
    ).all()

    // 2. Get LINE Leads
    const { results: lineLeads } = await env.DB.prepare(
      "SELECT displayName, lastMessage FROM line_leads WHERE timestamp >= datetime('now', '-1 day') ORDER BY timestamp DESC"
    ).all()

    // 3. Get LIFF Leads
    const { results: liffLeads } = await env.DB.prepare(
      "SELECT name, service FROM liff_leads WHERE timestamp >= datetime('now', '-1 day') ORDER BY timestamp DESC"
    ).all()

    let summary = `📊 *Daily Report: MYITDEV.COM*\n`
    summary += `---------------------------\n\n`

    // Section: LIFF Service Requests
    summary += `📝 *Service Requests (LIFF):* ${liffLeads.length}\n`
    if (liffLeads.length > 0) {
      liffLeads.forEach((row: any, i: number) => {
        summary += `  ${i+1}. 🛠 ${row.name} [${row.service}]\n`
      })
    }
    summary += `\n`

    // Section: Web
    summary += `🌐 *Web Contacts:* ${webContacts.length}\n`
    if (webContacts.length > 0) {
      webContacts.forEach((row: any, i: number) => {
        summary += `  ${i+1}. 👤 ${row.name} (${row.subject})\n`
      })
    }
    summary += `\n`

    // Section: LINE Chat
    summary += `🟢 *LINE Chats:* ${lineLeads.length}\n`
    if (lineLeads.length > 0) {
      lineLeads.forEach((row: any, i: number) => {
        summary += `  ${i+1}. 👤 ${row.displayName}: "${row.lastMessage.substring(0, 20)}..."\n`
      })
    }

    if (webContacts.length === 0 && lineLeads.length === 0 && liffLeads.length === 0) {
      summary += `\nเงียบเหงาจังวันนี้... มาพยายามกันต่อครับ! 🚀`
    }

    if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
      const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: summary,
          parse_mode: "Markdown"
        })
      })
    }
  }
}
