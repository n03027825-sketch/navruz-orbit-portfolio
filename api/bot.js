/* =========================================================
   api/bot.js — @bot'ning "miyasi" (Telegram webhook, Vercel serverless)
   - /start  → salomlashish + menyu tugmalari (sayt, akademiya, loyihalar, o'yinlar)
   - /kurslar, /loyihalar, /oyinlar, /aloqa
   - Boshqa odam yozgan har qanday xabar → Navro'zga yetkaziladi.
     Navro'z o'sha xabarga "Reply" qilsa → javob o'sha odamga boradi.
   Kerakli Environment Variables (Vercel → Settings):
     TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, TELEGRAM_WEBHOOK_SECRET
   Webhookni ulash (bir marta):  GET /api/bot?setup=<TELEGRAM_WEBHOOK_SECRET>
   ========================================================= */
const SITE = 'https://navruz-orbit.vercel.app';

const TXT = {
  uz: {
    hi: n => `Salom, <b>${n}</b>! 🚀\n\nMen <b>Navro'z Orbitasi</b> botiman. Bu yerda:\n• 🪐 Navro'zning 13 ta loyihasi\n• 🎓 Orbita Akademiya: 12 ta kurs, video-darslar, test va sertifikat\n• 🎮 Brauzerda o'ynaladigan o'yinlar\n\nSavol yoki taklif bo'lsa — shunchaki shu yerga yozing, xabaringiz to'g'ridan-to'g'ri Navro'zga yetadi. ✉️`,
    site: '🌐 Saytni ochish', ac: '🎓 Akademiya', pr: '🪐 Loyihalar', gm: "🎮 O'yinlar", wr: "✉️ Navro'zga yozish", cr: '📚 Kurslar ro\'yxati',
    courses: "🎓 <b>Orbita Akademiya</b> — 12 ta kurs, har birida 6 ta dars: video, tushuntirish, amaliy vazifa va test.\nPython bepul, pullik kurslarning 1-darsi ham bepul. Oxirida — sertifikat.\n\n",
    projects: "🪐 <b>Loyihalar</b> (bosing — ochiladi):\n\n",
    games: "🎮 <b>O'yinlar</b> — hech narsa o'rnatmasdan brauzerda:\n\n",
    write: "✍️ Xabaringizni shu yerga yozing — men uni darhol Navro'zga yetkazaman.",
    sent: "✅ Xabaringiz Navro'zga yetkazildi. Tez orada javob beradi!",
    replied: '✅ Javob yuborildi.', noTarget: "⚠️ Kimga javob berishni topa olmadim — xabarning o'ziga Reply qiling.",
    owner: "\n\n👑 <i>Siz bot egasisiz: kimdir yozsa, xabar shu yerga keladi. O'sha xabarga Reply qilsangiz — javob o'sha odamga boradi.</i>",
    unknown: "Menyudan tanlang yoki savolingizni yozing 👇"
  },
  en: {
    hi: n => `Hi, <b>${n}</b>! 🚀\n\nI'm the <b>Navro'z Orbit</b> bot. Here you'll find:\n• 🪐 Navro'z's 13 projects\n• 🎓 Orbit Academy: 12 courses with video lessons, quizzes and certificates\n• 🎮 Games you can play in the browser\n\nGot a question or an idea? Just type it here — it goes straight to Navro'z. ✉️`,
    site: '🌐 Open the site', ac: '🎓 Academy', pr: '🪐 Projects', gm: '🎮 Games', wr: '✉️ Message Navro\'z', cr: '📚 Course list',
    courses: '🎓 <b>Orbit Academy</b> — 12 courses, 6 lessons each: video, explanation, hands-on task and a quiz.\nPython is free, and the first lesson of every paid course is free. Finish with a certificate.\n\n',
    projects: '🪐 <b>Projects</b> (tap to open):\n\n',
    games: '🎮 <b>Games</b> — play in the browser, nothing to install:\n\n',
    write: "✍️ Type your message here — I'll pass it to Navro'z right away.",
    sent: "✅ Your message was delivered to Navro'z. He'll reply soon!",
    replied: '✅ Reply sent.', noTarget: '⚠️ Could not find who to reply to — reply directly to the forwarded message.',
    owner: "\n\n👑 <i>You own this bot: when someone writes, their message lands here. Reply to it and the answer goes back to them.</i>",
    unknown: 'Pick from the menu or type your question 👇'
  }
};
const { CATALOG } = require('./_lib/catalog');
const PROJECTS = [
  ['☀️ KUNIM', 'https://navruz-kunim.vercel.app'],
  ['⏱ Kun Ritmi', 'https://kun-ritmi.vercel.app'],
  ['✍️ YozAI', 'https://navruz-yozai.vercel.app'],
  ["🧭 Yo'lchi", 'https://navruz-yolchi.vercel.app'],
  ['🌊 Oqim', 'https://navruz-oqim.vercel.app'],
  ['📈 Sales Insight Lab', 'https://navruz-sales-insight.vercel.app'],
  ['🧠 Business Memory', 'https://navruz-business-memory.vercel.app'],
  ['✨ Navruz Universal AI', 'https://navruz-universal-ai.vercel.app']
];
const GAMES = [
  ['🏙 CITY RUSH 3D', 'https://navruz-city-rush.vercel.app'],
  ['⚡ NEON RUSH', 'https://navruz-neon-rush.vercel.app'],
  ['🎯 Chaqqon!', 'https://navruz-chaqqon.vercel.app'],
  ["🐫 Karvon — Ipak yo'li", 'https://navruz-karvon.vercel.app'],
  ["🎮 3D o'yin (Godot 4)", 'https://navruz-3d-game.vercel.app']
];

