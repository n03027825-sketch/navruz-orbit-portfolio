/* =========================================================
   data.js — barcha matnlar (UZ / EN) va loyiha ma'lumotlari
   Yangi matn qo'shish: DICT ga kalit qo'shing va HTML'da
   data-i18n="kalit" deb yozing.
   ========================================================= */
window.NV = window.NV || {};

/* ---- SOZLAMALAR ----
   signalEndpoint: forma xabarni yuboradigan manzil (api/signal.js).
   telegramUser:   ixtiyoriy — server ishlamay qolsa ko'rsatiladigan "Telegram" tugmasi uchun
                   o'zingizning @username'ingiz (masalan 'navruz_dev'). Bo'sh qoldirsangiz tugma chiqmaydi. */
NV.CONFIG = {
  signalEndpoint: '/api/signal',
  telegramUser: ''
};

NV.DICT = {
  uz: {
    'nav.projects':'Loyihalar','nav.demo':'To’lov','nav.skills':'Ko’nikmalar','nav.process':'Jarayon','nav.contact':'Aloqa','nav.cta':'Bog’lanish',
    'dock.home':'Yer','dock.projects':'Loyihalar','dock.demo':'To’lov','dock.ai':'AI','dock.contact':'Aloqa',
    'hero.status':'Yangi loyihalar uchun ochiq · 2026',
    'hero.build':'Men quraman:',
    'hero.lead':'Python, AI va ma’lumotlar bilan real muammolarga sodda, ishlaydigan yechimlar yarataman. Kichik biznesdan tortib mehnat muhojirlarigacha — har bir loyiha bitta savoldan boshlanadi: bu kimga va qanday yordam beradi?',
    'hero.cta1':'Sayohatni boshlash','hero.cta2':'AI bilan suhbat',
    'hero.s1':'loyiha orbitada','hero.s2':'texnologiya yo’nalishi','hero.s3':'bosqichli ish usuli',
    'hero.hint':'Sayyorani bosing — loyiha ochiladi',
    'hero.scroll':'Pastga — Quyosh tizimi bo’ylab',
    'proj.title':'G’oyadan <em>demogacha</em>',
    'proj.lead':'Suring, strelkani bosing yoki ← → tugmalaridan foydalaning. “Batafsil” — loyihaning to’liq missiya fayli.',
    'proj.more':'Batafsil','proj.ask':'AI’dan so’rash',
    'demo.title':'Bugun qanday <em>ritmdasiz?</em>',
    'demo.lead':'Kun Ritmi — holatingizni tanlaysiz, ilova unga mos uchta aniq qadam beradi. Bu rasm emas: holatni tanlang, qadamlarni belgilang, natijani ko’ring.',
    'demo.about':'Loyiha haqida','demo.q':'Bugun qanday ritmdasiz?','demo.live':'JONLI DEMO',
    'demo.prog':'{n} / 3 qadam bajarildi',
    'skills.title':'Nima bilan <em>quraman</em>',
    'skills.lead':'Texnologiyani o’zi uchun emas, muammoni yechish uchun o’rganaman. Kartani bosing — qanday ishlatishim ochiladi.',
    'proc.title':'Taxmin emas — <em>natija</em>',
    'proc.lead':'Har bir mahsulot shu to’rt bosqichdan o’tadi. Bosqichni bosib ko’ring.',
    'quote.label':'Tamoyillar',
    'contact.title':'Keling, birga <em>uchiramiz</em>',
    'contact.lead':'G’oya, hamkorlik yoki loyiha bo’yicha savol bormi? Yozing. Email manzilini bir bosishda nusxalab olishingiz mumkin.',
    'contact.signal':'Signal to’g’ridan-to’g’ri Telegram’ga boradi',
    'f.name':'Ismingiz','f.email':'Email','f.msg':'Xabaringiz','f.send':'Signal yuborish',
    'f.e.name':'Ismingizni yozing','f.e.email':'Email to’g’ri emas — masalan: ism@gmail.com','f.e.msg':'Xabar juda qisqa — kamida bir jumla yozing',
    'f.check':'Maydonlarni tekshiring',
    'f.okTitle':'Signal yetib bordi, {name}!','f.okText':'Xabaringiz Telegram orqali Navro’zga yetkazildi. Javob tez orada email yoki Telegram’ingizga keladi.',
    'f.openMail':'Email’da ochish','f.again':'Yangi xabar','f.toast':'Signal Telegram’ga yuborildi',
    'f.tg':'Telegram (ixtiyoriy)','f.e.tg':'Telegram username 5–32 belgi: harf, raqam yoki _ (masalan @navruz_dev)','f.sending':'Yuborilmoqda…',
    'f.failTitle':'Signal yetib bormadi','f.failText':'Server hozir javob bermadi.','f.copiedNote':'Xabaringiz nusxalandi — uni email orqali yuborishingiz mumkin.','f.retry':'Qayta urinish',
    'f.slowTitle':'Biroz kuting','f.slowText':'Juda ko’p signal yuborildi. Bir necha daqiqadan so’ng qayta urinib ko’ring.',
    'mail.copied':'Email nusxalandi',
    'foot.motto':'Kichik qadamlar + doimiylik = katta natija','foot.top':'Yerga qaytish',
    'jump.small':'Giper-sakrash','jump.big':'Yerga qaytish',
    'm.next':'Keyingi loyiha','m.ask':'AI’dan so’rash','m.collab':'Hamkorlik','m.close':'Yopish',
    'm.status':'Holat','m.area':'Yo’nalish','m.stack':'Texnologiyalar','m.feats':'Asosiy imkoniyatlar','m.nextstep':'Keyingi qadam:',
    'm.collabMsg':'Salom! {p} loyihasi bo’yicha gaplashmoqchi edim.',
    'chat.title':'Orbita AI','chat.sub':'AI ustoz · loyihalar va 72 dars bazasi','chat.ph':'Savol yozing…','chat.open':'AI yordamchi','chat.drag':'Sudrang yoki bosing',
    'chat.hello':'Salom! Men Orbita AI. Navro’zning loyihalari, texnologiyalari yoki hamkorlik haqida so’rang.',
    'hud.from':'Quyoshdan','hud.light':'Yorug’lik yo’li',
    'arrive':'Yetib keldik',
    'toast.lang':'O’zbek tili yoqildi','toast.warp':'Warp tezligi yoqildi','toast.hello':'Salom! Orbita AI sizni kutmoqda',
    'toast.moodAll':'Barakalla! Bugungi 3 qadam bajarildi','toast.mood':'{m} ritmi tanlandi',
    'aria.menuPrev':'Oldingi','aria.menuNext':'Keyingi'
  },
  en: {
    'nav.projects':'Projects','nav.demo':'Payment','nav.skills':'Skills','nav.process':'Process','nav.contact':'Contact','nav.cta':'Let’s talk',
    'dock.home':'Earth','dock.projects':'Projects','dock.demo':'Payment','dock.ai':'AI','dock.contact':'Contact',
    'hero.status':'Open to new projects · 2026',
    'hero.build':'I build:',
    'hero.lead':'I build simple, working solutions to real problems with Python, AI and data. From small businesses to labour migrants — every project starts with one question: who is this for, and how does it help?',
    'hero.cta1':'Start the journey','hero.cta2':'Chat with AI',
    'hero.s1':'projects in orbit','hero.s2':'technology areas','hero.s3':'step working method',
    'hero.hint':'Tap a planet to open a project',
    'hero.scroll':'Scroll — across the Solar System',
    'proj.title':'From idea <em>to demo</em>',
    'proj.lead':'Swipe, tap the arrows or use ← →. “Details” opens each project’s full mission file.',
    'proj.more':'Details','proj.ask':'Ask AI',
    'demo.title':'What’s your <em>rhythm</em> today?',
    'demo.lead':'Kun Ritmi — pick how you feel and the app gives you three concrete matching steps. This isn’t a picture: choose a state, tick the steps, see the result.',
    'demo.about':'About the project','demo.q':'What’s your rhythm today?','demo.live':'LIVE DEMO',
    'demo.prog':'{n} / 3 steps done',
    'skills.title':'What I <em>build with</em>',
    'skills.lead':'I learn technology to solve problems, not for its own sake. Tap a card to see how I use it.',
    'proc.title':'Results, <em>not guesses</em>',
    'proc.lead':'Every product goes through these four stages. Tap a stage to explore it.',
    'quote.label':'Principles',
    'contact.title':'Let’s <em>launch</em> together',
    'contact.lead':'Have an idea, a partnership or a question about a project? Write to me. You can copy the email address in one tap.',
    'contact.signal':'Your signal goes straight to Telegram',
    'f.name':'Your name','f.email':'Email','f.msg':'Your message','f.send':'Send signal',
    'f.e.name':'Please enter your name','f.e.email':'That email doesn’t look right — e.g. name@gmail.com','f.e.msg':'Message is too short — write at least one sentence',
    'f.check':'Please check the fields',
    'f.okTitle':'Signal received, {name}!','f.okText':'Your message reached Navro’z on Telegram. Expect a reply by email or Telegram soon.',
    'f.openMail':'Open in email','f.again':'New message','f.toast':'Signal sent to Telegram',
    'f.tg':'Telegram (optional)','f.e.tg':'Telegram username: 5–32 letters, digits or _ (e.g. @navruz_dev)','f.sending':'Sending…',
    'f.failTitle':'Signal didn’t get through','f.failText':'The server isn’t responding right now.','f.copiedNote':'Your message was copied — you can send it by email instead.','f.retry':'Try again',
    'f.slowTitle':'Please wait a moment','f.slowText':'Too many signals were sent. Try again in a few minutes.',
    'mail.copied':'Email copied',
    'foot.motto':'Small steps + consistency = big results','foot.top':'Back to Earth',
    'jump.small':'Hyperjump','jump.big':'Back to Earth',
    'm.next':'Next project','m.ask':'Ask AI','m.collab':'Collaborate','m.close':'Close',
    'm.status':'Status','m.area':'Area','m.stack':'Stack','m.feats':'Key features','m.nextstep':'Next step:',
    'm.collabMsg':'Hi! I’d like to talk about the {p} project.',
    'chat.title':'Orbit AI','chat.sub':'AI tutor · projects + 72-lesson base','chat.ph':'Ask something…','chat.open':'AI assistant','chat.drag':'Drag or tap',
    'chat.hello':'Hi! I’m Orbit AI. Ask me about Navro’z’s projects, tech stack or working together.',
    'hud.from':'From the Sun','hud.light':'Light travel',
    'arrive':'Arrived at',
    'toast.lang':'English enabled','toast.warp':'Warp speed engaged','toast.hello':'Hi! Orbit AI is waiting for you',
    'toast.moodAll':'Well done! All 3 steps complete','toast.mood':'{m} rhythm selected',
    'aria.menuPrev':'Previous','aria.menuNext':'Next'
  }
};

