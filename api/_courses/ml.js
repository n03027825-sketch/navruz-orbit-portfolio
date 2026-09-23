module.exports = {
lessons: [
{ task:'Atrofingizdagi 3 ta muammoni yozing va ularning qaysi biri ML bilan yechiladi — izohlang.', v: [
  ['Kompyuter qanday o‘rganadi?', 'Oddiy dasturda qoidalarni biz yozamiz. Machine Learning’da esa kompyuterga misollar beramiz va u qoidani o‘zi topadi.'],
  ['Kundalik misollar', 'Spam filtri, YouTube tavsiyalari, yuzni tanish, narxni bashorat qilish — bularning hammasi ML.'],
  ['Uch turi', 'O‘qituvchili o‘rganish — javoblari bor misollardan; o‘qituvchisiz — guruhlarni o‘zi topadi; mustahkamlash — mukofot va jazo orqali.'],
  ['Asosiy vosita', 'Python’da scikit-learn kutubxonasi ML’ni o‘rganish uchun eng qulay: bir necha qatorda model tayyor.', 'pip install scikit-learn pandas']],
  x: '**O‘qituvchili o‘rganish** (supervised) ikki turga bo‘linadi: *regressiya* — son bashorat qilish (uy narxi), *klassifikatsiya* — toifa bashorat qilish (spam yoki spam emas).\n\nAtamalar: **belgilar** (features, X) — kiruvchi ma’lumot (maydon, xonalar soni); **nishon** (target, y) — bashorat qilinadigan qiymat (narx).\n\nML sehrgarlik emas: model faqat ko‘rgan ma’lumotdagi qonuniyatlarni o‘rganadi. Yomon ma’lumot — yomon model (“garbage in, garbage out”).',
  lang: 'python',
  code: '# ML ning umumiy sxemasi\n# 1. Ma’lumot:   X (belgilar), y (javob)\n# 2. Model:      model = Algoritm()\n# 3. O‘rgatish:  model.fit(X_train, y_train)\n# 4. Bashorat:   model.predict(X_test)\n# 5. Baholash:   aniqlik, xato',
  q: [
   ['Son bashorat qilish qaysi masala?', ['Regressiya','Klassifikatsiya','Klasterlash','Saralash'], 0, 'Regressiya — son.'],
   ['Spam yoki spam emas — qaysi masala?', ['Regressiya','Klassifikatsiya','SQL','Rekursiya'], 1, 'Toifa — klassifikatsiya.'],
   ['Belgilar (features) nima?', ['Kiruvchi ma’lumot ustunlari','Javob','Grafik','Xato'], 0, 'X — belgilar.']] },
{ task:'Kichik CSV oling, ustunlarni raqamga aylantiring va train/test ga ajrating.', v: [
  ['Ma’lumot — 80 foiz ish', 'ML loyihada vaqtning ko‘p qismi ma’lumotni tayyorlashga ketadi: tozalash, tushunish va o‘zgartirish.'],
  ['Toifali belgilar', 'Model faqat son tushunadi. Shahar nomi kabi matnlarni get_dummies bilan son ustunlarga aylantiramiz.', 'X = pd.get_dummies(df[["maydon", "shahar"]])'],
  ['O‘qitish va test', 'Ma’lumotni ikkiga bo‘lamiz: model o‘qiydigan qism va hech qachon ko‘rmagan test qismi.', 'from sklearn.model_selection import train_test_split'],
  ['Masshtablash', 'Belgilar har xil o‘lchovda bo‘lsa, ba’zi algoritmlar uchun ularni bir xil shkalaga keltiramiz.']],
  x: '`train_test_split(X, y, test_size=0.2, random_state=42)` — 80% o‘rgatish, 20% test. `random_state` natijani qayta takrorlanadigan qiladi.\n\n**Ma’lumot sizib ketishi** (data leakage) — eng xavfli xato: test ma’lumoti o‘rgatishga aralashsa, model aslida yomon bo‘lsa ham ajoyib ko‘rinadi.\n\n`StandardScaler` belgilarni o‘rtacha 0, og‘ish 1 ga keltiradi. Scaler’ni faqat train qismida `fit` qiling, keyin test’ga `transform`.',
  lang: 'python',
  code: 'import pandas as pd\nfrom sklearn.model_selection import train_test_split\n\ndf = pd.read_csv("uylar.csv").dropna()\nX = pd.get_dummies(df[["maydon", "xonalar", "tuman"]], drop_first=True)\ny = df["narx"]\n\nX_train, X_test, y_train, y_test = train_test_split(\n    X, y, test_size=0.2, random_state=42)\nprint(X_train.shape, X_test.shape)',
  q: [
   ['Matnli toifani songa aylantirish?', ['pd.get_dummies','df.to_text','str.number','astype(str)'], 0, 'One-hot kodlash.'],
   ['Test qismi nima uchun?', ['Model ko‘rmagan ma’lumotda baholash','Tezlik','Chiroyli grafik','Xotira'], 0, 'Haqiqiy sifatni o‘lchash.'],
   ['Eng xavfli xato?', ['Ma’lumot sizib ketishi','Grafik rangi','Uzun nom','Izoh yozmaslik'], 0, 'Data leakage.']] },
{ task:'scikit-learn bilan chiziqli regressiya o‘rgating va bashorat chiqaring.', v: [
  ['Chiziqli regressiya', 'Eng oddiy model: ma’lumot orqali eng mos to‘g‘ri chiziq o‘tkazadi. Narx = a × maydon + b.'],
  ['O‘rgatish', 'fit metodi a va b koeffitsientlarini shunday tanlaydiki, xatolar kvadratlari yig‘indisi eng kichik bo‘lsin.', 'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression().fit(X_train, y_train)'],
  ['Bashorat', 'predict yangi ma’lumot uchun natija beradi.', 'model.predict([[75]])'],
  ['Talqin', 'Koeffitsient har belgining ta’sirini ko‘rsatadi: maydon bir kvadrat metrga oshsa, narx qanchaga oshadi.']],
  x: 'Chiziqli regressiya tez, tushunarli va ko‘p holatda yaxshi boshlang‘ich nuqta (**baseline**). Murakkab model baseline’dan yaxshi bo‘lmasa, undan foyda yo‘q.\n\n`model.coef_` — koeffitsientlar, `model.intercept_` — ozod had.\n\nCheklovi: faqat chiziqli bog‘liqlikni ko‘radi. Egri bog‘liqlik uchun polinom belgilar yoki daraxt modellari kerak.',
  lang: 'python',
  code: 'from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error\n\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)\n\nbashorat = model.predict(X_test)\nprint("O‘rtacha xato:", round(mean_absolute_error(y_test, bashorat)), "so‘m")\nfor nom, k in zip(X.columns, model.coef_):\n    print(f"{nom}: {k:,.0f}")',
  q: [
   ['Modelni o‘rgatish metodi?', ['fit()','train_now()','learn()','go()'], 0, 'fit.'],
   ['Bashorat metodi?', ['guess()','predict()','forecast()','answer()'], 1, 'predict.'],
   ['Baseline nima?', ['Oddiy boshlang‘ich model','Eng murakkab model','Ma’lumot fayli','Grafik'], 0, 'Solishtirish nuqtasi.']] },
{ task:'Qaror daraxti bilan klassifikatsiya modelini o‘rgating (masalan: o‘tdi/yiqildi).', v: [
  ['Qaror daraxti', 'Daraxt savollar zanjiri kabi ishlaydi: ball 80 dan yuqorimi? Davomati 90 foizdanmi? Oxirida javob chiqadi.'],
  ['Klassifikatsiya', 'DecisionTreeClassifier toifani bashorat qiladi — masalan, o‘quvchi kursni tugatadimi yoki yo‘q.', 'from sklearn.tree import DecisionTreeClassifier'],
  ['Chuqurlik', 'Juda chuqur daraxt o‘rgatish ma’lumotini yodlab oladi va yangi ma’lumotda yomon ishlaydi — bu overfitting.'],
  ['Tasodifiy o‘rmon', 'Random Forest yuzlab daraxtning ovozini birlashtiradi va odatda bitta daraxtdan aniqroq bo‘ladi.']],
  x: '**Overfitting** — model train’da ajoyib, test’da yomon. **Underfitting** — ikkalasida ham yomon. Maqsad — muvozanat.\n\nDaraxtni cheklash: `max_depth=4`, `min_samples_leaf=10`. Daraxtlarning afzalligi — ularni vizual ko‘rish va tushuntirish mumkin (`plot_tree`).\n\n`predict_proba()` — ehtimollik: “bu o‘quvchi kursni 83% ehtimol bilan tugatadi”.',
  lang: 'python',
  code: 'from sklearn.tree import DecisionTreeClassifier\nfrom sklearn.ensemble import RandomForestClassifier\n\ndaraxt = DecisionTreeClassifier(max_depth=4, random_state=42).fit(X_train, y_train)\normon = RandomForestClassifier(n_estimators=200, random_state=42).fit(X_train, y_train)\n\nprint("Daraxt:", daraxt.score(X_test, y_test))\nprint("O‘rmon:", ormon.score(X_test, y_test))',
  q: [
   ['Train’da yaxshi, test’da yomon holat?', ['Overfitting','Underfitting','Baseline','Scaling'], 0, 'Yodlab olish.'],
   ['Ko‘p daraxtli model?', ['Random Forest','Linear Regression','K-means','Stek'], 0, 'Tasodifiy o‘rmon.'],
   ['Ehtimollikni olish?', ['predict_proba()','chance()','prob()','percent()'], 0, 'predict_proba.']] },
{ task:'Modelni aniqlik (accuracy) va xato (MAE/RMSE) bilan baholang, natijani yozing.', v: [
  ['Model qanchalik yaxshi?', 'Baholashsiz model — taxmin. Har doim test ma’lumotida o‘lchaymiz.'],
  ['Aniqlik yetarli emas', 'Agar 100 bemordan 95 tasi sog‘ bo‘lsa, “hamma sog‘” deydigan model 95 foiz aniq, lekin foydasiz.'],
  ['Precision va Recall', 'Precision — “ha” deganlarimizdan qanchasi to‘g‘ri. Recall — haqiqiy “ha” lardan qanchasini topdik.'],
  ['Kross-validatsiya', 'Ma’lumotni besh qismga bo‘lib, har birida navbat bilan test qilamiz — natija ishonchliroq bo‘ladi.', 'cross_val_score(model, X, y, cv=5)']],
  x: 'Regressiya metrikalari: **MAE** (o‘rtacha mutlaq xato — tushunish oson), **RMSE**, **R²** (1 ga qancha yaqin bo‘lsa, shuncha yaxshi).\n\nKlassifikatsiya: **accuracy**, **precision**, **recall**, **F1** va **confusion matrix** (qaysi toifalar aralashayotganini ko‘rsatadi).\n\nQaysi metrika muhim — biznesga bog‘liq: firibgarlikni aniqlashda recall (hech birini o‘tkazib yubormaslik) muhimroq.',
  lang: 'python',
  code: 'from sklearn.metrics import classification_report, confusion_matrix\nfrom sklearn.model_selection import cross_val_score\n\nbashorat = ormon.predict(X_test)\nprint(confusion_matrix(y_test, bashorat))\nprint(classification_report(y_test, bashorat))\n\nballar = cross_val_score(ormon, X, y, cv=5)\nprint("O‘rtacha:", ballar.mean().round(3), "±", ballar.std().round(3))',
  q: [
   ['Muvozanatsiz ma’lumotda accuracy?', ['Aldamchi bo‘lishi mumkin','Doim eng yaxshi','Keraksiz','Faqat regressiyada'], 0, '95% “hamma sog‘” misoli.'],
   ['Haqiqiy “ha” lardan qanchasini topdik?', ['Precision','Recall','MAE','R²'], 1, 'Recall — qamrov.'],
   ['Kross-validatsiya maqsadi?', ['Ishonchliroq baho','Tezlik','Grafik','Xotira tejash'], 0, 'Bir necha bo‘lakda sinash.']] },
{ task:'Kichik loyiha qiling: ma’lumot → model → bashorat → xulosa, hammasini bitta faylda.', v: [
  ['Birinchi loyiha', 'Keling, o‘quvchi kursni tugatish-tugatmasligini bashorat qiluvchi model quramiz — bu Orbita Akademiyasi uchun ham foydali.'],
  ['Belgilar', 'Kirishlar soni, ko‘rilgan darslar, test ballari, oxirgi faollikdan beri o‘tgan kunlar.'],
  ['Pipeline', 'Pipeline tayyorlash va modelni bitta obyektga jamlaydi — xato kamayadi va joylash osonlashadi.'],
  ['Modelni saqlash', 'joblib bilan modelni faylga saqlab, keyin API ichida yuklab ishlatamiz.', 'import joblib\njoblib.dump(model, "model.joblib")']],
  x: 'ML loyiha bosqichlari: **muammo → ma’lumot → baseline → yaxshilash → baholash → joylash → kuzatish**.\n\nJoylashdan keyin ham ishingiz tugamaydi: vaqt o‘tib ma’lumot o‘zgaradi (**data drift**) va model eskiradi. Uni muntazam qayta o‘rgating.\n\nAxloq: model odamlarga ta’sir qiladigan qaror qabul qilsa (kredit, ishga olish), u adolatli va tushuntiriladigan bo‘lishi kerak. Shaxsiy ma’lumotlarni himoya qiling.',
  lang: 'python',
  code: 'from sklearn.pipeline import make_pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.linear_model import LogisticRegression\nimport joblib\n\nmodel = make_pipeline(StandardScaler(), LogisticRegression(max_iter=1000))\nmodel.fit(X_train, y_train)\nprint("Test aniqligi:", model.score(X_test, y_test))\n\njoblib.dump(model, "tugatish_modeli.joblib")\n# API ichida: model = joblib.load("tugatish_modeli.joblib")',
  q: [
   ['Tayyorlash va modelni birlashtirish?', ['Pipeline','Router','Stek','Commit'], 0, 'make_pipeline.'],
   ['Modelni faylga saqlash?', ['joblib.dump','model.print','save.csv','git push'], 0, 'joblib.'],
   ['Vaqt o‘tib ma’lumot o‘zgarishi?', ['Data drift','Overfitting','Scaling','Leakage'], 0, 'Model eskiradi.']] }
],
exam: [
 ['ML’da qoidani kim topadi?', ['Kompyuter misollardan','Faqat dasturchi','Foydalanuvchi','Hech kim'], 0],
 ['Uy narxini bashorat qilish?', ['Regressiya','Klassifikatsiya','Klasterlash','Saralash'], 0],
 ['Ma’lumotni bo‘lish funksiyasi?', ['train_test_split','split_data','cut()','divide()'], 0],
 ['Modelni o‘rgatish?', ['fit()','predict()','score()','dump()'], 0],
 ['Overfitting?', ['Train’da yaxshi, test’da yomon','Ikkalasida yomon','Ikkalasida yaxshi','Tez ishlash'], 0],
 ['Random Forest nima?', ['Ko‘p daraxt ansambli','Bitta chiziq','Neyron tarmoq','Baza'], 0],
 ['Recall nimani o‘lchaydi?', ['Haqiqiy ijobiylardan qanchasi topildi','Tezlikni','Xotirani','Narxni'], 0],
 ['Kross-validatsiya?', ['Bir necha bo‘lakda navbatma-navbat test','Faqat bitta test','Grafik chizish','Ma’lumotni o‘chirish'], 0],
 ['Modelni saqlash?', ['joblib.dump','pd.save','plt.savefig','print'], 0],
 ['Data drift?', ['Vaqt o‘tib ma’lumot o‘zgarishi','Model tezligi','Xato kod','Fayl nomi'], 0]
]
};