const esc = s => String(s == null ? '' : s).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const langOf = u => (u && /^en/.test(u.language_code || '') ? 'en' : 'uz');

module.exports = async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const owner = String(process.env.TELEGRAM_CHAT_ID || '');
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  res.setHeader('Cache-Control', 'no-store');
  if (!token || !secret) return res.status(500).json({ ok: false, error: 'not_configured' });

  const api = (method, body) => fetch(`https://api.telegram.org/bot${token}/${method}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
  }).then(r => r.json()).catch(() => ({ ok: false }));

  /* ---- bir martalik sozlash: webhook + buyruqlar menyusi ---- */
  if (req.method === 'GET') {
    if (!req.query || req.query.setup !== secret) return res.status(404).end();
    const hook = await api('setWebhook', { url: SITE + '/api/bot', secret_token: secret, allowed_updates: ['message', 'callback_query'], drop_pending_updates: true });
    await api('setMyCommands', { commands: [
      { command: 'start', description: 'Bosh menyu' }, { command: 'kurslar', description: 'Akademiya kurslari' },
      { command: 'loyihalar', description: "Navro'zning loyihalari" }, { command: 'oyinlar', description: "Brauzer o'yinlari" },
      { command: 'aloqa', description: "Navro'zga yozish" }] });
    await api('setMyCommands', { language_code: 'en', commands: [
      { command: 'start', description: 'Main menu' }, { command: 'kurslar', description: 'Academy courses' },
      { command: 'loyihalar', description: "Navro'z's projects" }, { command: 'oyinlar', description: 'Browser games' },
      { command: 'aloqa', description: "Message Navro'z" }] });
    await api('setMyDescription', { description: "🚀 Navro'z Orbitasi — loyihalar, Orbita Akademiya kurslari va o'yinlar. Savolingizni yozing — Navro'zga yetadi." });
    await api('setMyShortDescription', { short_description: "Navro'z Orbitasi: loyihalar, kurslar, o'yinlar 🚀" });
    return res.status(200).json({ ok: !!hook.ok, webhook: hook.description || null });
  }

  if (req.method !== 'POST') return res.status(405).end();
  if (req.headers['x-telegram-bot-api-secret-token'] !== secret) return res.status(401).end();

  let u = req.body;
  if (typeof u === 'string') { try { u = JSON.parse(u); } catch { u = {}; } }
  u = u || {};

  const menu = L => ({ inline_keyboard: [
    [{ text: TXT[L].site, url: SITE }],
    [{ text: TXT[L].ac, url: SITE + '/akademiya/' }, { text: TXT[L].pr, callback_data: 'pr' }],
    [{ text: TXT[L].gm, callback_data: 'gm' }, { text: TXT[L].cr, callback_data: 'cr' }],
    [{ text: TXT[L].wr, callback_data: 'wr' }]
  ] });
  const listKb = (arr, L) => ({ inline_keyboard: [...arr.map(([n, url]) => [{ text: n, url }]), [{ text: '⬅️ ' + (L === 'en' ? 'Menu' : 'Menyu'), callback_data: 'menu' }]] });
  const courses = L => TXT[L].courses + CATALOG.map(c => `${c.icon} ${esc(c.title)} — ${c.price ? c.price.toLocaleString('ru') + (L === 'en' ? ' UZS' : ' so‘m') : (L === 'en' ? 'free' : 'bepul')}`).join('\n');
  const send = (chat, text, kb) => api('sendMessage', { chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true, reply_markup: kb });

  async function screen(chat, what, L, from) {
    if (what === 'pr') return send(chat, TXT[L].projects + '👇', listKb(PROJECTS, L));
    if (what === 'gm') return send(chat, TXT[L].games + '👇', listKb(GAMES, L));
    if (what === 'cr') return send(chat, courses(L), { inline_keyboard: [[{ text: TXT[L].ac, url: SITE + '/akademiya/' }], [{ text: '⬅️ ' + (L === 'en' ? 'Menu' : 'Menyu'), callback_data: 'menu' }]] });
    if (what === 'wr') return send(chat, TXT[L].write);
    const isOwner = String(chat) === owner;
    return send(chat, TXT[L].hi(esc(from && from.first_name || (L === 'en' ? 'friend' : "do'st"))) + (isOwner ? TXT[L].owner : ''), menu(L));
  }

  try {
    /* tugma bosilganda */
    if (u.callback_query) {
      const q = u.callback_query, L = langOf(q.from), chat = q.message && q.message.chat.id;
      await api('answerCallbackQuery', { callback_query_id: q.id });
      if (chat) await screen(chat, q.data, L, q.from);
      return res.status(200).json({ ok: true });
    }

    const m = u.message;
    if (!m || !m.chat || m.chat.type !== 'private') return res.status(200).json({ ok: true });
    const L = langOf(m.from), chat = String(m.chat.id), text = (m.text || '').trim();

    /* buyruqlar */
    const cmd = (text.match(/^\/(\w+)/) || [])[1];
    if (cmd) {
      const map = { start: 'menu', menu: 'menu', kurslar: 'cr', courses: 'cr', loyihalar: 'pr', projects: 'pr', oyinlar: 'gm', games: 'gm', aloqa: 'wr', contact: 'wr' };
      await screen(chat, map[cmd.toLowerCase()] || 'menu', L, m.from);
      return res.status(200).json({ ok: true });
    }

    /* egasi javob yozyapti → o'sha odamga yuborish */
    if (chat === owner) {
      const rt = m.reply_to_message;
      const idm = rt && (rt.text || rt.caption || '').match(/#id(\d+)/);
      if (idm) {
        const r = await api('copyMessage', { chat_id: idm[1], from_chat_id: chat, message_id: m.message_id });
        await send(chat, r.ok ? TXT[L].replied : '⚠️ ' + (r.description || 'error'));
      } else if (rt) {
        await send(chat, TXT[L].noTarget);
      } else {
        await send(chat, TXT[L].unknown, menu(L));
      }
      return res.status(200).json({ ok: true });
    }

    /* mehmon yozdi → Navro'zga yetkazish */
    if (owner) {
      const f = m.from || {};
      const who = `${esc(f.first_name || '')} ${esc(f.last_name || '')}`.trim() + (f.username ? ` (@${esc(f.username)})` : '');
      const head = `💬 <b>Botga yangi xabar</b>\n👤 ${who}\n#id${chat}\n\n`;
      if (m.text) await send(owner, head + esc(m.text).slice(0, 3500) + '\n\n<i>↩️ Javob berish uchun shu xabarga Reply qiling.</i>');
      else { await send(owner, head + '<i>(media — pastda) · ↩️ Reply qiling</i>'); await api('copyMessage', { chat_id: owner, from_chat_id: chat, message_id: m.message_id }); }
      await send(chat, TXT[L].sent, menu(L));
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(200).json({ ok: true });
  }
};