NV.TYPED = {
  uz:['AI mahsulotlar','biznes uchun tahlil','ta’lim platformalari','foydali Telegram botlar','realistik 3D o’yin'],
  en:['AI products','analytics for business','learning platforms','useful Telegram bots','a realistic 3D game']
};

/* Quyosh tizimi sektorlari — masofalar Quyoshdan o'rtacha, AU (astronomik birlik) */
NV.SECTORS = [
  {id:'top',        au:1.00,  c:'#6CB8FF', name:{uz:'Yer',en:'Earth'},
    fact:{uz:'Hayot borligi ma’lum bo’lgan yagona sayyora.',en:'The only world known to host life.'}},
  {id:'loyihalar',  au:1.52,  c:'#FF7A45', name:{uz:'Mars',en:'Mars'},
    fact:{uz:'Olimp tog’i — Quyosh tizimidagi eng baland vulqon shu yerda.',en:'Home of Olympus Mons, the tallest volcano in the Solar System.'}},
  {id:'tolov',      au:2.7,   c:'#C9B79C', name:{uz:'Asteroidlar kamari',en:'Asteroid belt'},
    fact:{uz:'Eng katta obyekti — mitti sayyora Tserera.',en:'Its largest object is the dwarf planet Ceres.'}},
  {id:'konikmalar', au:5.20,  c:'#E0A96D', name:{uz:'Yupiter',en:'Jupiter'},
    fact:{uz:'Buyuk Qizil Dog’ — Yerdan ham kengroq bo’ron.',en:'The Great Red Spot is a storm wider than Earth.'}},
  {id:'jarayon',    au:9.54,  c:'#F1D48A', name:{uz:'Saturn',en:'Saturn'},
    fact:{uz:'Halqalari asosan muz bo’laklaridan iborat.',en:'Its rings are made mostly of chunks of water ice.'}},
  {id:'tamoyillar', au:30.07, c:'#4F78FF', name:{uz:'Neptun',en:'Neptune'},
    fact:{uz:'Quyosh tizimidagi eng kuchli shamollar shu yerda esadi.',en:'The fastest winds in the Solar System blow here.'}},
  {id:'aloqa',      au:120,   c:'#B79CFF', name:{uz:'Geliopauza',en:'Heliopause'},
    fact:{uz:'Quyosh shamoli tugaydigan chegara. Voyager 1 uni 2012-yilda kesib o’tgan.',en:'Where the solar wind ends. Voyager 1 crossed it in 2012.'}}
];

