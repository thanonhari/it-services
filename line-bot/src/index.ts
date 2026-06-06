import { Hono } from "hono"

type Bindings = {
  AI: any;
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>()

const CHANNEL_ACCESS_TOKEN = "HUHT73hmPLC8qWssfFCMZyRwLn8OHtMceRuFXZvbS2EdLPV9mpo4As+KuG/K0i6RczEblQE65C/6yIVhU9cf4YAdJaVsOKcuOUxDhGdkIKhWexrMxl9K1wpSJN1k70VKDgofLcdKOGyRyYOuA/S7/gdB04t89/1O/w1cDnyilFU="

const SYSTEM_PROMPT = `You are the Expert AI Assistant for MYITDEV.COM (Thailand).
Core Services: Computer Repair, Web Design, Domain/Hosting, Software Dev, LINE Bots.
Location: Chachoengsao. Contact: +66 88 760 2708. Hours: 09:00 - 20:00.
Answer politely in Thai (use "ครับ"). Remember previous context.`;

app.get("/", (c) => c.text("MYITDEV AI Agent is active!"))

app.post("/webhook", async (c) => {
  try {
    const body = await c.req.json()
    const events = body.events || []

    for (const event of events) {
      if (event.type === "message" && event.message.type === "text") {
        const replyToken = event.replyToken
        const userMessage = event.message.text
        const userId = event.source.userId

        // Process AI and Reply in background
        c.executionCtx.waitUntil((async () => {
          try {
            // 1. Ensure User Profile exists in DB and Check AI Status
            let displayName = "LINE User";
            let aiEnabled = 1;
            const profileRes = await fetch(`https://api.line.me/v2/bot/profile/${userId}`, {
              headers: { Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}` }
            });
            if (profileRes.ok) {
              const profile = await profileRes.json() as any;
              displayName = profile.displayName || displayName;
              const res = await c.env.DB.prepare(`
                INSERT INTO line_users (user_id, display_name, picture_url)
                VALUES (?, ?, ?)
                ON CONFLICT(user_id) DO UPDATE SET
                display_name = excluded.display_name,
                last_seen = CURRENT_TIMESTAMP
                RETURNING ai_enabled
              `).bind(userId, displayName, profile.pictureUrl).first();
              if (res) aiEnabled = res.ai_enabled as number;
            }

            // 2. If AI is disabled, just log the user message and stop
            if (aiEnabled === 0) {
              await Promise.all([
                c.env.DB.prepare(
                  "INSERT INTO chat_history (user_id, role, content) VALUES (?, 'user', ?)"
                ).bind(userId, userMessage).run(),
                c.env.DB.prepare(
                  "INSERT INTO leads (name, message, source) VALUES (?, ?, 'line_manual')"
                ).bind(displayName, userMessage).run()
              ]);
              return;
            }

            // 3. Get Conversation Context
            const historyResults = await c.env.DB.prepare(
              "SELECT role, content FROM chat_history WHERE user_id = ? ORDER BY created_at ASC LIMIT 6"
            ).bind(userId).all();
            const chatHistory = (historyResults.results || []).map((row: any) => ({ 
              role: row.role, 
              content: row.content 
            }));

            // 3. Generate AI Response
            const aiResponse = await c.env.AI.run("@cf/meta/llama-3-8b-instruct", {
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                ...chatHistory,
                { role: "user", content: userMessage }
              ]
            });
            const aiText = aiResponse.response || aiResponse.text || "ขออภัยครับ ระบบประมวลผลขัดข้อง กรุณาลองใหม่อีกครั้งครับ";

            // 4. Save to DB (Async/Parallel)
            await Promise.all([
              c.env.DB.prepare(
                "INSERT INTO chat_history (user_id, role, content) VALUES (?, 'user', ?), (?, 'assistant', ?)"
              ).bind(userId, userMessage, userId, aiText).run(),
              c.env.DB.prepare(
                "INSERT INTO leads (name, message, source) VALUES (?, ?, 'line_ai')"
              ).bind(displayName, userMessage).run()
            ]);

            // 5. Send LINE Reply
            await fetch("https://api.line.me/v2/bot/message/reply", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
              },
              body: JSON.stringify({
                replyToken: replyToken,
                messages: [{ type: "text", text: aiText }]
              })
            });
          } catch (innerErr) {
            console.error("Internal Bot Error:", innerErr);
          }
        })());
      }
    }
  } catch (err) {
    console.error("Webhook Entry Error:", err);
  }

  return c.text("OK")
})

export default app
