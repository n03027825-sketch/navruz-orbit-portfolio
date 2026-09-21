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
    hi: n => `Salom, <b>${n}</b>! 🚀\n\nMen <b>Navro'z Orbitasi</b> botiman. Bu yerda:\n• 🪐 Navro'zning 13 ta loyihasi\n• 🎓 Bepul mini-kurslar: Python, Web, AI, Pandas, Telegram bot\n• 🎮 Brauzerda o'ynaladigan o'yinlar\n\nSavol yoki taklif bo'lsa — shunchaki shu yerga yozing, xabaringiz to'g'ridan-to'g'ri Navro'zga yetadi. ✉️`,
    site: '🌐 Saytni ochish', ac: '🎓 Akademiya', pr: '🪐 Loyihalar', gm: "🎮 O'yinlar", wr: "✉️ Navro'zga yozish", cr: '📚 Kurslar ro\'yxati',
    courses: "🎓 <b>Orbita Akademiya</b> — bepul mini-kurslar.\nHar yo'nalishda 3 ta dars: tushuntirish, kod, natija va test.\n\n",
    projects: "🪐 <b>Loyihalar</b> (bosing — ochiladi):\n\n",
    games: "🎮 <b>O'yinlar</b> — hech narsa o'rnatmasdan brauzerda:\n\n",
    write: "✍️ Xabaringizni shu yerga yozing — men uni darhol Navro'zga yetkazaman.",
    sent: "✅ Xabaringiz Navro'zga yetkazildi. Tez orada javob beradi!",
    replied: '✅ Javob yuborildi.', noTarget: "⚠️ Kimga javob berishni topa olmadim — xabarning o'ziga Reply qiling.",
    owner: "\n\n👑 <i>Siz bot egasisiz: kimdir yozsa, xabar shu yerga keladi. O'sha xabarga Reply qilsangiz — javob o'sha odamga boradi.</i>",
    unknown: "Menyudan tanlang yoki savolingizni yozing 👇"
  },
  en: {
    hi: n => `Hi, <b>${n}</b>! 🚀\n\nI'm the <b>Navro'z Orbit</b> bot. Here you'll find:\n• 🪐 Navro'z's 13 projects\n• 🎓 Free mini-courses: Python, Web, AI, Pandas, Telegram bots\n• 🎮 Games you can play in the browser\n\nGot a question or an idea? Just type it here — it goes straight to Navro'z. ✉️`,
    site: '🌐 Open the site', ac: '🎓 Academy', pr: '🪐 Projects', gm: '🎮 Games', wr: '✉️ Message Navro\'z', cr: '📚 Course list',
    courses: '🎓 <b>Orbit Academy</b> — free mini-courses.\nEach track: 3 lessons with explanation, code, output and a quiz.\n\n',
    projects: '🪐 <b>Projects</b> (tap to open):\n\n',
    games: '🎮 <b>Games</b> — play in the browser, nothing to install:\n\n',
    write: "✍️ Type your message here — I'll pass it to Navro'z right away.",
    sent: "✅ Your message was delivered to Navro'z. He'll reply soon!",
    replied: '✅ Reply sent.', noTarget: '⚠️ Could not find who to reply to — reply directly to the forwarded message.',
    owner: "\n\n👑 <i>You own this bot: when someone writes, their message lands here. Reply to it and the answer goes back to them.</i>",
    unknown: 'Pick from the menu or type your question 👇'
  }
};
const TRACKS = [
  ['🐍', 'Python: noldan birinchi dasturgacha', 'Python: from zero to your first program'],
  ['🌐', 'Web: HTML, CSS va JavaScript', 'Web: HTML, CSS and JavaScript'],
  ['🧠', 'AI va prompt muhandisligi', 'AI and prompt engineering'],
  ['📊', "Ma'lumot tahlili: Pandas", 'Data analysis with Pandas'],
  ['🤖', 'Telegram bot yaratish', 'Building a Telegram bot']
];
const PROJECTS = [
  ['✍️ YozAI', 'https://claude.ai/artifact/8FBqdvWQikbSaWaD3E5LEG'],
  ["🧭 Yo'lchi", 'https://claude.ai/artifact/8zMnySHrDV91cCVsphx7cr'],
  ['🌊 Oqim', 'https://claude.ai/artifact/DwVT1kkDfyyqEStYNdkRL4'],
  ['⏱ Kun Ritmi', SITE + '/#demo'],
  ['🧠 Business Memory', SITE + '/#loyihalar'],
  ['✨ Navruz Universal AI', SITE + '/#loyihalar'],
  ['☀️ KUNIM', SITE + '/#loyihalar'],
  ['📈 Sales Insight Lab', SITE + '/#loyihalar']
];
const GAMES = [
  ['🏙 CITY RUSH 3D', 'https://claude.ai/artifact/BeWANnmN36rLd5NUsqZv6Z'],
  ['⚡ NEON RUSH', 'https://claude.ai/artifact/Y2Li52VAixRgSvtUdyt25o'],
  ['🎯 Chaqqon!', 'https://claude.ai/artifact/5iwXZeGpfuY3MAxp88wkpn'],
  ["🐫 Karvon — Ipak yo'li", 'https://claude.ai/artifact/6bBer5Q7Y3ApJ3vabuej1Y']
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
      { command: 'start', description: 'Bosh menyu' }, { command: 'kurslar', description: 'Bepul mini-kurslar' },
      { command: 'loyihalar', description: "Navro'zning loyihalari" }, { command: 'oyinlar', description: "Brauzer o'yinlari" },
      { command: 'aloqa', description: "Navro'zga yozish" }] });
    await api('setMyCommands', { language_code: 'en', commands: [
      { command: 'start', description: 'Main menu' }, { command: 'kurslar', description: 'Free mini-courses' },
      { command: 'loyihalar', description: "Navro'z's projects" }, { command: 'oyinlar', description: 'Browser games' },
      { command: 'aloqa', description: "Message Navro'z" }] });
    await api('setMyDescription', { description: "🚀 Navro'z Orbitasi — loyihalar, bepul mini-kurslar va o'yinlar. Savolingizni yozing — Navro'zga yetadi." });
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
    [{ text: TXT[L].ac, url: SITE + '/#akademiya' }, { text: TXT[L].pr, callback_data: 'pr' }],
    [{ text: TXT[L].gm, callback_data: 'gm' }, { text: TXT[L].cr, callback_data: 'cr' }],
    [{ text: TXT[L].wr, callback_data: 'wr' }]
  ] });
  const listKb = (arr, L) => ({ inline_keyboard: [...arr.map(([n, url]) => [{ text: n, url }]), [{ text: '⬅️ ' + (L === 'en' ? 'Menu' : 'Menyu'), callback_data: 'menu' }]] });
  const courses = L => TXT[L].courses + TRACKS.map(([e, uz, en]) => `${e} ${L === 'en' ? en : uz}`).join('\n');
  const send = (chat, text, kb) => api('sendMessage', { chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true, reply_markup: kb });

  async function screen(chat, what, L, from) {
    if (what === 'pr') return send(chat, TXT[L].projects + '👇', listKb(PROJECTS, L));
    if (what === 'gm') return send(chat, TXT[L].games + '👇', listKb(GAMES, L));
    if (what === 'cr') return send(chat, courses(L), { inline_keyboard: [[{ text: TXT[L].ac, url: SITE + '/#akademiya' }], [{ text: '⬅️ ' + (L === 'en' ? 'Menu' : 'Menyu'), callback_data: 'menu' }]] });
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