NV.CATS = [['all',{uz:'Hammasi',en:'All'}],['ai',{uz:'AI',en:'AI'}],['biznes',{uz:'Biznes',en:'Business'}],['talim',{uz:'Ta’lim',en:'Education'}],['samaradorlik',{uz:'Samaradorlik',en:'Productivity'}],['ijtimoiy',{uz:'Ijtimoiy',en:'Social'}],['oyin',{uz:'O’yinlar',en:'Games'}]];

NV.PROJECTS = [
 {id:'bm',link:'https://navruz-business-memory.vercel.app',icon:'brain',c1:'#6CE4F0',c2:'#1f6f8a',cats:['ai','biznes'],key:['business','memory'],
  name:{uz:'Business Memory',en:'Business Memory'},
  status:{uz:'Ishlaydigan demo',en:'Working demo'}, area:{uz:'AI · Biznes',en:'AI · Business'},
  short:{uz:'Kichik biznes uchun AI “xotira”: savdo, xarajat va mijozlar bir joyda — AI esa ulardan tavsiya chiqaradi.',
         en:'An AI “memory” for small businesses: sales, expenses and customers in one place — and AI turns them into advice.'},
  desc:{uz:'Kichik biznes egasi ma’lumotlarini daftar, Excel va Telegram orasida yo’qotadi. Business Memory savdo, xarajat va mijozlar haqidagi ma’lumotni bitta joyga yig’adi va AI’ni biznesning xotirasi sifatida ishlatadi — “nima qilsam foyda oshadi?” degan savolga ma’lumotga tayangan javob beradi.',
        en:'Small-business owners lose their data between notebooks, Excel and Telegram. Business Memory brings sales, expenses and customer information into one place and uses AI as the business’s memory — answering “what should I do to grow profit?” with evidence, not guesses.'},
  feats:{uz:['Savdo, xarajat va mijozlar bitta joyda','AI tavsiyalari — biznes “xotirasi”','Kichik biznes uchun sodda interfeys','Qarorlar taxmin emas, ma’lumot asosida'],
         en:['Sales, expenses and customers in one place','AI recommendations — the business “memory”','A simple interface built for small shops','Decisions based on data, not guesses']},
  next:{uz:'Real do’kon ma’lumotlari bilan demo sinovi.',en:'Pilot the demo with a real shop’s data.'},
  tags:['Python','AI','Analytics']},
 {id:'yolchi',link:'https://navruz-yolchi.vercel.app',icon:'route',c1:'#FFB547',c2:'#8a4a00',cats:['ijtimoiy'],key:['yolchi','yo’lchi',"yo'lchi"],
  name:{uz:'Yo’lchi',en:'Yo’lchi'},
  status:{uz:'Konsepsiya',en:'Concept'}, area:{uz:'Ijtimoiy startup',en:'Social startup'},
  short:{uz:'Xorijda ish izlayotgan o’zbeklarni vositachilar firibgarligidan himoya qiluvchi axborot xizmati.',
         en:'An information service protecting Uzbeks seeking work abroad from recruitment fraud.'},
  desc:{uz:'Mehnat migratsiyasidagi eng katta og’riq — ortiqcha pul undiradigan va aldaydigan vositachilar. Yo’lchi yo’lni ochiq ko’rsatadi: agentlik litsenziyasini tekshirish, haqiqiy xarajatni hisoblash va har bir davlat uchun qadam-baqadam yo’l xaritasi. Migrantlar uchun bepul; daromad litsenziyali agentliklar va o’quv markazlaridan. Logotip — ikkiga ayrilgan “Y” yo’l, uning bitta tarmog’i tasdiqlangan.',
        en:'The biggest pain in labour migration is middlemen who overcharge and deceive. Yo’lchi makes the path transparent: check an agency’s licence, calculate the real cost, and follow a step-by-step route for each destination. Free for migrants; revenue comes from licensed agencies and training centres. The logo is a forked “Y” road with one verified branch.'},
  feats:{uz:['Litsenziya tekshiruvchi','Haqiqiy xarajat kalkulyatori','Har bir davlat uchun yo’l xaritasi','“Qizil bayroqlar” ro’yxati','Til tayyorgarligi: EPS-TOPIK, patent imtihoni','Anonim xabarlar Migratsiya agentligiga'],
         en:['Licence checker','Real-cost calculator','Step-by-step route for each country','Red-flag checklist','Language prep: EPS-TOPIK, work-patent exam','Anonymous reports routed to the Migration Agency']},
  next:{uz:'Uch tilli (UZ · RU · EN) sayt va litsenziya bazasi.',en:'Trilingual (UZ · RU · EN) site and licence database.'},
  tags:['Web','UZ · RU · EN','Social impact']},
 {id:'yozai',link:'https://navruz-yozai.vercel.app',icon:'pen',c1:'#FF5D8F',c2:'#7a1638',cats:['ai','talim'],key:['yozai','yoz ai'],
  name:{uz:'YozAI',en:'YozAI'},
  status:{uz:'Ishlab chiqilmoqda',en:'In development'}, area:{uz:'AI · Ta’lim',en:'AI · Education'},
  short:{uz:'A2–B1 darajadagi o’quvchilar uchun 4 haftalik AI ingliz tili yozish dasturi — izohlar o’zbek tilida.',
         en:'A 4-week AI English-writing programme for A2–B1 learners — with feedback in Uzbek.'},
  desc:{uz:'O’quvchi matn yozadi, AI xatolarni o’zbek tilida tushuntiradi, so’ng o’quvchi yaxshilangan variantni qayta yuboradi. Aynan “yoz → tushun → qayta yoz” halqasi yozish ko’nikmasini tez o’stiradi. Telefon raqami va SMS orqali kirish, Telegram bot bilan ulanish va uch tilli interfeys rejalashtirilgan.',
        en:'The student writes, AI explains the mistakes in Uzbek, and the student resubmits an improved version. That “write → understand → rewrite” loop is what grows writing skill fast. Phone + SMS login, Telegram bot connection and a trilingual interface are planned.'},
  feats:{uz:['4 haftalik tuzilgan dastur','O’zbek tilida AI izohlar','Qayta yozish halqasi','Telefon + SMS orqali kirish','Telegram bot integratsiyasi','UZ · RU · EN interfeys'],
         en:['Structured 4-week programme','AI feedback in Uzbek','Rewrite loop','Phone + SMS login','Telegram bot integration','UZ · RU · EN interface']},
  next:{uz:'Haqiqiy karta to’lovlari va saytni internetga chiqarish.',en:'Real card payments and putting the site online.'},
  tags:['AI / LLM','NLP','EdTech']},
 {id:'uai',link:'https://navruz-universal-ai.vercel.app',icon:'spark',c1:'#B79CFF',c2:'#3d2a8a',cats:['ai','talim'],key:['universal'],
  name:{uz:'Navruz Universal AI',en:'Navruz Universal AI'},
  status:{uz:'Demo rejimida ishlaydi',en:'Running in demo mode'}, area:{uz:'AI yordamchi',en:'AI assistant'},
  short:{uz:'Matematika, ta’lim, biznes va kundalik savollar uchun kontekstni tushunadigan AI yordamchi.',
         en:'A context-aware AI assistant for maths, learning, business and everyday questions.'},
  desc:{uz:'Suhbat kontekstini eslab qoladigan universal yordamchi: matematika masalasi, dars mavzusi, biznes savoli yoki oddiy kundalik muammo. Asosiy qarorlar — OpenAI API, xavfsiz backend, suhbat konteksti va xavfsizlik choralari.',
        en:'A universal assistant that remembers the conversation: a maths problem, a lesson topic, a business question or an everyday issue. Key decisions: OpenAI API, a secure backend, conversation context and safety measures.'},
  feats:{uz:['OpenAI API asosida','Xavfsiz backend — kalit brauzerga chiqmaydi','Suhbat kontekstini saqlash','Xavfsizlik choralari'],
         en:['Built on the OpenAI API','Secure backend — the key never reaches the browser','Keeps conversation context','Safety measures']},
  next:{uz:'Shu saytdagi Orbita AI’ni unga ulash.',en:'Connect it to this site’s Orbit AI.'},
  tags:['OpenAI API','Backend','Python']},
 {id:'kunim',link:'https://navruz-kunim.vercel.app',icon:'sun',c1:'#FFD66B',c2:'#8a6a00',cats:['samaradorlik'],key:['kunim'],
  name:{uz:'KUNIM',en:'KUNIM'},
  status:{uz:'Ishga tushgan',en:'Live'}, area:{uz:'Samaradorlik',en:'Productivity'},
  short:{uz:'O’zbek tilidagi kun tartibi ilovasi: vazifalar, fokus taymer, streak va tangalar evaziga sovg’alar.',
         en:'An Uzbek daily-routine app: tasks, focus timer, streaks and coins you spend on rewards.'},
  desc:{uz:'KUNIM kunni o’yinga aylantiradi. Vazifalarni vaqtga qo’yasiz, fokus taymer bilan ishlaysiz, brauzerning o’zi yaratgan fokus tovushlarini tinglaysiz. Har bir bajarilgan ish — tanga, ketma-ket kunlar — streak, tangalar esa sovg’a do’konida sarflanadi.',
        en:'KUNIM turns your day into a game. Schedule tasks, work with a focus timer and listen to focus sounds generated right in the browser. Every finished task earns coins, consecutive days build a streak, and coins are spent in the reward shop.'},
  feats:{uz:['Vaqtga bog’langan vazifalar','Fokus taymer','Brauzerda yaratiladigan fokus tovushlari','Haftalik ko’rinish','Streak va tangalar','Sovg’a do’koni'],
         en:['Scheduled tasks','Focus timer','Browser-generated focus sounds','Weekly view','Streaks and coins','Reward shop']},
  next:{uz:'Haqiqiy foydalanuvchilar bilan sinov va statistikani o’lchash.',en:'Test with real users and measure the stats.'},
  tags:['JavaScript','UX','Gamification']},
 {id:'oqim',link:'https://navruz-oqim.vercel.app',icon:'wave',c1:'#5CF2B5',c2:'#0e6a4a',cats:['biznes','talim'],key:['oqim'],
  name:{uz:'Oqim',en:'Oqim'},
  status:{uz:'Lokal ishlab chiqish',en:'Local development'}, area:{uz:'Biznes · Ta’lim',en:'Business · Education'},
  short:{uz:'O’quv markazlari uchun admin panel: o’quvchilar, guruhlar va oylik to’lovlar nazorati.',
         en:'An admin panel for learning centres: students, groups and monthly payments.'},
  desc:{uz:'O’quv markazi rahbari kim to’lagan, kim qarzdor va qaysi guruhda nechta o’quvchi borligini bir qarashda ko’rishi kerak. Oqim — o’zbek tilidagi admin panel: o’quvchilar, guruhlar va oylik to’lovlar bir oqimda. Hozir Vite bilan lokal rivojlanmoqda.',
        en:'A learning-centre manager needs to see at a glance who has paid, who owes and how many students each group has. Oqim is an Uzbek-language admin panel keeping students, groups and monthly payments in one flow. Currently in local development with Vite.'},
  feats:{uz:['O’quvchilar bazasi','Guruhlar boshqaruvi','Oylik to’lovlar nazorati','O’zbek tilidagi interfeys'],
         en:['Student database','Group management','Monthly payment tracking','Uzbek-language interface']},
  next:{uz:'Birinchi o’quv markazida sinov.',en:'Pilot at a first learning centre.'},
  tags:['Vite','JavaScript','Admin panel']},
 {id:'sil',link:'https://navruz-sales-insight.vercel.app',icon:'chart',c1:'#6CA8FF',c2:'#1d3f8a',cats:['biznes'],key:['sales','insight'],
  name:{uz:'Sales Insight Lab',en:'Sales Insight Lab'},
  status:{uz:'Ishga tushgan',en:'Live'}, area:{uz:'Ma’lumot tahlili',en:'Data analysis'},
  short:{uz:'CSV savdo ma’lumotini tozalab, KPI hisoblab, grafik va biznes xulosasiga aylantiradigan laboratoriya.',
         en:'A lab that cleans CSV sales data, calculates KPIs and turns them into charts and business conclusions.'},
  desc:{uz:'Xom CSV fayl hech narsa demaydi. Sales Insight Lab ma’lumotni Pandas bilan tozalaydi, asosiy KPI’larni hisoblaydi va natijani vizual ko’rsatadi — oxirida esa raqamlar emas, biznes uchun aniq xulosa chiqadi.',
        en:'A raw CSV says nothing. Sales Insight Lab cleans the data with Pandas, calculates the key KPIs and visualises the results — ending not with numbers but with a clear business conclusion.'},
  feats:{uz:['CSV ma’lumotni tozalash','KPI hisoblash','Vizualizatsiya','Tahlildan biznes xulosasiga'],
         en:['CSV data cleaning','KPI calculation','Visualisation','From analysis to business conclusions']},
  next:{uz:'Business Memory bilan birlashtirish.',en:'Merge into Business Memory.'},
  tags:['Pandas','Data cleaning','Data viz']},
 {id:'ritm',link:'https://kun-ritmi.vercel.app',icon:'pulse',c1:'#FF8A5C',c2:'#8a2d10',cats:['samaradorlik'],key:['ritm','rhythm'],
  name:{uz:'Kun Ritmi',en:'Kun Ritmi'},
  status:{uz:'Ishga tushgan',en:'Live'}, area:{uz:'Samaradorlik',en:'Productivity'},
  short:{uz:'Holatingizni tanlang — ilova unga mos uchta aniq qadam beradi. Kunlik tarix va haftalik hisobot bilan.',
         en:'Pick your state and the app gives you three matching steps. With daily history and a weekly report.'},
  desc:{uz:'“Bugun qanday ritmdasiz?” — Sokin, Tetik, Charchoq yoki Ilhomli. Har bir holat uchun uchta aniq, bajariladigan qadam: masalan, “Eng muhim vazifani hoziroq boshlang” yoki “Telefonni 40 daqiqaga chetga qo’ying”. Kichik, lekin har kuni ishlaydigan vosita.',
        en:'“What’s your rhythm today?” — Calm, Energised, Tired or Inspired. Each state gets three concrete, doable steps, such as “Start your most important task right now” or “Put your phone away for 40 minutes”. Small, but useful every single day.'},
  feats:{uz:['4 ta ritm holati, har biriga 3 ta aniq qadam','Kunlik tarix va bir jumlalik natija','Haftalik hisobot, streak va maslahat','Telefonga o’rnatiladi, internetsiz ishlaydi','UZ · EN, CSV eksport'],
         en:['4 rhythm states, 3 concrete steps each','Daily history with a one-line result','Weekly report, streak and a tip','Installs on your phone, works offline','UZ · EN, CSV export']},
  next:{uz:'Telegram bot orqali kundalik eslatma.',en:'Daily reminders through a Telegram bot.'},
  tags:['JavaScript','UX','Minimal']},
 {id:'game',link:'https://navruz-3d-game.vercel.app',icon:'game',c1:'#E25CFF',c2:'#5a1470',cats:['oyin'],key:['o‘yin','oyin','game','godot','3d'],
  name:{uz:'3D o’yin',en:'3D game'},
  status:{uz:'Jarayonda',en:'In progress'}, area:{uz:'GameDev',en:'GameDev'},
  short:{uz:'Godot 4’da realistik ko’rinishdagi 3D o’yin — keyinchalik Play Market, App Store va brauzerda.',
         en:'A realistic-looking 3D game in Godot 4 — later on Play Market, the App Store and the web.'},
  desc:{uz:'Maqsad — odam kirib, zavqlanib, xursand bo’lib chiqadigan, jonli ko’rinadigan 3D o’yin. Oddiy mini-o’yin emas, jiddiy loyiha. Godot 4 dvigatelida qurilmoqda; tayyor bo’lgach Play Market, App Store va brauzerga chiqariladi.',
        en:'The goal: a lifelike 3D game people enter, enjoy and leave happy. Not a mini-game — a serious project. It is being built in the Godot 4 engine and, once ready, will ship to Play Market, the App Store and browsers.'},
  feats:{uz:['Godot 4 dvigateli','Realistik 3D muhit','Mobil va web’ga chiqarish rejasi','Universitet portfoliosi uchun asosiy loyiha'],
         en:['Godot 4 engine','Realistic 3D world','Planned mobile and web release','Flagship project for my university portfolio']},
  next:{uz:'O’ynaladigan birinchi daraja.',en:'A first playable level.'},
  tags:['Godot 4','3D','GameDev']},
 {id:'city',link:'https://navruz-city-rush.vercel.app',icon:'rocket',c1:'#FFB547',c2:'#7a3d00',cats:['oyin'],key:['city','rush','shahar'],
  name:{uz:'CITY RUSH 3D',en:'CITY RUSH 3D'},
  status:{uz:'O’ynaladigan prototip',en:'Playable prototype'}, area:{uz:'GameDev · Brauzer',en:'GameDev · Browser'},
  short:{uz:'Brauzerda ishlaydigan 3D shahar poygasi — to’siqlardan qochib, tezlikni oshirib boring.',
         en:'A 3D city runner that plays right in the browser — dodge obstacles and keep the speed up.'},
  desc:{uz:'CITY RUSH 3D — hech narsa o’rnatmasdan brauzerda ochiladigan 3D o’yin prototipi. Maqsad: tez yuklanadigan, telefonda ham, kompyuterda ham o’ynaladigan dinamik o’yin tajribasini sinab ko’rish. Bu katta Godot loyihasi oldidan 3D harakat, kamera va boshqaruvni mashq qilish maydoni.',
        en:'CITY RUSH 3D is a 3D game prototype that opens in the browser with nothing to install. The goal is to test a fast-loading, dynamic game feel that works on both phone and desktop — a practice ground for 3D movement, camera and controls ahead of the bigger Godot project.'},
  feats:{uz:['Brauzerda 3D grafika','Klaviatura va sensorli boshqaruv','Tezlashib boruvchi daraja','O’rnatishsiz — havola orqali o’ynash'],
         en:['3D graphics in the browser','Keyboard and touch controls','Speed that ramps up','No install — play from a link']},
  next:{uz:'Rekordlar jadvali va yangi xaritalar.',en:'A leaderboard and new maps.'},
  tags:['JavaScript','3D','Game']},
 {id:'neon',link:'https://navruz-neon-rush.vercel.app',icon:'bolt',c1:'#5CF2FF',c2:'#0b4a70',cats:['oyin'],key:['neon'],
  name:{uz:'NEON RUSH',en:'NEON RUSH'},
  status:{uz:'O’ynaladigan prototip',en:'Playable prototype'}, area:{uz:'GameDev · Arkada',en:'GameDev · Arcade'},
  short:{uz:'Neon uslubidagi tezkor arkada o’yini — reaksiya va ritm sinovi.',
         en:'A fast neon-style arcade game that tests your reflexes and rhythm.'},
  desc:{uz:'NEON RUSH — yorqin neon uslubidagi arkada o’yini. Qisqa, tez va yana bir marta o’ynagingiz keladigan sessiyalar uchun qurilgan. Loyiha orqali o’yin sikli, ochko tizimi va vizual effektlar ustida ishlandi.',
        en:'NEON RUSH is an arcade game in a bright neon style, built for short, fast, “one more try” sessions. The project was a way to work on the game loop, scoring and visual effects.'},
  feats:{uz:['Neon vizual uslub','Tezkor arkada sikli','Ochko va rekord','Telefon va kompyuterda ishlaydi'],
         en:['Neon visual style','Fast arcade loop','Score and best score','Works on phone and desktop']},
  next:{uz:'Ovoz effektlari va qiyinlik darajalari.',en:'Sound effects and difficulty levels.'},
  tags:['JavaScript','Canvas','Arcade']},
 {id:'chaqqon',link:'https://navruz-chaqqon.vercel.app',icon:'star',c1:'#FF5D8F',c2:'#7a1638',cats:['oyin','talim'],key:['chaqqon','mini'],
  name:{uz:'Chaqqon!',en:'Chaqqon!'},
  status:{uz:'O’ynaladigan prototip',en:'Playable prototype'}, area:{uz:'O’zbekona mini-o’yinlar',en:'Uzbek mini-games'},
  short:{uz:'O’zbekona ruhdagi qisqa mini-o’yinlar to’plami — tezkorlik va diqqat uchun.',
         en:'A collection of short mini-games with an Uzbek flavour — for speed and focus.'},
  desc:{uz:'Chaqqon! — o’zbek madaniyatidan ilhomlangan mini-o’yinlar to’plami. Har bir o’yin bir necha soniyalik, lekin diqqat va chaqqonlikni sinaydi. Maqsad — mahalliy ruhdagi, oila bilan birga o’ynasa bo’ladigan yengil o’yinlar.',
        en:'Chaqqon! (“Quick!”) is a set of mini-games inspired by Uzbek culture. Each game lasts only seconds but tests attention and quickness. The aim is light games with a local feel that a whole family can play.'},
  feats:{uz:['Bir nechta mini-o’yin','O’zbekona mavzular','Qisqa, tez sessiyalar','O’zbek tilidagi interfeys'],
         en:['Several mini-games','Uzbek themes','Short, quick sessions','Uzbek-language interface']},
  next:{uz:'Yangi mini-o’yinlar va do’stlar bilan bellashuv.',en:'More mini-games and challenges with friends.'},
  tags:['JavaScript','Casual','UZ']},
 {id:'karvon',link:'https://navruz-karvon.vercel.app',icon:'route',c1:'#E0A96D',c2:'#6a4012',cats:['oyin','talim'],key:['karvon','ipak','silk'],
  name:{uz:'Karvon — Ipak yo’li',en:'Karvon — Silk Road'},
  status:{uz:'O’ynaladigan prototip',en:'Playable prototype'}, area:{uz:'Strategiya · Tarix',en:'Strategy · History'},
  short:{uz:'Buyuk Ipak yo’li bo’ylab karvon boshqaradigan savdo-strategiya o’yini.',
         en:'A trading strategy game where you lead a caravan along the Great Silk Road.'},
  desc:{uz:'Karvon — Ipak yo’li shaharlari orasida savdo qiladigan strategiya o’yini. Qayerda arzon olib, qayerda qimmat sotishni o’ylab, karvoningizni o’stirasiz. O’yin orqali tarix va oddiy iqtisod tushunchalari qiziqarli tarzda o’rganiladi.',
        en:'Karvon is a strategy game about trading between Silk Road cities. You grow your caravan by deciding where to buy cheap and where to sell high — learning a bit of history and simple economics along the way.'},
  feats:{uz:['Ipak yo’li shaharlari','Savdo va narxlar','Karvonni rivojlantirish','Tarix + iqtisod o’yin orqali'],
         en:['Silk Road cities','Trading and prices','Grow your caravan','History and economics through play']},
  next:{uz:'Tasodifiy voqealar va saqlash tizimi.',en:'Random events and save games.'},
  tags:['JavaScript','Strategy','History']}
];

