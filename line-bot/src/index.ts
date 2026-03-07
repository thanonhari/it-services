import { Hono } from "hono"

const app = new Hono()

app.get("/", (c) => c.text("MYITDEV LINE Bot is Active!"))

app.post("/webhook", async (c) => {
  const body = await c.req.json()
  const events = body.events || []

  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const replyToken = event.replyToken
      const userMessage = event.message.text
      const channelAccessToken = "HUHT73hmPLC8qWssfFCMZyRwLn8OHtMceRuFXZvbS2EdLPV9mpo4As+KuG/K0i6RczEblQE65C/6yIVhU9cf4YAdJaVsOKcuOUxDhGdkIKhWexrMxl9K1wpSJN1k70VKDgofLcdKOGyRyYOuA/S7/gdB04t89/1O/w1cDnyilFU="

      try {
        await fetch("https://api.line.me/v2/bot/message/reply", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + channelAccessToken
          },
          body: JSON.stringify({
            replyToken: replyToken,
            messages: [{ 
              type: "text", 
              text: "สวัสดีครับ! ยินดีต้อนรับสู่ MYITDEV.COM คุณส่งข้อความมาว่า: " + userMessage
            }]
          })
        })
      } catch (err) {
        console.error("Error sending reply:", err)
      }
    }
  }

  return c.text("OK")
})

export default app
