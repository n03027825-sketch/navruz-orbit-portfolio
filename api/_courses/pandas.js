module.exports = {
lessons: [
{ v: [
  ['Raqamlar gapiradi', 'Ma’lumot tahlili — xom raqamlardan foydali xulosa chiqarish: qaysi mahsulot ko‘p sotildi, qaysi oy tushum tushdi va nega.'],
  ['Pandas nima?', 'Pandas — Python’ning jadval bilan ishlash kutubxonasi. U Excel’ning dasturchi versiyasi, lekin millionlab qatorni soniyalarda ishlaydi.'],
  ['Jarayon', 'Tahlil besh bosqichdan iborat: savol qo‘yish, ma’lumot yig‘ish, tozalash, tahlil va xulosa.'],
  ['O‘rnatish', 'pip bilan pandas o‘rnatiladi va odatda pd qisqa nomi bilan import qilinadi.', 'pip install pandas matplotlib\nimport pandas as pd']],
  x: 'Yaxshi tahlil **savoldan** boshlanadi, raqamdan emas. “Qaysi kunlari savdo eng yuqori?” — aniq savol; “ma’lumotga qarab chiqaman” — noaniq.\n\nPandas’ning ikki asosiy tuzilmasi: **Series** (bitta ustun) va **DataFrame** (jadval).\n\nJupyter Notebook yoki Google Colab tahlil uchun eng qulay muhit: kod, natija va grafik bir sahifada. Colab brauzerda bepul ishlaydi — o‘rnatish shart emas.',
  lang: 'python',
  code: 'import pandas as pd\n\nsavdo = pd.DataFrame({\n    "mahsulot": ["non", "sut", "choy", "non"],\n    "soni": [40, 12, 5, 35],\n    "narx": [4000, 12000, 32000, 4000],\n})\nsavdo["summa"] = savdo["soni"] * savdo["narx"]\nprint(savdo)\nprint("Jami tushum:", savdo["summa"].sum())',
  q: [
   ['Pandas’da jadval nima deyiladi?', ['Series','DataFrame','Array','Sheet'], 1, 'DataFrame — jadval.'],
   ['Tahlil nimadan boshlanadi?', ['Aniq savoldan','Grafikdan','Rangdan','Kutubxonadan'], 0, 'Savol yo‘nalish beradi.'],
   ['pandas odatda qanday import qilinadi?', ['import pandas as pd','import pd','from pandas import all','use pandas'], 0, 'pd — umumiy qabul qilingan nom.']] },
{ v: [
  ['CSV o‘qish', 'read_csv fayldan DataFrame yaratadi. Excel uchun read_excel bor.', 'df = pd.read_csv("savdo.csv")'],
  ['Birinchi qarash', 'head birinchi qatorlarni, shape o‘lchamni, info esa ustun turlari va bo‘sh qiymatlarni ko‘rsatadi.', 'df.head()\ndf.shape\ndf.info()'],
  ['Statistika', 'describe sonli ustunlar uchun o‘rtacha, minimum, maksimum va kvartillarni bir zumda beradi.', 'df.describe()'],
  ['Ustunga murojaat', 'Kvadrat qavs ichida ustun nomi. Bir nechta ustun uchun ro‘yxat beriladi.', 'df["summa"]\ndf[["sana", "summa"]]']],
  x: '`read_csv` foydali parametrlari: `sep=";"` (ajratuvchi), `encoding="utf-8"`, `parse_dates=["sana"]` (sanani avtomatik o‘qish).\n\n`df.dtypes` har ustunning turini ko‘rsatadi. Raqam matn bo‘lib qolgan bo‘lsa (masalan “12 000”), uni tozalab `astype(int)` qilish kerak — keyingi darslarda.\n\n`df.columns` ustun nomlari, `df.sample(5)` — tasodifiy 5 qator (ma’lumotni his qilish uchun yaxshi).',
  lang: 'python',
  code: 'df = pd.read_csv("savdo.csv", parse_dates=["sana"])\nprint(df.shape)          # (qatorlar, ustunlar)\nprint(df.head())\nprint(df.info())\nprint(df["summa"].describe())',
  q: [
   ['CSV fayldan o‘qish?', ['pd.open_csv','pd.read_csv','pd.load','pd.csv()'], 1, 'read_csv.'],
   ['Birinchi 5 qator?', ['df.top()','df.head()','df.first5()','df[:5:]'], 1, 'head().'],
   ['Qatorlar va ustunlar soni?', ['df.size()','df.shape','df.len','df.count'], 1, 'shape — (qator, ustun).']] },
{ v: [
  ['Shart bo‘yicha filtr', 'Qavs ichida shart yozilsa, faqat mos qatorlar qoladi.', 'df[df["summa"] > 100000]'],
  ['Bir nechta shart', 'Va uchun ampersand, yoki uchun vertikal chiziq. Har bir shart qavsga olinadi.', 'df[(df["shahar"] == "Toshkent") & (df["soni"] > 10)]'],
  ['loc va iloc', 'loc nom bo‘yicha, iloc esa tartib raqami bo‘yicha tanlaydi.', 'df.loc[0:4, ["mahsulot", "summa"]]\ndf.iloc[0, 2]'],
  ['Saralash', 'sort_values bir yoki bir nechta ustun bo‘yicha tartiblaydi.', 'df.sort_values("summa", ascending=False).head(10)']],
  x: 'Pandas’da `and`/`or` emas, `&` va `|` ishlatiladi, har shart qavsda: `(A) & (B)`.\n\n`isin()` — ro‘yxatdagi qiymatlar: `df[df["mahsulot"].isin(["non", "sut"])]`. `str.contains()` — matn ichida qidirish.\n\n`query()` metodi o‘qishga qulay: `df.query("summa > 100000 and shahar == \'Toshkent\'")`.',
  lang: 'python',
  code: 'katta = df[(df["summa"] >= 100_000) & (df["shahar"].isin(["Toshkent", "Buxoro"]))]\ntop10 = katta.sort_values("summa", ascending=False).head(10)\nprint(top10[["sana", "mahsulot", "summa"]])',
  q: [
   ['Pandas’da “va” operatori?', ['and','&&','&','+'], 2, '& — element bo‘yicha va.'],
   ['Tartib raqami bo‘yicha tanlash?', ['loc','iloc','at_name','pos'], 1, 'iloc — integer location.'],
   ['Kamayish bo‘yicha saralash?', ['sort_values(..., ascending=False)','sort(desc)','order_by()','reverse()'], 0, 'ascending=False.']] },
{ v: [
  ['Xom ma’lumot iflos', 'Real hayotda ma’lumot to‘liq emas: bo‘sh kataklar, takror qatorlar, noto‘g‘ri formatlar. Tahlilning yarmi — tozalash.'],
  ['Bo‘sh qiymatlar', 'isna bo‘shlarni topadi. dropna o‘chiradi, fillna esa to‘ldiradi.', 'df.isna().sum()\ndf["narx"] = df["narx"].fillna(df["narx"].median())'],
  ['Takrorlar', 'duplicated takror qatorlarni ko‘rsatadi, drop_duplicates ularni o‘chiradi.', 'df = df.drop_duplicates()'],
  ['Formatni tuzatish', 'Matndagi bo‘sh joy va vergullarni olib, songa aylantiramiz. Sanani to_datetime bilan.', 'df["summa"] = df["summa"].str.replace(" ", "").astype(int)']],
  x: 'Tozalash qarorlari **biznes mantiqqa** bog‘liq: narxi yo‘q qatorni o‘chirasizmi yoki o‘rtacha bilan to‘ldirasizmi? Qaroringizni hisobotda yozing.\n\nMatnni bir xillashtirish: `df["shahar"].str.strip().str.title()` — “ toshkent ” → “Toshkent”.\n\nTozalashdan oldin va keyin `df.shape` ni solishtiring — nechta qator o‘chganini bilib turing. Sales Insight Lab loyihasi aynan shu bosqichlarni avtomatik bajaradi.',
  lang: 'python',
  code: 'print("Oldin:", df.shape)\ndf["shahar"] = df["shahar"].str.strip().str.title()\ndf["summa"] = pd.to_numeric(df["summa"].astype(str).str.replace(r"[^0-9]", "", regex=True), errors="coerce")\ndf["sana"] = pd.to_datetime(df["sana"], errors="coerce")\ndf = df.dropna(subset=["sana", "summa"]).drop_duplicates()\nprint("Keyin:", df.shape)',
  q: [
   ['Bo‘sh qiymatlarni topish?', ['df.isna()','df.empty()','df.null()','df.blank()'], 0, 'isna / isnull.'],
   ['Takror qatorlarni o‘chirish?', ['drop_duplicates()','remove_same()','unique()','dedupe()'], 0, 'drop_duplicates.'],
   ['Matnni sanaga aylantirish?', ['pd.to_datetime','pd.date()','astype(date)','str.date'], 0, 'to_datetime.']] },
{ v: [
  ['groupby — biznes savollari', 'groupby qatorlarni guruhlab, har guruh uchun hisoblaydi: har mahsulot bo‘yicha jami savdo.', 'df.groupby("mahsulot")["summa"].sum()'],
  ['Bir nechta hisob', 'agg bilan bir nechta funksiya birdan: jami, o‘rtacha va soni.', 'df.groupby("shahar")["summa"].agg(["sum", "mean", "count"])'],
  ['Vaqt bo‘yicha', 'Sanadan oyni ajratib, oylik tushumni hisoblaymiz.', 'df.groupby(df["sana"].dt.to_period("M"))["summa"].sum()'],
  ['Pivot jadval', 'pivot_table Excel’dagi yig‘ma jadval kabi: qatorlarda mahsulot, ustunlarda shahar.']],
  x: '“Split — apply — combine”: ma’lumot guruhlarga bo‘linadi, har biriga funksiya qo‘llanadi va natija birlashtiriladi.\n\nFoydali metodlar: `value_counts()` (har qiymat necha marta), `nlargest(5, "summa")`, `pct_change()` (o‘sish foizi), `cumsum()` (yig‘ma).\n\nOylik o‘sish: `oylik.pct_change() * 100` — har oy oldingisiga nisbatan necha foiz o‘zgarganini ko‘rsatadi.',
  lang: 'python',
  code: 'mahsulot_boyicha = (df.groupby("mahsulot")["summa"]\n                     .sum()\n                     .sort_values(ascending=False))\nulush = (mahsulot_boyicha / mahsulot_boyicha.sum() * 100).round(1)\nprint(pd.DataFrame({"tushum": mahsulot_boyicha, "ulush_%": ulush}))\n\noylik = df.groupby(df["sana"].dt.to_period("M"))["summa"].sum()\nprint((oylik.pct_change() * 100).round(1))',
  q: [
   ['Guruhlash metodi?', ['group()','groupby()','split()','cluster()'], 1, 'groupby.'],
   ['Bir nechta agregat birdan?', ['agg()','multi()','all()','calc()'], 0, 'agg([...]).'],
   ['Oylik o‘sish foizi?', ['pct_change()','growth()','diff_percent()','rate()'], 0, 'pct_change.']] },
{ v: [
  ['Grafik — tez tushunish', 'Odam jadvaldan ko‘ra grafikni tezroq tushunadi. Pandas matplotlib bilan bir qatorda grafik chizadi.', 'oylik.plot(kind="line")'],
  ['To‘g‘ri grafikni tanlash', 'Vaqt bo‘yicha o‘zgarish — chiziq, toifalarni solishtirish — ustun, ulush — gorizontal ustun. Doira diagrammadan ehtiyot bo‘ling.'],
  ['Sarlavha va birlik', 'Har bir grafikda sarlavha, o‘q nomlari va birlik bo‘lsin: tushum, million so‘m.'],
  ['Xulosa yozish', 'Grafikdan keyin uch qatorli xulosa: nima bo‘ldi, nega muhim va nima qilish kerak.']],
  x: 'Yaxshi xulosa formulasi: **Fakt → Sabab → Tavsiya**.\n\n*Misol*: “Sentabrda tushum 13% oshdi (fakt). O‘sishning asosiy qismi Toshkent filialidagi non va sutdan keldi (sabab). Shu ikki mahsulot zaxirasini 15% ko‘paytirish tavsiya etiladi (tavsiya).”\n\nGrafikni saqlash: `plt.savefig("oylik.png", dpi=150, bbox_inches="tight")`. Hisobotni rahbarga yuborishda grafik + 3 ta xulosa kifoya.',
  lang: 'python',
  code: 'import matplotlib.pyplot as plt\n\nax = (oylik / 1e6).plot(kind="line", marker="o", figsize=(8, 4))\nax.set_title("Oylik tushum")\nax.set_ylabel("mln so‘m")\nax.set_xlabel("")\nplt.tight_layout()\nplt.savefig("oylik_tushum.png", dpi=150)\n\neng_yaxshi = oylik.idxmax()\nprint(f"Eng yuqori oy: {eng_yaxshi}, {oylik.max():,.0f} so‘m")',
  q: [
   ['Vaqt bo‘yicha o‘zgarish uchun grafik?', ['Chiziqli','Doira','3D','Nuqtali xarita'], 0, 'Line chart.'],
   ['Yaxshi xulosa tuzilishi?', ['Fakt → Sabab → Tavsiya','Faqat raqam','Faqat grafik','Rang tanlash'], 0, 'Harakatga undovchi xulosa.'],
   ['Grafikni faylga saqlash?', ['plt.savefig()','plt.export()','df.save_png()','plt.download()'], 0, 'savefig.']] }
],
exam: [
 ['Pandas’da jadval?', ['DataFrame','Table','Grid','Sheet'], 0],
 ['CSV o‘qish?', ['pd.read_csv','pd.open','pd.csv_load','read()'], 0],
 ['Ustunlar turlari va bo‘shlar?', ['df.info()','df.help()','df.about()','df.type()'], 0],
 ['Filtrda “yoki”?', ['|','or','||','+'], 0],
 ['Bo‘shlarni to‘ldirish?', ['fillna','fill()','replace_null','addna'], 0],
 ['Takrorlarni o‘chirish?', ['drop_duplicates','unique_rows','no_dup','clear()'], 0],
 ['Har mahsulot bo‘yicha jami?', ['groupby("mahsulot")["summa"].sum()','sum(df)','df.total()','df["summa"].group()'], 0],
 ['Oylik o‘sish foizi?', ['pct_change()','growth()','rate()','diff_pct()'], 0],
 ['Toifalarni solishtirish grafigi?', ['Ustunli','Chiziqli','Radar','Xarita'], 0],
 ['Yaxshi xulosaning oxirgi qismi?', ['Tavsiya','Rang','Shrift','Hajm'], 0]
]
};
