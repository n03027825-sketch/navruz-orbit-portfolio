module.exports = {
lessons: [
{ task:'VS Code yoki online-python.com’da ism va yoshingizni ekranga chiqaruvchi 3 qatorli dastur yozing.', v: [
  ['Python — odamga yaqin til', 'Python — dunyodagi eng mashhur dasturlash tillaridan biri. Uning buyruqlari oddiy inglizcha so‘zlarga o‘xshaydi, shuning uchun uni birinchi til sifatida tanlashadi.'],
  ['Qayerda ishlatiladi?', 'Python bilan saytlarning server qismi, Telegram botlar, ma’lumot tahlili va sun’iy intellekt yoziladi. Instagram va YouTube ham Python’dan foydalanadi.'],
  ['Birinchi dastur', 'print buyrug‘i qavs ichidagi matnni ekranga chiqaradi. Matn doim qo‘shtirnoq ichida yoziladi.', 'print("Salom, dunyo!")\nprint("Men Python o‘rganyapman")'],
  ['Qayerda yozamiz?', 'Kompyuterga Python va VS Code o‘rnatasiz yoki brauzerda replit.com kabi saytlardan foydalanasiz. Faylni .py kengaytmasi bilan saqlaysiz.']],
  x: 'Dastur — kompyuterga beriladigan buyruqlar ketma-ketligi. Python bu buyruqlarni yuqoridan pastga, qatorma-qator bajaradi.\n\n`print()` — eng birinchi o‘rganiladigan funksiya. U qavs ichidagi qiymatni ekranga chiqaradi. Matn (string) qo‘shtirnoq `"..."` yoki bittalik tirnoq `\'...\'` ichida yoziladi, raqamlar esa tirnoqsiz.\n\n**Izoh** `#` belgisidan boshlanadi — Python uni o‘qimaydi, u faqat odamlar uchun. Kodni tushunarli qilish uchun izoh yozishni odat qiling.',
  lang: 'python',
  code: '# Bu izoh — Python uni bajarmaydi\nprint("Salom, dunyo!")\nprint(2026)\nprint("Natija:", 7 + 5)',
  q: [
   ['print("Salom") nima qiladi?', ['Salom so‘zini ekranga chiqaradi','Kompyuterni o‘chiradi','Fayl yaratadi','Hech narsa qilmaydi'], 0, 'print — ekranga chiqarish buyrug‘i.'],
   ['Python’da izoh qaysi belgi bilan boshlanadi?', ['//','#','--','/*'], 1, 'Python’da izoh # bilan yoziladi.'],
   ['Python fayli qaysi kengaytmada saqlanadi?', ['.txt','.html','.py','.exe'], 2, 'Python fayllari .py bilan tugaydi.']] },
{ task:'input() bilan ism va tug‘ilgan yilni so‘rang, yoshini hisoblab “Salom, {ism}! Siz {yosh} yoshdasiz” deb chiqaring.', v: [
  ['O‘zgaruvchi — nomlangan quti', 'O‘zgaruvchi — ma’lumotni saqlaydigan quti. Unga nom beramiz va teng belgisi bilan qiymat qo‘yamiz.', 'ism = "Navro‘z"\nyosh = 16'],
  ['To‘rt asosiy tur', 'Matn str deyiladi, butun son int, kasr son float, ha-yo‘q qiymat esa bool. type funksiyasi turni ko‘rsatadi.', 'print(type(3.5))   # float'],
  ['Hisob-kitob', 'Python kalkulyator kabi ishlaydi: qo‘shish, ayirish, ko‘paytirish, bo‘lish, daraja va qoldiq.', 'print(17 // 5, 17 % 5, 2 ** 10)'],
  ['Foydalanuvchidan so‘rash', 'input funksiyasi klaviaturadan matn oladi. Son kerak bo‘lsa, int bilan aylantiramiz.', 'yosh = int(input("Yoshingiz: "))']],
  x: 'O‘zgaruvchi nomi harf yoki pastki chiziq bilan boshlanadi, bo‘sh joy bo‘lmaydi: `ism`, `umumiy_summa`. Python katta-kichik harfni farqlaydi: `Ism` va `ism` — ikki xil o‘zgaruvchi.\n\nAsosiy turlar: `str` (matn), `int` (butun son), `float` (kasr), `bool` (`True`/`False`). `input()` doim **matn** qaytaradi, shuning uchun hisoblashdan oldin `int()` yoki `float()` bilan aylantiring.\n\nf-string eng qulay chiqarish usuli: `f"Salom, {ism}!"` — jingalak qavs ichidagi o‘zgaruvchi qiymati matnga qo‘yiladi.',
  lang: 'python',
  code: 'ism = input("Ismingiz: ")\nyil = int(input("Tug‘ilgan yilingiz: "))\nyosh = 2026 - yil\nprint(f"Salom, {ism}! Siz {yosh} yoshdasiz.")',
  q: [
   ['input() qanday turdagi qiymat qaytaradi?', ['int','float','str','bool'], 2, 'input har doim matn (str) qaytaradi.'],
   ['17 % 5 natijasi nima?', ['3','2','3.4','12'], 1, '% — bo‘lishdagi qoldiq: 17 = 5·3 + 2.'],
   ['Qaysi o‘zgaruvchi nomi to‘g‘ri?', ['2ism','mening ismim','mening_ismim','ism-1'], 2, 'Nom raqam bilan boshlanmaydi, bo‘sh joy va minus bo‘lmaydi.']] },
{ task:'Foydalanuvchidan ball so‘rab, 90+ “a’lo”, 70+ “yaxshi”, 60+ “qoniqarli”, aks holda “qayta topshiring” chiqaruvchi dastur yozing.', v: [
  ['Dastur qaror qabul qiladi', 'Shart operatori dastur yo‘lini tanlaydi: agar shart to‘g‘ri bo‘lsa bir ish, aks holda boshqa ish bajariladi.'],
  ['if va else', 'if dan keyin shart va ikki nuqta yoziladi. Ichidagi buyruqlar to‘rt bo‘sh joy bilan suriladi.', 'if ball >= 60:\n    print("O‘tdingiz")\nelse:\n    print("Yana urinib ko‘ring")'],
  ['Ko‘p tanlov: elif', 'Bir nechta shart bo‘lsa elif ishlatiladi. Python birinchi to‘g‘ri kelgan shartni bajaradi.'],
  ['Taqqoslash va mantiq', 'Teng — ikki teng belgisi, teng emas — undov va teng. and ikkala shart, or esa kamida bittasi to‘g‘ri bo‘lishini talab qiladi.', 'if yosh >= 16 and pasport:\n    print("Mumkin")']],
  x: 'Taqqoslash operatorlari: `==` (teng), `!=` (teng emas), `>`, `<`, `>=`, `<=`. Diqqat: bitta `=` qiymat berish, ikkita `==` esa taqqoslash.\n\n**Chekinish (indent)** Python’da majburiy: `if` ichidagi kod 4 bo‘sh joy bilan suriladi. Chekinish noto‘g‘ri bo‘lsa, `IndentationError` chiqadi.\n\nMantiqiy operatorlar: `and` (va), `or` (yoki), `not` (inkor). Murakkab shartlarni qavs bilan guruhlash o‘qishni osonlashtiradi.',
  lang: 'python',
  code: 'ball = int(input("Ballingiz: "))\nif ball >= 86:\n    print("A’lo — 5")\nelif ball >= 71:\n    print("Yaxshi — 4")\nelif ball >= 56:\n    print("Qoniqarli — 3")\nelse:\n    print("Qayta topshirish kerak")',
  q: [
   ['Taqqoslash uchun qaysi operator ishlatiladi?', ['=','==',':=','=>'], 1, '== taqqoslaydi, = esa qiymat beradi.'],
   ['if blokidan keyin nima yoziladi?', ['nuqta-vergul','ikki nuqta (:)','jingalak qavs','hech narsa'], 1, 'Shartdan keyin : qo‘yiladi.'],
   ['x = 5 bo‘lsa, x > 3 and x < 4 natijasi?', ['True','False','Xato','5'], 1, 'Ikkinchi shart noto‘g‘ri, and uchun ikkalasi kerak.']] },
{ task:'1 dan 100 gacha 3 ga ham, 5 ga ham bo‘linadigan sonlarni chiqaring va nechta ekanini sanang.', v: [
  ['Takrorlash — dasturning kuchi', 'Sikl bir ishni ko‘p marta bajaradi. Yuz marta print yozish o‘rniga bitta sikl yetarli.'],
  ['for va range', 'range(5) — 0 dan 4 gacha sonlar. for sikli har bir qiymat uchun ichki kodni bajaradi.', 'for i in range(1, 6):\n    print(i, "-qadam")'],
  ['while — shart bajarilguncha', 'while sikli shart to‘g‘ri bo‘lib turguncha aylanadi. Shartni o‘zgartirishni unutmang, aks holda sikl cheksiz bo‘ladi.', 'n = 3\nwhile n > 0:\n    print(n)\n    n -= 1'],
  ['break va continue', 'break siklni butunlay to‘xtatadi, continue esa joriy qadamni tashlab keyingisiga o‘tadi.']],
  x: '`range(start, stop, step)` — `stop` ning o‘zi kirmaydi. `range(0, 10, 2)` → 0, 2, 4, 6, 8.\n\n`for` — takrorlar soni ma’lum bo‘lganda; `while` — shart bilan to‘xtaganda qulay. Masalan, parol to‘g‘ri kiritilguncha so‘rash — `while` uchun ideal.\n\nSikl ichida yig‘indi hisoblash klassik usul: oldin `jami = 0`, keyin har qadamda `jami += son`.',
  lang: 'python',
  code: 'jami = 0\nfor son in range(1, 101):\n    jami += son\nprint("1 dan 100 gacha yig‘indi:", jami)\n\nparol = ""\nwhile parol != "orbita":\n    parol = input("Parol: ")\nprint("Xush kelibsiz!")',
  q: [
   ['range(3) qaysi sonlarni beradi?', ['1, 2, 3','0, 1, 2','0, 1, 2, 3','3'], 1, 'range 0 dan boshlanadi va stop kirmaydi.'],
   ['Siklni butunlay to‘xtatadigan so‘z?', ['stop','exit','break','continue'], 2, 'break sikldan chiqadi.'],
   ['while sikli qachon cheksiz bo‘ladi?', ['Shart hech qachon False bo‘lmasa','range ishlatilsa','print bo‘lsa','Hech qachon'], 0, 'Shart o‘zgarmasa, sikl to‘xtamaydi.']] },
{ task:'5 ta do‘stingiz ismi va telefonini lug‘atga yozing, keyin ism bo‘yicha qidiradigan dastur yozing.', v: [
  ['Ro‘yxat — ko‘p qiymat bitta joyda', 'Ro‘yxat kvadrat qavs ichida yoziladi. Unda sonlar, matnlar va hatto boshqa ro‘yxatlar bo‘lishi mumkin.', 'mevalar = ["olma", "anor", "uzum"]'],
  ['Indeks noldan boshlanadi', 'Birinchi element indeksi nol. Manfiy indeks oxiridan sanaydi: minus bir — oxirgi element.', 'print(mevalar[0], mevalar[-1])'],
  ['Qo‘shish va o‘chirish', 'append oxiriga qo‘shadi, remove qiymat bo‘yicha o‘chiradi, len esa uzunlikni beradi.', 'mevalar.append("behi")\nprint(len(mevalar))'],
  ['Lug‘at — kalit va qiymat', 'Lug‘at jingalak qavsda yoziladi va har bir qiymatga nom — kalit beradi. Telefon kitobchasi kabi.', 'talaba = {"ism": "Ali", "ball": 92}\nprint(talaba["ball"])']],
  x: 'Ro‘yxat (`list`) tartiblangan va o‘zgaruvchan to‘plam. Foydali metodlar: `append()`, `insert()`, `remove()`, `pop()`, `sort()`. Kesim: `sonlar[1:4]` — 1, 2, 3-indekslar.\n\nLug‘at (`dict`) — kalit orqali tez qidirish. Yangi kalit qo‘shish: `talaba["sinf"] = 10`. Barchasini aylanish: `for kalit, qiymat in talaba.items():`.\n\nAmaliyotda ko‘pincha ro‘yxat ichida lug‘atlar bo‘ladi — masalan, o‘quvchilar ro‘yxati, har biri o‘z ismi va bahosi bilan.',
  lang: 'python',
  code: 'oquvchilar = [\n    {"ism": "Ali", "ball": 92},\n    {"ism": "Malika", "ball": 78},\n    {"ism": "Jasur", "ball": 85},\n]\nfor o in oquvchilar:\n    print(o["ism"], "—", o["ball"])\n\neng_yaxshi = max(oquvchilar, key=lambda o: o["ball"])\nprint("Eng yuqori ball:", eng_yaxshi["ism"])',
  q: [
   ['sonlar = [5, 8, 2] bo‘lsa, sonlar[1] nima?', ['5','8','2','Xato'], 1, 'Indeks 0 — 5, indeks 1 — 8.'],
   ['Ro‘yxat oxiriga element qo‘shadigan metod?', ['add()','push()','append()','insert_end()'], 2, 'Python’da append() ishlatiladi.'],
   ['Lug‘atdan qiymat qanday olinadi?', ['kalit orqali: d["ism"]','faqat indeks bilan: d[0]','d.ism','Olinmaydi'], 0, 'Lug‘at qiymati kalit bo‘yicha olinadi.']] },
{ task:'Ikki sonni qabul qilib, o‘rtachasini qaytaradigan funksiya yozing va uni 3 xil juftlikda sinab ko‘ring.', v: [
  ['Funksiya — qayta ishlatiladigan kod', 'Bir xil kodni har safar yozmaslik uchun uni funksiyaga o‘raymiz va nom beramiz. def so‘zi bilan yaratiladi.'],
  ['Parametr va return', 'Funksiya parametr orqali ma’lumot oladi va return bilan natija qaytaradi.', 'def kvadrat(x):\n    return x * x\n\nprint(kvadrat(7))'],
  ['Standart qiymat', 'Parametrga standart qiymat berish mumkin — chaqirishda berilmasa, o‘sha ishlatiladi.', 'def salom(ism="do‘stim"):\n    print(f"Salom, {ism}!")'],
  ['Kichik loyiha', 'Endi siz o‘zgaruvchi, shart, sikl, ro‘yxat va funksiyani bilasiz. Bu — har qanday dasturning poydevori. Tabriklaymiz!']],
  x: 'Funksiya kodni **qismlarga** bo‘ladi: har bir funksiya bitta aniq ish qiladi. Bu xatoni topish va kodni o‘qishni osonlashtiradi.\n\n`return` funksiyadan qiymat qaytaradi va uni shu zahoti tugatadi. `print` esa faqat ekranga chiqaradi — natijani keyin ishlatib bo‘lmaydi.\n\nFunksiya ichida yaratilgan o‘zgaruvchi faqat ichkarida yashaydi (lokal o‘zgaruvchi). Tashqaridan kerakli ma’lumotni parametr orqali bering.',
  lang: 'python',
  code: 'def ortacha(baholar):\n    return sum(baholar) / len(baholar)\n\ndef baho_nomi(ball):\n    if ball >= 86: return "A’lo"\n    if ball >= 71: return "Yaxshi"\n    return "Qoniqarli"\n\nb = [92, 78, 85]\no = ortacha(b)\nprint(f"O‘rtacha: {o:.1f} — {baho_nomi(o)}")',
  q: [
   ['Python’da funksiya qaysi so‘z bilan yaratiladi?', ['function','func','def','fn'], 2, 'def — define (aniqlash).'],
   ['return nima qiladi?', ['Natijani qaytaradi va funksiyani tugatadi','Ekranga chiqaradi','Dasturni o‘chiradi','Siklni boshlaydi'], 0, 'return qiymat qaytaradi.'],
   ['def f(a, b=2): return a*b — f(5) natijasi?', ['5','7','10','Xato'], 2, 'b standart 2, 5·2 = 10.']] }
],
exam: [
 ['Qaysi buyruq ekranga matn chiqaradi?', ['echo()','print()','write()','show()'], 1],
 ['x = "5" + "3" natijasi nima?', ['8','53','Xato','"8"'], 1],
 ['int("12") + 3 = ?', ['123','15','Xato','12'], 1],
 ['for i in range(2, 8, 2) nechta marta aylanadi?', ['3','4','6','8'], 0],
 ['Ro‘yxatning oxirgi elementi qanday olinadi?', ['a[last]','a[-1]','a[len]','a[0]'], 1],
 ['if sharti noto‘g‘ri bo‘lsa, qaysi blok bajariladi?', ['else','elif har doim','hech biri','try'], 0],
 ['Lug‘at qaysi qavsda yoziladi?', ['( )','[ ]','{ }','< >'], 2],
 ['10 // 3 natijasi?', ['3.33','3','1','4'], 1],
 ['True and False = ?', ['True','False','None','Xato'], 1],
 ['Funksiya natijani qaysi so‘z bilan qaytaradi?', ['give','back','return','yield faqat'], 2]
]
};