NV.MOODS = [
 {k:{uz:'Sokin',en:'Calm'},ic:'moon',c:'#6CE4F0',s:{uz:['Kunning uchta asosiy ishini yozib qo’ying','20 daqiqa jim sharoitda chuqur ishlang','Kechqurun natijani bir jumlada qayd eting'],en:['Write down today’s three key tasks','Do 20 minutes of deep work in silence','In the evening, note the result in one sentence']}},
 {k:{uz:'Tetik',en:'Energised'},ic:'bolt',c:'#FFB547',s:{uz:['Eng muhim vazifani hoziroq boshlang','Telefonni 40 daqiqaga chetga qo’ying','Natijani bir jumlada qayd eting'],en:['Start your most important task right now','Put your phone away for 40 minutes','Note the result in one sentence']}},
 {k:{uz:'Charchoq',en:'Tired'},ic:'battery',c:'#FF5D8F',s:{uz:['10 daqiqa toza havoda yuring','Faqat bitta kichik vazifani tanlang','Bugun erta uxlashni rejalashtiring'],en:['Walk in fresh air for 10 minutes','Pick just one small task','Plan to sleep early tonight']}},
 {k:{uz:'Ilhomli',en:'Inspired'},ic:'star',c:'#B79CFF',s:{uz:['Yangi g’oyani 5 daqiqada qog’ozga tushiring','G’oyaning eng kichik demosini boshlang','Bitta odamga g’oyani aytib, fikr so’rang'],en:['Put the new idea on paper in 5 minutes','Start the smallest possible demo','Tell one person and ask for feedback']}}
];

