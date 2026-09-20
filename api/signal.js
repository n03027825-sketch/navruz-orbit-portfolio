/* =========================================================
   api/signal.js — "Signal yuborish" formasini Telegram botga ulaydi
   Vercel Serverless Function (Node.js 18+). Qo'shimcha paket kerak emas.

   Vercel → Project → Settings → Environment Variables ga qo'shing:
     TELEGRAM_BOT_TOKEN   — @BotFather bergan token (123456:ABC-...)
     TELEGRAM_CHAT_ID     — xabar boradigan chat ID (sizning shaxsiy ID yoki guruh ID)
     ALLOWED_ORIGIN       — ixtiyoriy: saytingiz manzili, masalan https://navruz.vercel.app

   Token HECH QACHON frontend fayllarga (index.html, js/...) yozilmaydi.
   ========================================================= */

const LIMIT = 5;                 // bitta IP dan ...
const WINDOW_MS = 10 * 60 * 1000; // ... 10 daqiqada ko'pi bilan 5 ta signal
const hits = new Map();           // oddiy himoya (bitta server nusxasi ichida)

const esc = s => String(s ?? '').replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const clean = (s, max) => String(s ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);

function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > LIMIT;
}

module.exports = async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  // Boshqa saytlardan kelgan so'rovlarni rad etish (ALLOWED_ORIGIN berilgan bo'lsa)
  const reqOrigin = req.headers.origin;
  if (origin && reqOrigin && reqOrigin !== origin) return res.status(403).json({ ok: false, error: 'forbidden' });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return res.status(500).json({ ok: false, error: 'not_configured' });

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  // Honeypot: odam ko'rmaydigan maydon to'ldirilgan bo'lsa — bu bot. Jim "ok" qaytaramiz.
  if (body.hp) return res.status(200).json({ ok: true });

  const name = clean(body.name, 80);
  const email = clean(body.email, 120);
  const telegram = clean(body.telegram, 33);
  const message = clean(body.message, 2000);
  const lang = body.lang === 'en' ? 'EN' : 'UZ';
  const page = clean(body.page, 200);

  if (name.length < 2) return res.status(400).json({ ok: false, error: 'name' });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return res.status(400).json({ ok: false, error: 'email' });
  if (telegram && !/^@[A-Za-z0-9_]{5,32}$/.test(telegram)) return res.status(400).json({ ok: false, error: 'telegram' });
  if (message.length < 5) return res.status(400).json({ ok: false, error: 'message' });

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (rateLimited(ip)) return res.status(429).json({ ok: false, error: 'too_many' });

  const time = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent', hour12: false });
  const text =
    `🛰 <b>Yangi signal — portfolio</b>\n\n` +
    `👤 <b>${esc(name)}</b>\n` +
    `✉️ ${esc(email)}\n` +
    (telegram ? `💬 ${esc(telegram)}\n` : '') +
    `🌐 ${lang} · 🕒 ${esc(time)}\n\n` +
    `${esc(message)}` +
    (page ? `\n\n<i>${esc(page)}</i>` : '');

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
        // "Javob yozish" tugmasi — email orqali tez javob berish uchun
        reply_markup: {
          inline_keyboard: [[
            { text: '✉️ Email orqali javob', url: `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}` },
            ...(telegram ? [{ text: '💬 Telegram', url: `https://t.me/${telegram.slice(1)}` }] : [])
          ]]
        }
      })
    });
    const data = await tg.json().catch(() => ({}));
    if (!tg.ok || !data.ok) {
      console.error('Telegram error:', data.description || tg.status);
      return res.status(502).json({ ok: false, error: 'telegram_failed' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('Signal error:', e);
    return res.status(502).json({ ok: false, error: 'network' });
  }
};
