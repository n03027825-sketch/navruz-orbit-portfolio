/* =========================================================
   Orbita Akademiya — kurslar katalogi (yagona manba).
   Narxlar shu yerda — server to'lov summasini faqat shu fayldan oladi,
   brauzerdan kelgan summaga ishonilmaydi.
   price: so'mda. 0 = bepul kurs.
   Pullik kurslarda 1-dars (index 0) hamma uchun bepul (sinov darsi).
   ========================================================= */
const CATALOG = [
  { id:'python', icon:'🐍', c:'#6CE4F0', level:1, price:0, hours:4,
    title:'Python asoslari', sub:'Noldan birinchi dasturgacha: o‘zgaruvchi, shart, sikl, funksiya.',
    lessons:['Python nima va birinchi dastur','O‘zgaruvchilar va ma’lumot turlari','Shartlar: if, elif, else','Sikllar: for va while','Ro‘yxatlar va lug‘atlar','Funksiyalar'],
    yt:[['IIWyDVVQuoo','Python to‘liq kurs — o‘zbek tilida (Azamat)'],['rfscVS0vtbw','Learn Python — Full Course (freeCodeCamp)']] },
  { id:'htmlcss', icon:'🌐', c:'#FF7A45', level:1, price:39000, hours:4,
    title:'HTML va CSS: birinchi sayt', sub:'Sahifa tuzilmasi, dizayn, Flexbox va telefonga moslash.',
    lessons:['Veb qanday ishlaydi, HTML skeleti','Matn, havola, rasm va ro‘yxatlar','CSS: rang, shrift, selektorlar','Box model: margin, padding, border','Flexbox bilan joylashtirish','Responsive dizayn va saytni joylash'],
    yt:[['xcGtfYUfDLo','1 soatda HTML (Saidbek Arislonov)'],['uUULF8ikQoY','CSS ni o‘rganamiz (Saidbek Arislonov)'],['mU6anWqZJcc','HTML5 va CSS3 — Full Course (freeCodeCamp)']] },
  { id:'git', icon:'🌿', c:'#7CF0A6', level:1, price:29000, hours:3,
    title:'Git va GitHub', sub:'Kod tarixini saqlash, jamoada ishlash va portfolio.',
    lessons:['Versiya nazorati nima uchun kerak','git init, add, commit','Tarix: log, diff, qaytarish','Branch va merge','GitHub: push, pull, clone','Pull request va portfolio'],
    yt:[['GYmLXBlTqfE','Git va GitHub — to‘liq kurs (Azizbek Khabibullaev)'],['JtVnOZ26XHA','Git va GitHub o‘zi nima? (Saidbek Arislonov)'],['RGOj5yH7evk','Git and GitHub for Beginners (freeCodeCamp)']] },
  { id:'aiprompt', icon:'✨', c:'#B79CFF', level:1, price:49000, hours:3,
    title:'AI va prompt muhandisligi', sub:'ChatGPT kabi AI bilan to‘g‘ri ishlash, xavfsizlik va amaliy usullar.',
    lessons:['Sun’iy intellekt va LLM nima','Yaxshi prompt formulasi','Misollar bilan o‘rgatish (few-shot)','AI bilan o‘qish va kod yozish','AI xatolari va tekshirish','AI’ni dasturga ulash (API)'],
    yt:[['ABeDWmTnZ9s','Prompt Engineering 1-dars (Shukrullo Ibrohimov)'],['eqCHHQoxUeo','8 daqiqada AI’dan to‘g‘ri foydalanish (Najot Ta’lim)'],['_ZvnD73m40o','Prompt Engineering Tutorial (freeCodeCamp)']] },
  { id:'js', icon:'⚡', c:'#FFD66B', level:2, price:59000, hours:5,
    title:'JavaScript asoslari', sub:'Saytni jonlantirish: o‘zgaruvchi, funksiya, DOM va hodisalar.',
    lessons:['JavaScript nima, konsol va birinchi kod','O‘zgaruvchi, tur va operatorlar','Shartlar va sikllar','Funksiyalar va massivlar','DOM: sahifani boshqarish','Hodisalar va mini-loyiha'],
    yt:[['KBCulezGTWU','JavaScript qiyinmi? (Javohir Group)'],['PkZNo7MFNFg','Learn JavaScript — Full Course (freeCodeCamp)']] },
  { id:'oop', icon:'🧱', c:'#5CF2B5', level:2, price:69000, hours:4,
    title:'Python: funksiyalar va OOP', sub:'Klass, obyekt, vorislik — katta dasturlarni tartibli yozish.',
    lessons:['Funksiyalar chuqurroq: args, return','Modullar va fayllar bilan ishlash','Klass va obyekt','Metodlar va __init__','Vorislik va polimorfizm','Xatolarni ushlash (try/except)'],
    yt:[['Mi0GzaBguEQ','Python OOP: klass va obyekt (Sariq dev)'],['JnoQ-2SFPnY','Vorislik va polimorfizm (Sariq dev)'],['Ej_02ICOIgs','OOP with Python — Full Course (freeCodeCamp)']] },
  { id:'sql', icon:'🗄️', c:'#6CA8FF', level:2, price:69000, hours:4,
    title:'SQL va ma’lumotlar bazasi', sub:'Jadval yaratish, so‘rov yozish, JOIN va hisobotlar.',
    lessons:['Ma’lumotlar bazasi nima','CREATE TABLE va INSERT','SELECT va WHERE','ORDER BY, GROUP BY va agregatlar','JOIN: jadvallarni bog‘lash','UPDATE, DELETE va xavfsizlik'],
    yt:[['1ztYVUetfr0','Ma’lumotlar bazasi va SQL (Suxrob Nurali)'],['HXV3zeQKqGY','SQL Tutorial — Full Course (freeCodeCamp)']] },
  { id:'tgbot', icon:'🤖', c:'#5CF2FF', level:2, price:79000, hours:4,
    title:'Telegram bot yaratish', sub:'Python va aiogram bilan ishlaydigan bot — noldan serverga qadar.',
    lessons:['Bot qanday ishlaydi, BotFather','Birinchi bot: /start javobi','Tugmalar va menyular','Foydalanuvchi ma’lumotini saqlash','Holatlar (FSM) va anketa','Botni serverga joylash'],
    yt:[['IcURXMT6TqI','Python bilan Telegram bot 0 dan (UstaMentor)'],['5gnCy_glvYU','Aiogram to‘liq darslik (Axmadjon Qaxxorov)']] },
  { id:'pandas', icon:'📊', c:'#FF5D8F', level:3, price:99000, hours:5,
    title:'Pandas bilan ma’lumot tahlili', sub:'CSV o‘qish, tozalash, guruhlash va grafik — real biznes savollari.',
    lessons:['Ma’lumot tahlili va Pandas','DataFrame: o‘qish va ko‘rish','Tanlash va filtrlash','Tozalash: bo‘sh va takroriy qiymatlar','groupby va hisobotlar','Grafik va xulosa yozish'],
    yt:[['camZxi1ttwk','Pandas 1-dars o‘zbek tilida (Azamat)'],['vmEHCJofslg','Complete Python Pandas Tutorial (Keith Galli)']] },
  { id:'algo', icon:'🧠', c:'#E0A96D', level:3, price:119000, hours:6,
    title:'Algoritmlar va ma’lumot tuzilmalari', sub:'Murakkablik, qidiruv, saralash va olimpiada/intervyu fikrlashi.',
    lessons:['Algoritm nima, Big-O','Chiziqli va ikkilik qidiruv','Saralash algoritmlari','Stek va navbat','Rekursiya','Hash-jadval va lug‘at'],
    yt:[['RrgmcE8mX0Q','Algoritm o‘zi nima? (Khan Academy Uzbek)'],['WqrbIUggEXQ','Algoritmlar va ma’lumot tuzilmalari (Azim Pulat)'],['8hly31xKli0','Algorithms and Data Structures (freeCodeCamp)']] },
  { id:'backend', icon:'🛰️', c:'#FFB547', level:3, price:129000, hours:6,
    title:'Web API va Backend (FastAPI)', sub:'Server, REST API, ma’lumotlar bazasi va xavfsizlik — o‘z API’ingiz.',
    lessons:['Backend va HTTP qanday ishlaydi','FastAPI: birinchi endpoint','Path va query parametrlar','Pydantic bilan ma’lumot tekshirish','Bazaga ulash (CRUD)','Autentifikatsiya va joylash'],
    yt:[['D4vx51L8Qy4','FastAPI kursi o‘zbek tilida (Axmadjon Qaxxorov)'],['0sOvCWFmrtA','Python API Development (freeCodeCamp)']] },
  { id:'ml', icon:'🚀', c:'#E25CFF', level:3, price:149000, hours:7,
    title:'Machine Learning asoslari', sub:'Model qanday o‘rganadi: regressiya, klassifikatsiya va baholash.',
    lessons:['Machine Learning nima','Ma’lumotni tayyorlash','Chiziqli regressiya','Klassifikatsiya: qaror daraxti','Modelni baholash','Birinchi ML loyiha'],
    yt:[['1hNxd2ldlRY','Machine Learning nima? (Mohirdev)'],['CHU6uI9ajBw','Machine Learning nima? (Sariq dev)'],['i_LwzRVP7bg','Machine Learning for Everybody (freeCodeCamp)']] }
];
const LEVELS = { 1:'Boshlang‘ich', 2:'O‘rta', 3:'Chuqur' };
const PASS = 0.7; // yakuniy imtihondan o'tish chegarasi
function byId(id){ return CATALOG.find(c => c.id === id) || null; }
module.exports = { CATALOG, LEVELS, PASS, byId };