NV.SKILLS = [
 ['py','Python',{uz:'Asosiy tilim',en:'My main language'},{uz:'Backend mantiq, ma’lumot tahlili va avtomatlashtirish — deyarli har bir loyiha Python’dan boshlanadi.',en:'Backend logic, data analysis and automation — almost every project starts in Python.'}],
 ['table','Pandas',{uz:'Ma’lumot tozalash va tahlil',en:'Data cleaning & analysis'},{uz:'CSV/Excel’ni tozalash, KPI hisoblash va hisobotga aylantirish — Sales Insight Lab shu asosda.',en:'Cleaning CSV/Excel, calculating KPIs and turning them into reports — Sales Insight Lab is built on it.'}],
 ['brain','AI / LLM · NLP',{uz:'Prompting va til modellari',en:'Prompting & language models'},{uz:'YozAI izohlari, Universal AI va Business Memory tavsiyalari shu yerda tug’iladi.',en:'Where YozAI feedback, Universal AI and Business Memory recommendations come from.'}],
 ['code','JS · HTML · CSS',{uz:'Responsive, animatsiya, a11y',en:'Responsive, animation, a11y'},{uz:'KUNIM, Kun Ritmi va Oqim interfeyslari — bu sayt ham shu uchlikda.',en:'The interfaces of KUNIM, Kun Ritmi and Oqim — and this very site.'}],
 ['git','Git & GitHub',{uz:'Versiya nazorati',en:'Version control'},{uz:'Har bir loyiha repozitoriyda; saytlarni GitHub orqali internetga chiqarish.',en:'Every project lives in a repo; sites go live through GitHub.'}],
 ['plug','API',{uz:'Qurish va ulash',en:'Building & integrating'},{uz:'OpenAI API’ni xavfsiz backend orqali ulash — kalit hech qachon brauzerga chiqmaydi.',en:'Connecting the OpenAI API through a secure backend — the key never reaches the browser.'}],
 ['send',{uz:'Telegram botlar',en:'Telegram bots'},{uz:'Foydalanuvchi turgan joyda',en:'Where users already are'},{uz:'O’zbekistonda odamlar Telegram’da — shuning uchun mahsulot ham u yerga boradi.',en:'In Uzbekistan people live in Telegram — so the product goes there too.'}],
 ['gear',{uz:'Avtomatlashtirish',en:'Automation'},{uz:'CSV/Excel va data pipeline',en:'CSV/Excel & data pipelines'},{uz:'Takrorlanadigan qo’l ishini skriptga topshirish — tejalgan vaqt o’lchanadi.',en:'Handing repetitive manual work to scripts — and measuring the time saved.'}],
 ['server','Backend',{uz:'Server mantiq',en:'Server logic'},{uz:'Ma’lumot saqlash, xavfsizlik va API — ko’rinmaydigan, lekin hammasini ushlab turadigan qism.',en:'Storage, security and APIs — the invisible part that holds everything together.'}],
 ['table','SQL',{uz:'Ma’lumotlar bazasi',en:'Databases'},{uz:'SELECT, JOIN, GROUP BY — biznes savoliga bazadan to’g’ridan-to’g’ri javob olish.',en:'SELECT, JOIN, GROUP BY — answering business questions straight from the database.'}],
 ['brain','Machine Learning',{uz:'Bashorat modellari',en:'Predictive models'},{uz:'scikit-learn bilan regressiya va klassifikatsiya: ma’lumotdan o’rganib, kelajakni taxmin qiladigan model.',en:'Regression and classification with scikit-learn: models that learn from data to predict.'}],
 ['gear',{uz:'Algoritmlar',en:'Algorithms'},{uz:'Big-O va ma’lumot tuzilmalari',en:'Big-O & data structures'},{uz:'Qidiruv, saralash, stek, navbat, graf — kodni tez va tejamkor qilish uchun.',en:'Search, sorting, stacks, queues, graphs — to make code fast and efficient.'}],
 ['plug',{uz:'To’lov integratsiyasi',en:'Payment integration'},{uz:'Payme · Click · Visa',en:'Payme · Click · Visa'},{uz:'Orbita Akademiya’da Payme Merchant API, Click SHOP API va karta to’lovini server tomonda xavfsiz tekshirish.',en:'Payme Merchant API, Click SHOP API and card payments verified server-side in Orbita Academy.'}],
 ['code',{uz:'O’quv platforma',en:'Learning platform'},{uz:'Video-dars, test, sertifikat',en:'Video lessons, tests, certificates'},{uz:'Ovozli animatsion darslar, testlar, yakuniy imtihon va tekshiriladigan sertifikat — hammasi o’zim qurgan tizimda.',en:'Narrated animated lessons, quizzes, a final exam and verifiable certificates — all on a system I built.'}]
];

