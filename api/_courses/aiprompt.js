module.exports = {
lessons: [
{ v: [
  ['Sun’iy intellekt nima?', 'Sun’iy intellekt — odam aql bilan bajaradigan ishlarni qila oladigan dasturlar: matn yozish, rasmni tanish, tarjima qilish.'],
  ['LLM — katta til modeli', 'ChatGPT, Claude va Gemini — katta til modellari. Ular milliardlab matnlarda o‘qitilgan va keyingi so‘zni bashorat qilish orqali javob tuzadi.'],
  ['U “biladimi”?', 'Model odamdek tushunmaydi — u ehtimollik bilan eng mos matnni tanlaydi. Shuning uchun ba’zan ishonch bilan xato gapiradi.'],
  ['AI — kuchaytirgich', 'AI sizning o‘rningizga o‘ylamaydi, u sizni tezlashtiradi. Yaxshi savol bergan odam yaxshi natija oladi.']],
  x: '**Sun’iy intellekt (AI)** — keng tushuncha. **Machine Learning** — AI’ning ma’lumotdan o‘rganadigan qismi. **LLM** (Large Language Model) — matn bilan ishlaydigan ML modeli.\n\nLLM’ning kuchli tomonlari: tushuntirish, qisqartirish, tarjima, kod yozish, g‘oya berish. Zaif tomonlari: yangi voqealarni bilmasligi, “gallyutsinatsiya” (to‘qib chiqarish), hisob-kitobda xato.\n\nAsosiy qoida: AI javobini **tekshiring**, ayniqsa raqamlar, sanalar, nomlar va manbalarni.',
  lang: 'text',
  code: 'Yomon: "Python haqida gapir"\n\nYaxshi: "Men 9-sinf o‘quvchisiman. Python’dagi for siklini\n3 ta oddiy misol bilan, o‘zbek tilida tushuntirib ber.\nOxirida 2 ta mashq ber."',
  q: [
   ['LLM nima?', ['Katta til modeli','Kompyuter virusi','Ma’lumotlar bazasi','Dasturlash tili'], 0, 'Large Language Model.'],
   ['“Gallyutsinatsiya” nima?', ['AI’ning ishonch bilan noto‘g‘ri ma’lumot to‘qishi','Rasm chizishi','Tez ishlashi','Internet uzilishi'], 0, 'Model yo‘q narsani to‘qishi mumkin.'],
   ['AI javobini nima qilish kerak?', ['Tekshirish','Ko‘r-ko‘rona qabul qilish','Darhol o‘chirish','Yodlash'], 0, 'Muhim ma’lumotni tekshiring.']] },
{ v: [
  ['Prompt — AI’ga topshiriq', 'Prompt — AI’ga yozgan xabaringiz. Topshiriq qanchalik aniq bo‘lsa, javob shunchalik foydali.'],
  ['Besh element', 'Yaxshi prompt: rol, vazifa, kontekst, format va cheklov. Masalan: sen o‘qituvchisan, mavzuni tushuntir, men 8-sinfman, jadval ko‘rinishida, 150 so‘zdan oshmasin.'],
  ['Format so‘rang', 'Javobni qanday ko‘rinishda xohlasangiz, aniq ayting: ro‘yxat, jadval, kod, qadamlar yoki JSON.'],
  ['Takrorlab yaxshilang', 'Birinchi javob mukammal bo‘lmasa, aniqlashtiring: qisqaroq qil, misol qo‘sh, oddiyroq tilda yoz.']],
  x: 'Prompt formulasi: **Rol + Vazifa + Kontekst + Format + Cheklov**.\n\n- *Rol*: “Sen tajribali matematika o‘qituvchisisan.”\n- *Vazifa*: “Kvadrat tenglamani tushuntir.”\n- *Kontekst*: “Men 8-sinfman, diskriminantni bilmayman.”\n- *Format*: “3 qadam + 1 misol.”\n- *Cheklov*: “O‘zbek tilida, 120 so‘zdan oshmasin.”\n\nSuhbatni davom ettirish — prompt yozishning bir qismi. AI oldingi xabarlarni eslaydi, shuning uchun bosqichma-bosqich aniqlashtirish samarali.',
  lang: 'text',
  code: 'Rol: Sen IELTS bo‘yicha tajribali o‘qituvchisan.\nVazifa: Mening insho kirishimni tekshir.\nKontekst: Darajam B1, maqsad 6.5.\nFormat: 1) xatolar jadvali 2) tuzatilgan variant.\nCheklov: izohlarni o‘zbek tilida yoz.\n\nMatn: "In nowadays many peoples thinks..."',
  q: [
   ['Yaxshi prompt elementlaridan biri emas?', ['Rol','Format','Tasodifiy belgilar','Kontekst'], 2, 'Tasodifiy belgilar yordam bermaydi.'],
   ['Javob jadval bo‘lishi uchun nima qilish kerak?', ['Formatni aniq so‘rash','Kutish','Qayta yuklash','Hech narsa'], 0, 'Formatni ayting.'],
   ['Birinchi javob yoqmasa?', ['Aniqlashtirib qayta so‘rash','AI’ni tashlash','Xuddi shu promptni yuborish','Kompyuterni o‘chirish'], 0, 'Iteratsiya — normal jarayon.']] },
{ v: [
  ['Misol bilan o‘rgatish', 'Few-shot usulida AI’ga bir-ikkita namuna ko‘rsatasiz, u shu uslubda davom etadi.'],
  ['Namuna qanday beriladi', 'Kirish va chiqish juftligini yozasiz, so‘ng yangi kirishni berib, chiqishni AI’dan kutasiz.', 'Matn: "Zo‘r xizmat!" → Kayfiyat: ijobiy\nMatn: "Juda kech keldi" → Kayfiyat: salbiy\nMatn: "Narxi o‘rtacha" → Kayfiyat:'],
  ['Bosqichma-bosqich fikrlash', 'Murakkab masalada “qadamma-qadam yech” desangiz, model xatoni kamroq qiladi.'],
  ['O‘zini tekshirtirish', 'Javobdan keyin “javobingni tekshir, xato bormi?” deb so‘rash sifatni oshiradi.']],
  x: '**Zero-shot** — misolsiz topshiriq. **Few-shot** — 2–5 ta namuna bilan. Namunalar uslub, format va darajani belgilaydi.\n\n**Chain of thought** (fikr zanjiri): “avval berilganlarni yoz, keyin formulani tanla, keyin hisobla”. Bu matematika va mantiqiy masalalarda ayniqsa foydali.\n\nNamunalar xilma-xil bo‘lsin — faqat bitta turdagi misol bersangiz, model boshqa holatlarda adashadi.',
  lang: 'text',
  code: 'Quyidagi mijoz izohlarini "ijobiy", "salbiy" yoki\n"neytral" deb belgilab, JSON qaytar.\n\nNamuna:\n"Yetkazish tez bo‘ldi" -> {"kayfiyat": "ijobiy"}\n"Mahsulot singan keldi" -> {"kayfiyat": "salbiy"}\n\nIzohlar:\n1. "Sifat yaxshi, lekin qimmat"\n2. "Operator juda xushmuomala"',
  q: [
   ['Few-shot nima?', ['Bir nechta namuna bilan o‘rgatish','Bitta so‘zli prompt','Rasm yuklash','Tezkor rejim'], 0, 'Namunalar orqali uslubni ko‘rsatish.'],
   ['Murakkab masalada nima so‘rash foydali?', ['Qadamma-qadam yechish','Faqat javobni','Emoji bilan','Ingliz tilida majburan'], 0, 'Fikr zanjiri xatoni kamaytiradi.'],
   ['Namunalar qanday bo‘lishi kerak?', ['Xilma-xil','Bir xil','Uzun va chalkash','Faqat bitta'], 0, 'Turli holatlarni ko‘rsating.']] },
{ v: [
  ['AI — shaxsiy ustoz', 'Tushunmagan mavzuni AI’dan oddiyroq tilda so‘rang, misol va mashq bering deb so‘rang.'],
  ['Test tuzdiring', 'Mavzu bo‘yicha test so‘rang, javob bering va AI’dan tekshirishni so‘rang. Bu eng samarali takrorlash usuli.'],
  ['Kod yozishda', 'AI kodni tushuntiradi, xatoni topadi va variant taklif qiladi. Lekin kodni o‘zingiz tushunib, sinab ko‘ring.', 'Mana kodim va xato xabari. Xato nimada va nega?\nTuzatilgan kodni izoh bilan ber.'],
  ['Halollik', 'Uy vazifasini AI’ga yozdirib topshirish — o‘zingizni aldash. AI’ni o‘rganish uchun ishlating, ko‘chirish uchun emas.']],
  x: 'O‘qish uchun kuchli promptlar:\n- “Menga Feynman usulida tushuntir, keyin menga 3 ta savol ber.”\n- “Mavzu bo‘yicha xarita chizib ber: asosiy tushunchalar va bog‘liqliklar.”\n- “Mening javobimni baholab, qaysi joyi noto‘g‘ri ekanini ko‘rsat.”\n\nKodda: xato xabarini to‘liq nusxalang, kodning tegishli qismini bering va nima kutganingizni yozing.\n\nShu akademiyadagi **AI ustoz** ham xuddi shunday ishlaydi: savol bering, u tushuntiradi va kerakli darsni ochib beradi.',
  lang: 'text',
  code: 'Men Python’da o‘rganyapman. Quyidagi kod nima uchun\n"TypeError" beradi? Menga javobni to‘g‘ridan-to‘g‘ri\nberma — avval maslahat ber, men o‘zim tuzatib ko‘ray.\n\nyosh = input("Yosh: ")\nprint(yosh + 1)',
  q: [
   ['AI bilan eng samarali takrorlash usuli?', ['Test tuzdirib, javob berish','Faqat o‘qish','Javobni ko‘chirish','Hech narsa qilmaslik'], 0, 'Faol takrorlash eng samarali.'],
   ['Kod xatosini so‘rashda nima beriladi?', ['Kod va to‘liq xato xabari','Faqat “ishlamayapti”','Kompyuter modeli','Hech narsa'], 0, 'Kontekst qanchalik to‘liq bo‘lsa, shuncha yaxshi.'],
   ['Uy vazifasini AI’ga yozdirish?', ['O‘zini aldash','Eng yaxshi usul','Majburiy','Tavsiya etiladi'], 0, 'AI — o‘rganish vositasi.']] },
{ v: [
  ['AI ham xato qiladi', 'Model yangi voqealarni bilmasligi, raqamda adashishi yoki mavjud bo‘lmagan manbani o‘ylab topishi mumkin.'],
  ['Qanday tekshiramiz?', 'Muhim faktni ishonchli saytdan tekshiring, raqamlarni kalkulyatorda qayta hisoblang, manba havolasini ochib ko‘ring.'],
  ['Maxfiylik', 'AI’ga parol, karta raqami, pasport ma’lumoti yoki boshqalarning shaxsiy ma’lumotini yozmang.'],
  ['Adolatsizlik va xolislik', 'Model o‘qitilgan matnlardagi stereotiplarni takrorlashi mumkin. Tanqidiy fikrlashni o‘chirmang.']],
  x: 'Tekshirish ro‘yxati:\n1. Fakt bormi? — ikkinchi manbadan tasdiqlang.\n2. Raqam bormi? — o‘zingiz hisoblang.\n3. Manba ko‘rsatilganmi? — havolani oching, u haqiqatan mavjudmi?\n4. Kod bormi? — ishga tushirib, test qiling.\n\n**Maxfiylik qoidasi**: AI suhbatlari server’da saqlanishi mumkin. Shaxsiy va moliyaviy ma’lumotlarni yozmang.\n\nAI deepfake va soxta xabarlar yaratishda ham ishlatiladi — shubhali video yoki ovozli xabarga darhol ishonmang.',
  lang: 'text',
  code: 'Tekshirtirish prompti:\n"Oldingi javobingdagi har bir faktni alohida ro‘yxat\nqilib yoz va har biri uchun qanchalik ishonchli\nekaningni (yuqori/o‘rta/past) belgila. Qaysilarini\nmen alohida tekshirishim kerak?"',
  q: [
   ['AI’ga nimani yozmaslik kerak?', ['Parol va karta raqamini','Matematik savolni','She’r mavzusini','Tarjima so‘rovini'], 0, 'Maxfiy ma’lumot yozilmaydi.'],
   ['AI keltirgan manbani nima qilish kerak?', ['Ochib, mavjudligini tekshirish','Ishonish','E’tibor bermaslik','O‘chirish'], 0, 'Manba to‘qilgan bo‘lishi mumkin.'],
   ['Raqamli javobni qanday tekshiramiz?', ['O‘zimiz qayta hisoblaymiz','Ishonamiz','So‘ramaymiz','Yaxlitlaymiz'], 0, 'Hisobni tekshiring.']] },
{ v: [
  ['AI’ni dasturga ulash', 'Ko‘p AI xizmatlarining API’si bor: dasturingiz so‘rov yuboradi va javobni matn ko‘rinishida oladi.'],
  ['API kaliti', 'API kaliti — parol kabi. U faqat serverda saqlanadi, hech qachon brauzer kodiga yoki GitHub’ga yozilmaydi.'],
  ['So‘rov tuzilishi', 'So‘rovda model nomi va xabarlar ro‘yxati beriladi: tizim ko‘rsatmasi va foydalanuvchi savoli.', 'messages = [\n  {"role": "system", "content": "Sen yordamchisan."},\n  {"role": "user", "content": "Salom!"}\n]'],
  ['Shu saytdagi misol', 'Orbita Akademiyasidagi AI ustoz aynan shunday qurilgan: brauzer serverga savol yuboradi, server kalit bilan AI’ga murojaat qiladi va javobni qaytaradi.']],
  x: 'API — dasturlar bir-biri bilan gaplashadigan “eshik”. AI API’da siz `model`, `messages` va sozlamalar (`temperature` — ijodkorlik darajasi) yuborasiz.\n\nXavfsiz arxitektura: **brauzer → sizning serveringiz → AI API**. Kalit faqat serverda (`.env` yoki Vercel Environment Variables).\n\nXarajat: API har bir so‘z bo‘lagi (token) uchun pul oladi. Javob uzunligini cheklang va foydalanuvchilar sonini hisobga oling.',
  lang: 'python',
  code: 'import os, requests\n\nkalit = os.environ["OPENAI_API_KEY"]  # kod ichiga yozilmaydi!\njavob = requests.post(\n    "https://api.openai.com/v1/chat/completions",\n    headers={"Authorization": f"Bearer {kalit}"},\n    json={\n        "model": "gpt-4o-mini",\n        "messages": [{"role": "user", "content": "Python nima?"}],\n    },\n).json()\nprint(javob["choices"][0]["message"]["content"])',
  q: [
   ['API kaliti qayerda saqlanadi?', ['Faqat serverda','Brauzer kodida','GitHub’da ochiq','Sayt sarlavhasida'], 0, 'Kalit maxfiy — faqat server.'],
   ['messages ichida system roli nima uchun?', ['AI’ga umumiy ko‘rsatma berish','Parol uchun','Rasm uchun','Hech narsa'], 0, 'System — xulq qoidasi.'],
   ['AI API qanday hisoblanadi?', ['Token (so‘z bo‘lagi) bo‘yicha','Bepul cheksiz','Oyiga 1 so‘m','Faqat rasm uchun'], 0, 'Narx tokenlarga bog‘liq.']] }
],
exam: [
 ['LLM nimaning qisqartmasi?', ['Large Language Model','Long Learning Machine','Local Link Module','Low Level Memory'], 0],
 ['Yaxshi prompt elementi?', ['Aniq format','Chalkash so‘z','Faqat bitta so‘z','Tasodifiy emoji'], 0],
 ['Few-shot usuli?', ['Namunalar berish','Rasm chizish','Tarjima','Ovoz yozish'], 0],
 ['AI gallyutsinatsiyasi?', ['To‘qib chiqarilgan ma’lumot','Tez javob','Yangi model','Kompyuter qizishi'], 0],
 ['API kalitini qayerga yozmaslik kerak?', ['Brauzer JavaScript koduga','Vercel env’ga','Server .env ga','Parol menejeriga'], 0],
 ['Murakkab masalada foydali so‘rov?', ['Qadamma-qadam yech','Faqat javob','Qisqa qil','Inglizcha yoz'], 0],
 ['AI bilan o‘qishning eng samarali usuli?', ['Test tuzdirib javob berish','Javobni ko‘chirish','Faqat o‘qish','Uxlab qolish'], 0],
 ['AI’ga yozilmaydigan ma’lumot?', ['Karta raqami','Tarix savoli','Matematika misoli','Insho mavzusi'], 0],
 ['temperature sozlamasi?', ['Ijodkorlik darajasi','Server harorati','Tezlik','Til'], 0],
 ['Xavfsiz arxitektura?', ['Brauzer → server → AI API','Brauzer → AI API kalit bilan','GitHub → AI','Telefon → kalit SMS'], 0]
]
};
