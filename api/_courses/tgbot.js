module.exports = {
lessons: [
{ v: [
  ['Bot — Telegram ichidagi dastur', 'Telegram bot — foydalanuvchi xabarlariga avtomatik javob beradigan dastur. Do‘konlar, kurslar va xizmatlar botlardan keng foydalanadi.'],
  ['Qanday ishlaydi?', 'Foydalanuvchi xabar yozadi, Telegram uni sizning dasturingizga yetkazadi, dastur javob tayyorlab qaytaradi.'],
  ['BotFather', 'Yangi bot BotFather orqali yaratiladi: newbot buyrug‘ini yozasiz, nom berasiz va token olasiz.', '/newbot\nNom: Orbita yordamchi\nUsername: orbita_help_bot'],
  ['Token — maxfiy kalit', 'Token botni boshqarish kaliti. Uni hech kimga bermang va GitHub’ga yuklamang.']],
  x: 'Bot ikki usulda xabar oladi: **polling** (dastur Telegram’dan doimiy so‘raydi — o‘rganish uchun qulay) va **webhook** (Telegram xabarni sizning serveringizga yuboradi — ishlab chiqarish uchun).\n\nPython’da eng mashhur kutubxona — **aiogram** (asinxron, zamonaviy). Alternativa — `python-telegram-bot`.\n\nTokenni `.env` faylida saqlang va `.gitignore` ga qo‘shing. Token tarqalib ketsa, BotFather’da `/revoke` bilan yangilang.',
  lang: 'bash',
  code: 'python -m venv venv\nsource venv/bin/activate      # Windows: venv\\Scripts\\activate\npip install aiogram python-dotenv\n\necho "BOT_TOKEN=bu_yerga_token" > .env\necho ".env" >> .gitignore',
  q: [
   ['Bot kim orqali yaratiladi?', ['@BotFather','@Telegram','@Admin','@Creator'], 0, 'BotFather.'],
   ['Token qayerda saqlanadi?', ['.env faylida','Kod ichida ochiq','GitHub README’da','Bot tavsifida'], 0, '.env va .gitignore.'],
   ['Xabarni serverga Telegram o‘zi yuboradigan usul?', ['polling','webhook','cron','ftp'], 1, 'Webhook.']] },
{ v: [
  ['Birinchi bot', 'aiogram’da Bot — Telegram bilan aloqa, Dispatcher — xabarlarni tarqatuvchi.', 'from aiogram import Bot, Dispatcher\nbot = Bot(TOKEN)\ndp = Dispatcher()'],
  ['/start buyrug‘i', 'CommandStart filtri /start xabarini tutadi va handler funksiya javob beradi.', '@dp.message(CommandStart())\nasync def start(msg):\n    await msg.answer("Salom!")'],
  ['Echo', 'Filtrsiz handler istalgan xabarni tutadi. Oddiy misol — xabarni qaytarib yuborish.'],
  ['Ishga tushirish', 'start_polling botni ishga tushiradi. Terminalni yopsangiz, bot to‘xtaydi.']],
  x: '`async`/`await` — asinxron dasturlash: bot bir vaqtda minglab foydalanuvchiga javob bera oladi, bittasini kutib qolmaydi.\n\n`message.from_user.first_name` — foydalanuvchi ismi, `message.text` — yozgan matni, `message.chat.id` — suhbat raqami.\n\nHandlerlar yuqoridan pastga tekshiriladi: aniqroq filtrlarni (buyruqlar) umumiy handlerdan yuqoriga yozing.',
  lang: 'python',
  code: 'import asyncio, os\nfrom aiogram import Bot, Dispatcher\nfrom aiogram.filters import CommandStart\nfrom aiogram.types import Message\nfrom dotenv import load_dotenv\n\nload_dotenv()\nbot = Bot(os.getenv("BOT_TOKEN"))\ndp = Dispatcher()\n\n@dp.message(CommandStart())\nasync def start(msg: Message):\n    await msg.answer(f"Salom, {msg.from_user.first_name}! 🚀")\n\n@dp.message()\nasync def echo(msg: Message):\n    await msg.answer(f"Siz yozdingiz: {msg.text}")\n\nasyncio.run(dp.start_polling(bot))',
  q: [
   ['Xabarlarni handlerlarga tarqatuvchi?', ['Bot','Dispatcher','Router emas','Token'], 1, 'Dispatcher.'],
   ['Javob yuborish metodi?', ['msg.send()','msg.answer()','msg.reply_all()','bot.print()'], 1, 'message.answer.'],
   ['Foydalanuvchi ismi?', ['msg.name','msg.from_user.first_name','msg.user','msg.chat.title'], 1, 'from_user.first_name.']] },
{ v: [
  ['Klaviatura tugmalari', 'Reply tugmalar yozish maydoni o‘rnida chiqadi va bosilganda matn yuboradi.', 'ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="📚 Kurslar")]])'],
  ['Inline tugmalar', 'Inline tugmalar xabar ostida turadi. Ular havola ochishi yoki callback yuborishi mumkin.'],
  ['Callback', 'Inline tugma bosilganda callback_query keladi. Uning data qiymatiga qarab javob beramiz.', '@dp.callback_query(F.data == "narx")\nasync def narx(cb):\n    await cb.message.answer("Narxlar...")'],
  ['Menyu tuzish', 'Yaxshi bot menyusi 3–5 ta aniq tugmadan iborat: kurslar, to‘lov, aloqa, yordam.']],
  x: '**Reply** klaviatura — oddiy va doimiy menyu uchun. **Inline** klaviatura — xabarga bog‘liq tanlovlar (masalan, kursni tanlash) uchun.\n\nCallback data 64 baytdan oshmasin. Uni `kurs:python` kabi qisqa formatda bering va ajratib o‘qing.\n\nCallbackdan so‘ng `await cb.answer()` chaqiring — aks holda tugma “yuklanmoqda” holatida qolib ketadi.',
  lang: 'python',
  code: 'from aiogram import F\nfrom aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton\n\nkurslar = InlineKeyboardMarkup(inline_keyboard=[\n    [InlineKeyboardButton(text="🐍 Python", callback_data="kurs:python")],\n    [InlineKeyboardButton(text="🌐 Sayt", url="https://navruz-orbit.vercel.app/akademiya/")],\n])\n\n@dp.message(F.text == "📚 Kurslar")\nasync def menyu(msg: Message):\n    await msg.answer("Kursni tanlang:", reply_markup=kurslar)\n\n@dp.callback_query(F.data.startswith("kurs:"))\nasync def tanlandi(cb):\n    await cb.answer()\n    await cb.message.answer(f"Siz tanladingiz: {cb.data.split(\':\')[1]}")',
  q: [
   ['Xabar ostidagi tugmalar?', ['Reply','Inline','Footer','Menu'], 1, 'Inline klaviatura.'],
   ['Inline tugma bosilganda keladi?', ['message','callback_query','update_text','click'], 1, 'callback_query.'],
   ['Callbackdan keyin chaqirish kerak?', ['cb.answer()','cb.close()','bot.stop()','hech narsa'], 0, 'Yuklanish belgisi yo‘qoladi.']] },
{ v: [
  ['Ma’lumot saqlash', 'Bot qayta ishga tushsa, xotiradagi o‘zgaruvchilar yo‘qoladi. Foydalanuvchilarni bazada saqlash kerak.'],
  ['SQLite bilan', 'Kichik bot uchun SQLite yetarli — bitta fayl, o‘rnatish shart emas.', 'CREATE TABLE users (id INTEGER PRIMARY KEY, ism TEXT, qoshilgan TEXT)'],
  ['Foydalanuvchini yozish', '/start da foydalanuvchi id sini bazaga qo‘shamiz. INSERT OR IGNORE takror yozuvni oldini oladi.'],
  ['Statistika', 'Endi admin uchun /stat buyrug‘i: nechta foydalanuvchi borligini ko‘rsatadi.']],
  x: 'Telegram foydalanuvchi `id` si noyob va o‘zgarmaydi — uni asosiy kalit sifatida ishlating.\n\nKattaroq loyihalar uchun PostgreSQL va asinxron drayverlar (`asyncpg`, `aiosqlite`) tavsiya etiladi.\n\n**Admin tekshiruvi**: `if msg.from_user.id != ADMIN_ID: return` — maxfiy buyruqlarni himoya qiling. Foydalanuvchi ma’lumotini boshqalarga bermang.',
  lang: 'python',
  code: 'import sqlite3, datetime\n\nbaza = sqlite3.connect("bot.db")\nbaza.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, ism TEXT, sana TEXT)")\n\ndef qoshish(uid, ism):\n    baza.execute("INSERT OR IGNORE INTO users VALUES (?, ?, ?)",\n                 (uid, ism, datetime.date.today().isoformat()))\n    baza.commit()\n\ndef soni():\n    return baza.execute("SELECT COUNT(*) FROM users").fetchone()[0]',
  q: [
   ['Bot o‘chsa, oddiy o‘zgaruvchidagi ma’lumot?', ['Saqlanadi','Yo‘qoladi','Telegram saqlaydi','Faylga o‘tadi'], 1, 'Doimiy saqlash uchun baza kerak.'],
   ['Takroriy yozuvni oldini olish?', ['INSERT OR IGNORE','INSERT TWICE','UPDATE ALL','DROP'], 0, 'INSERT OR IGNORE.'],
   ['Foydalanuvchining noyob belgisi?', ['Ism','Telegram id','Familiya','Rasm'], 1, 'from_user.id.']] },
{ v: [
  ['Anketa muammosi', 'Ro‘yxatdan o‘tishda ism, telefon va kursni ketma-ket so‘rash kerak. Bot qaysi savolda turganini eslab qolishi lozim.'],
  ['FSM — holatlar mashinasi', 'FSM har bir foydalanuvchining joriy bosqichini saqlaydi: ism kutilmoqda, telefon kutilmoqda.', 'class Royxat(StatesGroup):\n    ism = State()\n    telefon = State()'],
  ['Holatni o‘tkazish', 'Javob kelgach, uni saqlaymiz va keyingi holatga o‘tamiz.', 'await state.update_data(ism=msg.text)\nawait state.set_state(Royxat.telefon)'],
  ['Yakunlash', 'Oxirida barcha ma’lumotni olib, holatni tozalaymiz va foydalanuvchiga tasdiq yuboramiz.']],
  x: 'aiogram 3 da FSM `FSMContext` orqali ishlaydi. Standart xotira — `MemoryStorage` (bot o‘chsa tozalanadi); ishlab chiqarishda Redis ishlatiladi.\n\nHar bir qadamda kiritmani tekshiring: telefon raqami formatini, bo‘sh xabarni. Noto‘g‘ri bo‘lsa, shu holatda qolib qayta so‘rang.\n\n“/bekor” buyrug‘i bilan anketadan chiqish imkonini bering — bu foydalanuvchiga hurmat.',
  lang: 'python',
  code: 'from aiogram.fsm.state import State, StatesGroup\nfrom aiogram.fsm.context import FSMContext\n\nclass Royxat(StatesGroup):\n    ism = State()\n    telefon = State()\n\n@dp.message(F.text == "/royxat")\nasync def boshla(msg: Message, state: FSMContext):\n    await state.set_state(Royxat.ism)\n    await msg.answer("Ismingiz?")\n\n@dp.message(Royxat.ism)\nasync def ism(msg: Message, state: FSMContext):\n    await state.update_data(ism=msg.text)\n    await state.set_state(Royxat.telefon)\n    await msg.answer("Telefon raqamingiz?")\n\n@dp.message(Royxat.telefon)\nasync def tel(msg: Message, state: FSMContext):\n    data = await state.update_data(telefon=msg.text)\n    await state.clear()\n    await msg.answer(f"Rahmat, {data[\'ism\']}! Ro‘yxatdan o‘tdingiz ✅")',
  q: [
   ['FSM nima uchun?', ['Foydalanuvchi bosqichini eslab qolish','Rasm yuborish','To‘lov','Tezlik'], 0, 'Holatlar mashinasi.'],
   ['Holat ma’lumotini saqlash?', ['state.update_data()','state.save_all()','msg.store()','bot.keep()'], 0, 'update_data.'],
   ['Anketa tugagach?', ['state.clear()','state.delete_bot()','bot.close()','Hech narsa'], 0, 'Holat tozalanadi.']] },
{ v: [
  ['Bot 24/7 ishlashi kerak', 'Kompyuteringiz o‘chsa, bot ham to‘xtaydi. Shuning uchun uni serverga joylaymiz.'],
  ['Variantlar', 'VPS server (DigitalOcean, Hetzner), PaaS (Railway, Render) yoki serverless webhook (Vercel). Har birining narxi va qulayligi har xil.'],
  ['Webhook', 'Serverless muhitda bot webhook bilan ishlaydi: Telegram har bir xabarni sizning URL manzilingizga yuboradi.', 'https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://sayt.uz/api/bot'],
  ['Real misol', 'Navro‘z Orbitasi sayti yonidagi bot aynan shunday ishlaydi: Vercel funksiyasi Telegram xabarlarini qabul qilib, javob beradi.']],
  x: 'VPS’da botni doimiy ishlatish uchun `systemd` xizmati yoki `pm2`/`supervisor` ishlatiladi — server qayta yuklansa, bot o‘zi yonadi.\n\nWebhook uchun HTTPS manzil shart. Xavfsizlik: `secret_token` parametrini bering va har so‘rovda `X-Telegram-Bot-Api-Secret-Token` sarlavhasini tekshiring.\n\nLoglarni kuzating: xatolar faylga yoki monitoring xizmatiga yozilsin, shunda muammoni tez topasiz.',
  lang: 'bash',
  code: '# /etc/systemd/system/orbita-bot.service\n[Unit]\nDescription=Orbita Telegram bot\nAfter=network.target\n\n[Service]\nWorkingDirectory=/home/bot/orbita\nExecStart=/home/bot/orbita/venv/bin/python main.py\nRestart=always\nEnvironmentFile=/home/bot/orbita/.env\n\n[Install]\nWantedBy=multi-user.target',
  q: [
   ['Bot doim ishlashi uchun?', ['Serverga joylash','Kompyuterni yoqib qo‘yish yagona yo‘l','Telefonga o‘rnatish','Tokenni o‘zgartirish'], 0, 'Server 24/7 ishlaydi.'],
   ['Webhook uchun nima shart?', ['HTTPS manzil','Windows','Katta RAM','USB'], 0, 'Telegram faqat HTTPS’ga yuboradi.'],
   ['Webhook so‘rovini tekshirish sarlavhasi?', ['X-Telegram-Bot-Api-Secret-Token','Authorization-Bot','X-Bot-Id','Cookie'], 0, 'secret_token tekshiruvi.']] }
],
exam: [
 ['Bot tokeni qayerdan olinadi?', ['@BotFather','@Durov','Google','Play Market'], 0],
 ['aiogram qaysi tilda?', ['Python','JavaScript','Go','PHP'], 0],
 ['/start ni tutuvchi filtr?', ['CommandStart()','F.text == "start"','StartFilter','OnStart'], 0],
 ['Inline tugma bosilishi?', ['callback_query','message','inline_text','press'], 0],
 ['Anketa bosqichlari uchun?', ['FSM','CSS','SQL JOIN','Git'], 0],
 ['Foydalanuvchilarni doimiy saqlash?', ['Ma’lumotlar bazasi','print()','Oddiy o‘zgaruvchi','Klaviatura'], 0],
 ['Tokenni qayerga yozmaslik kerak?', ['GitHub’dagi kodga','.env ga','Server sozlamasiga','Parol menejeriga'], 0],
 ['Webhook nima?', ['Telegram xabarni serverga o‘zi yuborishi','Botning nomi','Tugma turi','Xato'], 0],
 ['async def nimani bildiradi?', ['Asinxron funksiya','Xato','Sikl','Klass'], 0],
 ['Callbackdan keyin?', ['await cb.answer()','bot.restart()','state.clear()','exit()'], 0]
]
};