NV.PROCESS = [
 [{uz:'Foydalanuvchini tushunish',en:'Understand the user'},{uz:'Birinchi kod emas — odam. Kim bu muammoga duch keladi, hozir uni qanday hal qilyapti va qayerda qiynalyapti? Javob aniq bo’lmaguncha qurish boshlanmaydi.',en:'People first, code second. Who faces this problem, how do they solve it today and where does it hurt? Building doesn’t start until that’s clear.'}],
 [{uz:'MVP’ni tez qurish',en:'Build the MVP fast'},{uz:'Eng kichik ishlaydigan versiya — bir necha kunda. Mukammallik emas, haqiqiy odam qo’liga tegadigan demo.',en:'The smallest working version — in days. Not perfection, but a demo real people can touch.'}],
 [{uz:'Natijani o’lchash',en:'Measure the result'},{uz:'Foydalanish, tejalgan vaqt va KPI. Taxmin emas — raqam. Nima ishladi, nima ishlamadi, aniq ko’rinadi.',en:'Usage, time saved and KPIs. Numbers, not guesses — so it’s clear what worked and what didn’t.'}],
 [{uz:'Fikr asosida yaxshilash',en:'Improve from feedback'},{uz:'Har bir iteratsiya — kechagidan bir qadam oldinga. Kichik qadamlar va doimiylik katta natija beradi.',en:'Every iteration is one step ahead of yesterday. Small steps plus consistency bring big results.'}]
];

