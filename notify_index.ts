export interface Env {
  LINE_TOKEN: string;
  LINE_LOGIN_CHANNEL_ID: string;
  LINE_LOGIN_CHANNEL_SECRET: string;
  DB: D1Database;
  AI: any;
}

const ADMIN_USER_ID = 'U479cd1d85a53d6576df48d7c8c6a4930';

const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://myitdev.com',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
};

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/auth/login') {
      const lineUrl = 'https://access.line.me/oauth2/v2.1/authorize?' + new URLSearchParams({
        response_type: 'code',
        client_id: env.LINE_LOGIN_CHANNEL_ID,
        redirect_uri: 'https://notify.myitdev.com/auth/callback',
        state: 'admin',
        scope: 'profile openid',
      }).toString();
      return Response.redirect(lineUrl, 302);
    }

    if (url.pathname === '/auth/callback') {
      const code = url.searchParams.get('code');
      if (!code) return new Response('No code provided', { status: 400 });

      try {
        const tokenRes = await fetch('https://api.line.me/oauth2/v2.1/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'https://notify.myitdev.com/auth/callback',
            client_id: env.LINE_LOGIN_CHANNEL_ID,
            client_secret: env.LINE_LOGIN_CHANNEL_SECRET,
          }),
        });
        
        const tokens = await tokenRes.json();
        if (tokens.error) return new Response('Token Error', { status: 400 });

        const profileRes = await fetch('https://api.line.me/v2/profile', {
          headers: { Authorization: 'Bearer ' + tokens.access_token },
        });
        const profile = await profileRes.json();
        if (profile.error) return new Response('Profile Error', { status: 400 });

        if (profile.userId === ADMIN_USER_ID) {
          return Response.redirect('https://myitdev.com/?auth=' + tokens.access_token + '#admin', 302);
        } else {
          return new Response('Unauthorized User', { status: 403 });
        }
      } catch (err) {
         return new Response('Callback Exception', { status: 500 });
      }
    }

    // 3. API: Get/Update Leads & Stats
    if (url.pathname.startsWith('/api/leads')) {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

      const token = authHeader.replace('Bearer ', '');
      const verifyRes = await fetch('https://api.line.me/v2/profile', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const profile = await verifyRes.json();
      if (profile.userId !== ADMIN_USER_ID) return new Response('Forbidden', { status: 403, headers: corsHeaders });

      if (request.method === 'GET') {
        const leads = await env.DB.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
        const users = await env.DB.prepare('SELECT * FROM line_users ORDER BY last_seen DESC').all();
        
        // Get today's AI message count
        const stats = await env.DB.prepare("SELECT COUNT(*) as count FROM chat_history WHERE role = 'assistant' AND date(created_at) = date('now')").first();
        const aiMessagesToday = stats ? stats.count : 0;

        return new Response(JSON.stringify({ 
          leads: leads.results, 
          users: users.results,
          stats: { aiMessagesToday }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (request.method === 'PATCH') {
        const leadId = url.pathname.split('/').pop();
        const { status, notes } = await request.json();
        await env.DB.prepare('UPDATE leads SET status = COALESCE(?, status), notes = COALESCE(?, notes) WHERE id = ?')
          .bind(status, notes, leadId).run();
        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      }
    }

    // 4. API: Toggle AI Status (Admin Only)
    if (url.pathname.startsWith('/api/users/') && request.method === 'PATCH') {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

      const token = authHeader.replace('Bearer ', '');
      const verifyRes = await fetch('https://api.line.me/v2/profile', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const profile = await verifyRes.json();
      if (profile.userId !== ADMIN_USER_ID) return new Response('Forbidden', { status: 403, headers: corsHeaders });

      try {
        const userId = url.pathname.split('/').pop();
        const { ai_enabled, tags } = await request.json();
        
        if (ai_enabled !== undefined) {
          await env.DB.prepare('UPDATE line_users SET ai_enabled = ? WHERE user_id = ?')
            .bind(ai_enabled ? 1 : 0, userId).run();
        }
        
        if (tags !== undefined) {
          await env.DB.prepare('UPDATE line_users SET tags = ? WHERE user_id = ?')
            .bind(tags, userId).run();
        }

        return new Response(JSON.stringify({ success: true }), { headers: corsHeaders });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 5. API: Direct Push Message (Admin Only)
    if (url.pathname === '/api/push' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

      const token = authHeader.replace('Bearer ', '');
      const verifyRes = await fetch('https://api.line.me/v2/profile', {
        headers: { Authorization: 'Bearer ' + token },
      });
      const profile = await verifyRes.json();
      if (profile.userId !== ADMIN_USER_ID) return new Response('Forbidden', { status: 403, headers: corsHeaders });

      try {
        const { userId, message } = await request.json();
        if (!userId || !message) throw new Error('Missing userId or message');

        const res = await fetch('https://api.line.me/v2/bot/message/push', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.LINE_TOKEN },
          body: JSON.stringify({ to: userId, messages: [{ type: 'text', text: message }] }),
        });

        const result = await res.json();
        return new Response(JSON.stringify(result), { 
          status: res.ok ? 200 : 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 6. API: Get Chat History (Admin Only)
    if (url.pathname.startsWith('/api/history/') && request.method === 'GET') {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

      try {
        const userId = url.pathname.split('/').pop();
        const history = await env.DB.prepare('SELECT * FROM chat_history WHERE user_id = ? ORDER BY created_at ASC')
          .bind(userId).all();
        return new Response(JSON.stringify(history.results), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    // 7. API: Cloudflare AI Gen (Admin Only)
    if (url.pathname === '/api/ai/gen' && request.method === 'POST') {
      const authHeader = request.headers.get('Authorization');
      if (!authHeader) return new Response('Unauthorized', { status: 401, headers: corsHeaders });

      try {
        const { prompt } = await request.json();
        const aiRes = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          messages: [
            { role: 'system', content: 'You are an expert software engineer assistant for MYITDEV. Provide concise and accurate programming solutions.' },
            { role: 'user', content: prompt }
          ]
        });
        
        return new Response(JSON.stringify({ 
          choices: [{ message: { content: aiRes.response } }] 
        }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    if (request.method === 'POST') {
      try {
        const data = await request.json();
        const { bot_type, to, message, name, email, subject, raw_message } = data;
        if (name || email) {
           await env.DB.prepare('INSERT INTO leads (name, email, subject, message, source) VALUES (?, ?, ?, ?, ?)')
            .bind(name, email, subject, raw_message || message, 'website').run();
        }
        let result = { success: true };
        if (bot_type === 'line') {
          const res = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + env.LINE_TOKEN },
            body: JSON.stringify({ to: to, messages: [{ type: 'text', text: message }] }),
          });
          if (!res.ok) result = await res.json();
        }
        return new Response(JSON.stringify(result), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
      }
    }

    return new Response('MYITDEV API Active', { status: 200 });
  },
};
