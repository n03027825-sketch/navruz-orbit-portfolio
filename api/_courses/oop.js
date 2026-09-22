module.exports = {
lessons: [
{ v: [
  ['Funksiyalar — ikkinchi bosqich', 'Asoslar kursida oddiy funksiya yozdingiz. Endi ko‘p parametrli, nomli argumentli va bir nechta qiymat qaytaradigan funksiyalarni o‘rganamiz.'],
  ['Nomli argumentlar', 'Chaqirishda parametr nomini yozsangiz, tartib muhim bo‘lmaydi va kod tushunarliroq bo‘ladi.', 'narx(soni=3, bir_dona=5000)'],
  ['*args va **kwargs', 'Yulduzcha bilan istalgancha argument qabul qilinadi: args — kortej, kwargs — lug‘at.', 'def jami(*sonlar):\n    return sum(sonlar)'],
  ['Bir nechta qiymat', 'return vergul bilan bir nechta qiymat qaytarishi mumkin — ular kortej bo‘lib keladi.', 'def min_max(a):\n    return min(a), max(a)']],
  x: 'Parametr turlari tartibi: oddiy → standart qiymatli → `*args` → `**kwargs`.\n\n`lambda` — bir qatorli nomsiz funksiya: `lambda x: x * 2`. U `sorted`, `max`, `map` bilan birga qulay.\n\n**Docstring** — funksiya boshidagi uch qo‘shtirnoqli izoh. U `help(funksiya)` da ko‘rinadi va jamoaviy ishda juda muhim.',
  lang: 'python',
  code: 'def buyurtma(*mahsulotlar, chegirma=0, **qoshimcha):\n    """Buyurtma summasini hisoblaydi."""\n    jami = sum(narx for _, narx in mahsulotlar)\n    jami *= 1 - chegirma\n    return round(jami), qoshimcha.get("izoh", "")\n\nsumma, izoh = buyurtma(("non", 4000), ("sut", 12000), chegirma=0.1, izoh="tez")\nprint(summa, izoh)',
  q: [
   ['*args qanday turda keladi?', ['list','tuple (kortej)','dict','set'], 1, 'args — kortej.'],
   ['**kwargs nima?', ['Nomli argumentlar lug‘ati','Xato turi','Modul','Sikl'], 0, 'kwargs — dict.'],
   ['return a, b nimani qaytaradi?', ['Faqat a','Kortej (a, b)','Xato','b'], 1, 'Vergul kortej yaratadi.']] },
{ v: [
  ['Modul — tayyor kod to‘plami', 'Python’da minglab tayyor modul bor: math, random, datetime. import bilan ulanadi.', 'import random\nprint(random.randint(1, 6))'],
  ['O‘z modulingiz', 'Har bir .py fayl — modul. Funksiyalarni alohida faylga yozib, boshqa faylda import qilasiz.', 'from yordamchi import ortacha'],
  ['Fayl yozish', 'with open fayl bilan xavfsiz ishlaydi — ish tugagach fayl avtomatik yopiladi.', 'with open("eslatma.txt", "w", encoding="utf-8") as f:\n    f.write("Salom!")'],
  ['Fayl o‘qish', 'r rejimida ochib, read yoki satrma-satr aylanib o‘qiymiz.', 'with open("eslatma.txt", encoding="utf-8") as f:\n    for qator in f:\n        print(qator.strip())']],
  x: 'Fayl rejimlari: `"r"` — o‘qish, `"w"` — yozish (eskisini o‘chiradi), `"a"` — oxiriga qo‘shish.\n\nO‘zbekcha harflar uchun doim `encoding="utf-8"` bering.\n\n`pip install nom` bilan internetdagi paketlarni o‘rnatasiz (masalan, `requests`, `pandas`). `if __name__ == "__main__":` bloki fayl to‘g‘ridan-to‘g‘ri ishga tushirilgandagina bajariladi.',
  lang: 'python',
  code: 'import json\nfrom datetime import date\n\nvazifalar = [{"nom": "Python", "sana": str(date.today())}]\nwith open("vazifalar.json", "w", encoding="utf-8") as f:\n    json.dump(vazifalar, f, ensure_ascii=False, indent=2)\n\nwith open("vazifalar.json", encoding="utf-8") as f:\n    print(json.load(f))',
  q: [
   ['Faylga oxiridan qo‘shish rejimi?', ['"r"','"w"','"a"','"x"'], 2, '"a" — append.'],
   ['with open afzalligi?', ['Fayl avtomatik yopiladi','Tezroq yozadi','Faylni shifrlaydi','Hech biri'], 0, 'Kontekst menejeri faylni yopadi.'],
   ['Tashqi paket o‘rnatish?', ['python get','pip install','import install','npm add'], 1, 'pip install.']] },
{ v: [
  ['OOP — dunyoni obyektlarda ko‘rish', 'Obyektga yo‘naltirilgan dasturlashda ma’lumot va u bilan ishlaydigan funksiyalar bitta obyektga jamlanadi.'],
  ['Klass — chizma', 'Klass — uy chizmasi, obyekt esa shu chizma bo‘yicha qurilgan uy. Bitta klassdan ko‘p obyekt yaratiladi.', 'class Talaba:\n    pass\n\nali = Talaba()'],
  ['Atributlar', 'Obyektning xususiyatlari — atributlar: ism, yosh, ball.', 'ali.ism = "Ali"\nali.ball = 88'],
  ['Nega kerak?', 'Katta dasturda yuzlab o‘zgaruvchi aralashib ketadi. OOP ularni mantiqiy guruhlarga ajratadi: Talaba, Kurs, To‘lov.']],
  x: 'OOP’ning to‘rt ustuni: **inkapsulyatsiya** (ma’lumotni yashirish), **vorislik**, **polimorfizm** va **abstraksiya**.\n\nKlass nomi katta harf bilan (`CamelCase`): `Talaba`, `KursTolovi`. Obyekt nomi kichik harf bilan.\n\nPython’da hamma narsa obyekt: son, satr, ro‘yxat — barchasi o‘z klassiga ega. `type("salom")` → `<class \'str\'>`.',
  lang: 'python',
  code: 'class Kurs:\n    pass\n\npython = Kurs()\npython.nom = "Python asoslari"\npython.narx = 0\n\nml = Kurs()\nml.nom = "Machine Learning"\nml.narx = 149000\n\nfor k in [python, ml]:\n    print(k.nom, "—", k.narx or "bepul")',
  q: [
   ['Klass nima?', ['Obyekt yaratish uchun chizma','Fayl','Sikl','Xato'], 0, 'Klass — shablon.'],
   ['Klass nomi qanday yoziladi?', ['kichik_harf','CamelCase','KATTA_HARF','raqam bilan'], 1, 'Masalan, Talaba.'],
   ['Bitta klassdan nechta obyekt yaratish mumkin?', ['Faqat bitta','Ikkita','Istalgancha','Hech bitta'], 2, 'Istalgancha.']] },
{ v: [
  ['__init__ — konstruktor', 'Obyekt yaratilganda __init__ metodi avtomatik chaqiriladi va atributlarni o‘rnatadi.', 'class Talaba:\n    def __init__(self, ism, ball):\n        self.ism = ism\n        self.ball = ball'],
  ['self nima?', 'self — joriy obyektning o‘zi. U orqali obyekt o‘z atributlariga murojaat qiladi.'],
  ['Metodlar', 'Metod — klass ichidagi funksiya. U obyekt ustida amal bajaradi.', 'def otdimi(self):\n    return self.ball >= 60'],
  ['__str__', '__str__ metodi obyekt print qilinganda chiqadigan matnni belgilaydi.', 'def __str__(self):\n    return f"{self.ism} ({self.ball})"']],
  x: 'Metodning birinchi parametri doim `self`. Chaqirishda uni yozmaysiz: `ali.otdimi()`.\n\n“Dunder” (ikki pastki chiziqli) metodlar Python’ning maxsus xatti-harakatini boshqaradi: `__init__`, `__str__`, `__len__`, `__eq__`.\n\nInkapsulyatsiya: pastki chiziq bilan boshlangan atribut (`self._balans`) “ichki” deb hisoblanadi — tashqaridan to‘g‘ridan-to‘g‘ri o‘zgartirmaslik kelishuvi.',
  lang: 'python',
  code: 'class Hamyon:\n    def __init__(self, egasi):\n        self.egasi = egasi\n        self._balans = 0\n\n    def toldirish(self, summa):\n        if summa <= 0:\n            raise ValueError("Summa musbat bo‘lsin")\n        self._balans += summa\n\n    def __str__(self):\n        return f"{self.egasi}: {self._balans:,} so‘m"\n\nh = Hamyon("Navro‘z")\nh.toldirish(50000)\nprint(h)',
  q: [
   ['Obyekt yaratilganda qaysi metod ishlaydi?', ['__str__','__init__','__main__','start()'], 1, '__init__ — konstruktor.'],
   ['self nimani bildiradi?', ['Joriy obyektni','Klass nomini','Modulni','Global o‘zgaruvchini'], 0, 'self — obyektning o‘zi.'],
   ['print(obj) matnini belgilovchi metod?', ['__print__','__str__','__text__','show()'], 1, '__str__.']] },
{ v: [
  ['Vorislik', 'Yangi klass mavjud klassdan meros oladi: barcha atribut va metodlarni qayta yozmasdan ishlatadi.', 'class Odam:\n    ...\nclass Oqituvchi(Odam):\n    ...'],
  ['super()', 'super bilan ota klass metodini chaqiramiz va unga yangi narsa qo‘shamiz.', 'def __init__(self, ism, fan):\n    super().__init__(ism)\n    self.fan = fan'],
  ['Polimorfizm', 'Har xil klasslar bir xil nomdagi metodni o‘zicha bajaradi. Masalan, har bir to‘lov turi tolash metodini o‘z usulida bajaradi.'],
  ['Amaliy misol', 'Payme, Click va karta to‘lovi — uchta klass, lekin dastur ularni bir xil chaqiradi: tolov.tolash(summa).']],
  x: 'Vorislik “is-a” munosabatini ifodalaydi: *O‘qituvchi* — bu *Odam*. Agar munosabat “has-a” bo‘lsa (Kursda *darslar bor*), vorislik emas, **kompozitsiya** ishlating.\n\nMetodni qayta aniqlash (override): bola klassda ota klassdagi nomdagi metodni yozsangiz, u ustun bo‘ladi.\n\nPolimorfizm kodni kengaytirishni osonlashtiradi: yangi to‘lov turini qo‘shish uchun faqat yangi klass yozasiz, qolgan kod o‘zgarmaydi.',
  lang: 'python',
  code: 'class Tolov:\n    def __init__(self, summa):\n        self.summa = summa\n    def tolash(self):\n        raise NotImplementedError\n\nclass Payme(Tolov):\n    def tolash(self):\n        return f"Payme orqali {self.summa} so‘m"\n\nclass Click(Tolov):\n    def tolash(self):\n        return f"Click orqali {self.summa} so‘m"\n\nfor t in [Payme(49000), Click(79000)]:\n    print(t.tolash())',
  q: [
   ['Ota klass metodini chaqirish?', ['parent()','super()','base()','this()'], 1, 'super().'],
   ['Polimorfizm nima?', ['Bir nomdagi metodning turli klasslarda turlicha ishlashi','Ko‘p fayl','Xato turi','Sikl'], 0, 'Bir interfeys — ko‘p shakl.'],
   ['class B(A) nima degani?', ['B A’dan meros oladi','A B’dan meros oladi','Ikkalasi bir xil','Xato'], 0, 'B — bola klass.']] },
{ v: [
  ['Xatolar muqarrar', 'Foydalanuvchi son o‘rniga harf yozadi, fayl topilmaydi, internet uziladi. Yaxshi dastur bunda qulamaydi.'],
  ['try va except', 'Xavfli kod try ichida, xato bo‘lganda bajariladigan kod except ichida.', 'try:\n    yosh = int(input("Yosh: "))\nexcept ValueError:\n    print("Iltimos, son kiriting")'],
  ['finally', 'finally bloki xato bo‘lsa ham, bo‘lmasa ham bajariladi — masalan, ulanishni yopish uchun.'],
  ['O‘z xatoingiz', 'raise bilan o‘zingiz xato chiqarasiz — noto‘g‘ri ma’lumotni erta to‘xtatish uchun.', 'if summa <= 0:\n    raise ValueError("Summa musbat bo‘lsin")']],
  x: 'Keng tarqalgan xatolar: `ValueError` (noto‘g‘ri qiymat), `TypeError` (noto‘g‘ri tur), `KeyError` (lug‘atda kalit yo‘q), `IndexError`, `FileNotFoundError`, `ZeroDivisionError`.\n\nFaqat kutilgan xatoni ushlang. Bo‘sh `except:` hamma narsani yutib yuboradi va haqiqiy muammoni yashiradi.\n\n`else` bloki xato bo‘lmaganda bajariladi. To‘liq tuzilma: `try → except → else → finally`.',
  lang: 'python',
  code: 'def xavfsiz_bolish(a, b):\n    try:\n        natija = a / b\n    except ZeroDivisionError:\n        print("Nolga bo‘lib bo‘lmaydi")\n        return None\n    except TypeError:\n        print("Faqat sonlar!")\n        return None\n    else:\n        return natija\n    finally:\n        print("Hisob tugadi")\n\nprint(xavfsiz_bolish(10, 2))\nprint(xavfsiz_bolish(10, 0))',
  q: [
   ['int("abc") qanday xato beradi?', ['TypeError','ValueError','KeyError','IndexError'], 1, 'Noto‘g‘ri qiymat — ValueError.'],
   ['Har doim bajariladigan blok?', ['else','except','finally','try'], 2, 'finally.'],
   ['O‘zingiz xato chiqarish?', ['throw','raise','error()','panic'], 1, 'raise.']] }
],
exam: [
 ['def f(*a): — a qanday tur?', ['list','tuple','dict','str'], 1],
 ['Fayl bilan xavfsiz ishlash?', ['with open(...)','open() va unutish','file.go()','read()'], 0],
 ['Klass yaratish so‘zi?', ['object','class','def','new'], 1],
 ['Konstruktor metodi?', ['__init__','__new__','constructor','__start__'], 0],
 ['self nima?', ['Joriy obyekt','Klass','Modul','Funksiya'], 0],
 ['Vorislik yozuvi?', ['class B(A):','class B extends A:','class B -> A:','class B: A'], 0],
 ['Ota klass metodini chaqirish?', ['super()','base()','parent()','old()'], 0],
 ['Nolga bo‘lish xatosi?', ['ValueError','ZeroDivisionError','TypeError','MathError'], 1],
 ['finally qachon bajariladi?', ['Faqat xato bo‘lganda','Doim','Hech qachon','Faqat xato bo‘lmaganda'], 1],
 ['Polimorfizm misoli?', ['Har xil klasslarda bir nomdagi metod','Bitta o‘zgaruvchi','Ro‘yxat','import'], 0]
]
};