NV.QUOTES = [
 [{uz:'Taxmin emas, natijani o’lchash.',en:'Measure results, not assumptions.'},{uz:'Har bir qaror raqamga tayanadi: foydalanish, tejalgan vaqt, KPI.',en:'Every decision rests on numbers: usage, time saved, KPIs.'}],
 [{uz:'G’oyadan demogacha.',en:'From idea to demo.'},{uz:'G’oya qog’ozda qolmasin — uni qo’lda ushlab ko’rish mumkin bo’lgan demoga aylantiraman.',en:'Ideas shouldn’t stay on paper — I turn them into demos you can hold.'}],
 [{uz:'Kichik qadamlar + doimiylik = katta natija.',en:'Small steps + consistency = big results.'},{uz:'Har kuni oz-ozdan — lekin to’xtamasdan.',en:'A little every day — but without stopping.'}],
 [{uz:'Maqsad mukammallik emas — kechagidan bir qadam oldinga.',en:'The goal isn’t perfection — it’s one step past yesterday.'},{uz:'Bugungi versiya kechagidan yaxshi bo’lsa, yo’l to’g’ri.',en:'If today’s version beats yesterday’s, the path is right.'}],
 [{uz:'Sodda, ishlaydigan yechimlar.',en:'Simple solutions that work.'},{uz:'Texnologiyani o’zi uchun emas, real muammoni hal qilish uchun o’rganaman.',en:'I learn technology to solve real problems, not for its own sake.'}]
];

NV.MARQ = ['Python','Pandas','AI / LLM','NLP','JavaScript','HTML & CSS','Git & GitHub','API','Telegram','Automation','Backend','Godot 4'];

NV.CHAT_SUGG = {
  uz:['Qanday loyihalar bor?','Qaysi kurs bepul?','for sikli nima?','Qanday bog’lanaman?'],
  en:['What projects are there?','Which course is free?','What is a for loop?','How do I get in touch?']
};

Object.assign(NV.DICT.uz,{'proj.open':'Ochish','proj.try':'Jonli demo','proj.soon':'Tez orada'});
Object.assign(NV.DICT.en,{'proj.open':'Open','proj.try':'Live demo','proj.soon':'Coming soon'});

/* ---- To'lov bo'limi (sektor 2) ---- */
Object.assign(NV.DICT.uz,{
 'pay.title':'O’qing, <em>bir marta to’lang</em>',
 'pay.lead':'Orbita Akademiya: 12 kurs, 72 ta video-dars (tanlangan o‘zbekcha YouTube darsliklari), har darsda amaliy vazifa, test va oxirida tekshiriladigan sertifikat. Python asoslari to’liq bepul, har bir pullik kursning 1-darsi ham bepul. Narx kursning murakkabligiga qarab belgilangan.',
 'pay.t1':'Bepul','pay.d1':'Dasturlashni noldan boshlash uchun.','pay.f1a':'Python asoslari — 6 dars','pay.f1b':'Har pullik kursning 1-darsi','pay.f1c':'AI ustoz va sertifikat','pay.b1':'Bepul boshlash',
 'pay.t2':'Boshlang’ich','pay.k':'ming so’m','pay.d2':'Tushunishga oson, tez natija beradigan kurslar.','pay.f2':'Imtihon + sertifikat','pay.b2':'Kurslarni ko’rish',
 'pay.t3':'Kuchli daraja','pay.d3':'Chuqur, amaliy va murakkab yo’nalishlar.','pay.f3a':'Algoritmlar · Backend API','pay.f3b':'Machine Learning','pay.b3':'Narxlar va to’lov',
 'pay.safe':'To’lov Payme, Click yoki Visa/Mastercard orqali. Karta ma’lumotlari saytimizga kelmaydi — to’lov tizimining himoyalangan sahifasida kiritiladi. Bir marta to’laysiz, kurs butunlay ochiladi.'
});
Object.assign(NV.DICT.en,{
 'pay.title':'Learn, <em>pay once</em>',
 'pay.lead':'Orbita Academy: 12 courses, 72 video lessons (hand-picked Uzbek YouTube tutorials), a practice task and quiz in every lesson, and a verifiable certificate at the end. Python basics is fully free, and lesson 1 of every paid course is free too. Prices follow course difficulty.',
 'pay.t1':'Free','pay.d1':'To start programming from zero.','pay.f1a':'Python basics — 6 lessons','pay.f1b':'Lesson 1 of every paid course','pay.f1c':'AI tutor and certificate','pay.b1':'Start free',
 'pay.t2':'Starter','pay.k':'thousand UZS','pay.d2':'Easy-to-grasp courses with quick results.','pay.f2':'Exam + certificate','pay.b2':'See courses',
 'pay.t3':'Advanced','pay.d3':'Deep, practical and demanding tracks.','pay.f3a':'Algorithms · Backend API','pay.f3b':'Machine Learning','pay.b3':'Pricing & payment',
 'pay.safe':'Pay with Payme, Click or Visa/Mastercard. Card details never reach our site — they are entered on the payment provider’s secure page. Pay once and the whole course is yours.'
});
