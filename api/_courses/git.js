module.exports = {
lessons: [
{ v: [
  ['Kodning “vaqt mashinasi”', 'Git — kodingizning har bir o‘zgarishini saqlaydigan tizim. Xato qilsangiz, istalgan oldingi holatga qaytasiz.'],
  ['Nega hamma ishlatadi?', 'Dunyodagi deyarli barcha dasturchilar jamoasi Git bilan ishlaydi. Bir loyihada o‘nlab odam bir vaqtda kod yozadi va hech kimning ishi yo‘qolmaydi.'],
  ['Git va GitHub farqi', 'Git — kompyuteringizdagi dastur. GitHub esa internetdagi xizmat: u Git omborlarini saqlaydi va boshqalar bilan ulashishga imkon beradi.'],
  ['O‘rnatish', 'git-scm.com saytidan Git’ni o‘rnating, so‘ng ismingiz va emailingizni bir marta sozlang.', 'git config --global user.name "Navro‘z"\ngit config --global user.email "siz@mail.uz"']],
  x: 'Versiya nazoratisiz dasturchi fayllarni `sayt_final`, `sayt_final2`, `sayt_eng_oxirgi` deb nusxalaydi. Git bu tartibsizlikni yo‘qotadi: bitta papka, lekin to‘liq tarix.\n\nGit’dagi har bir saqlangan holat **commit** deyiladi. Commit — loyihaning o‘sha paytdagi surati, uning muallifi, vaqti va izohi bilan.\n\nTerminal (buyruqlar qatori) bilan ishlashdan qo‘rqmang: Git uchun atigi 10 ta buyruq kundalik ishning 95 foizini qoplaydi.',
  lang: 'bash',
  code: 'git --version\ngit config --global user.name "Navro‘z"\ngit config --global user.email "siz@mail.uz"\ngit config --list',
  q: [
   ['Git nima?', ['Dasturlash tili','Versiya nazorati tizimi','Brauzer','Sayt'], 1, 'Git — o‘zgarishlar tarixini saqlaydi.'],
   ['GitHub nima?', ['Git omborlarini internetda saqlaydigan xizmat','Kod muharriri','Antivirus','Git’ning boshqa nomi'], 0, 'GitHub — onlayn xizmat.'],
   ['Saqlangan holat nima deb ataladi?', ['save','commit','push','branch'], 1, 'Commit — loyiha surati.']] },
{ v: [
  ['Ombor yaratish', 'git init buyrug‘i joriy papkani Git ombori, ya’ni repository qiladi.', 'mkdir sayt && cd sayt\ngit init'],
  ['Uch bosqich', 'Fayl avval ishchi papkada o‘zgaradi, keyin git add bilan tayyorlov hududiga qo‘yiladi va git commit bilan tarixga yoziladi.'],
  ['Holatni ko‘rish', 'git status nima o‘zgargani va nima commit uchun tayyorligini ko‘rsatadi. Uni tez-tez ishlating.', 'git status'],
  ['Birinchi commit', 'Commit izohi qisqa va aniq bo‘lsin: nima o‘zgardi va nega.', 'git add index.html\ngit commit -m "Bosh sahifa qo‘shildi"']],
  x: '`git add .` — barcha o‘zgargan fayllarni tayyorlaydi. `git add fayl.txt` — faqat bittasini.\n\nYaxshi commit izohlari: *“Aloqa formasi qo‘shildi”*, *“Mobil menyudagi xato tuzatildi”*. Yomonlari: *“o‘zgarish”*, *“asdf”*.\n\n`.gitignore` fayli Git kuzatmasligi kerak bo‘lgan narsalarni sanaydi: parollar, `.env`, `node_modules`, vaqtinchalik fayllar. **Maxfiy kalitlarni hech qachon commit qilmang.**',
  lang: 'bash',
  code: 'git init\necho "# Mening saytim" > README.md\ngit add README.md\ngit commit -m "Loyiha boshlandi"\n\necho ".env" >> .gitignore\ngit add .gitignore\ngit commit -m ".env Git’dan yashirildi"',
  q: [
   ['Papkani Git omboriga aylantirish?', ['git start','git init','git new','git create'], 1, 'git init.'],
   ['Faylni commit uchun tayyorlash?', ['git add','git push','git save','git ready'], 0, 'git add.'],
   ['Maxfiy .env faylni qayerga yozish kerak?', ['README.md','.gitignore','commit izohiga','index.html'], 1, '.gitignore uni kuzatuvdan chiqaradi.']] },
{ v: [
  ['Tarixni ko‘rish', 'git log barcha commitlarni ko‘rsatadi. oneline bayrog‘i bilan ixcham ko‘rinadi.', 'git log --oneline'],
  ['Nima o‘zgardi?', 'git diff hali commit qilinmagan o‘zgarishlarni qatorma-qator ko‘rsatadi: qo‘shilgani yashil, o‘chirilgani qizil.', 'git diff'],
  ['Faylni qaytarish', 'Faylni oxirgi commit holatiga qaytarish uchun git restore ishlatiladi.', 'git restore index.html'],
  ['Commitni bekor qilish', 'git revert yangi commit yaratib, eskisining ta’sirini bekor qiladi. Tarix buzilmaydi — bu xavfsiz usul.', 'git revert a1b2c3d']],
  x: 'Har bir commitning noyob **hash** kodi bor, masalan `a1b2c3d`. U orqali istalgan holatga murojaat qilinadi: `git show a1b2c3d`.\n\n`git restore` — hali commit qilinmagan o‘zgarishni tashlaydi. `git revert` — commitni bekor qiluvchi yangi commit. `git reset --hard` esa tarixni o‘chiradi — ehtiyot bo‘ling, uni faqat nima qilayotganingizni bilsangiz ishlating.\n\nMaslahat: kichik va tez-tez commit qiling. Xato qilsangiz, kam narsa yo‘qotasiz.',
  lang: 'bash',
  code: 'git log --oneline --graph\ngit diff\ngit show HEAD\ngit restore style.css\ngit revert HEAD',
  q: [
   ['Commitlar ro‘yxatini ko‘rish?', ['git list','git log','git history','git show-all'], 1, 'git log.'],
   ['Commit qilinmagan o‘zgarishlarni ko‘rish?', ['git diff','git status -v','git compare','git check'], 0, 'git diff.'],
   ['Tarixni buzmasdan commitni bekor qilish?', ['git reset --hard','git delete','git revert','git undo'], 2, 'git revert — xavfsiz.']] },
{ v: [
  ['Branch — parallel olam', 'Branch — asosiy koddan ajralgan alohida yo‘l. Unda yangi funksiyani xotirjam sinaysiz, asosiy kod buzilmaydi.'],
  ['Branch yaratish', 'git switch -c yangi branch yaratib, unga o‘tadi.', 'git switch -c tolov-bolimi'],
  ['Birlashtirish', 'Ish tugagach, asosiy branchga qaytib merge qilamiz — o‘zgarishlar qo‘shiladi.', 'git switch main\ngit merge tolov-bolimi'],
  ['Konflikt', 'Ikki branchda bir qator turlicha o‘zgargan bo‘lsa, Git sizdan qaysi biri to‘g‘riligini so‘raydi. Belgilarni o‘chirib, to‘g‘ri variantni qoldirasiz.']],
  x: 'Odatiy ish usuli: `main` — doim ishlaydigan kod. Har bir yangi ish uchun alohida branch: `feature/tolov`, `fix/menu-xato`.\n\nBranchlar ro‘yxati: `git branch`. O‘chirish: `git branch -d nom`.\n\nKonflikt fayli ichida `<<<<<<<`, `=======`, `>>>>>>>` belgilari paydo bo‘ladi. Kerakli qismni qoldiring, belgilarni o‘chiring, keyin `git add` va `git commit`.',
  lang: 'bash',
  code: 'git switch -c feature/sertifikat\n# ... kod yozamiz ...\ngit add .\ngit commit -m "Sertifikat sahifasi"\ngit switch main\ngit merge feature/sertifikat\ngit branch -d feature/sertifikat',
  q: [
   ['Yangi branch yaratib unga o‘tish?', ['git switch -c nom','git new nom','git branch --go nom','git open nom'], 0, 'git switch -c.'],
   ['Branchni asosiyga qo‘shish?', ['git add','git merge','git join','git push'], 1, 'git merge.'],
   ['Konflikt nima?', ['Bir qator ikki xil o‘zgargan holat','Internet uzilishi','Parol xatosi','Fayl o‘chishi'], 0, 'Git qaysi variantni olishni bilmaydi.']] },
{ v: [
  ['Kodni internetga yuborish', 'GitHub’da yangi repository yaratamiz va lokal omborni unga ulaymiz.', 'git remote add origin https://github.com/siz/sayt.git'],
  ['push', 'git push commitlaringizni GitHub’ga yuboradi. Birinchi marta u bayrog‘i bilan branchni bog‘laymiz.', 'git push -u origin main'],
  ['pull', 'Boshqalar yoki boshqa kompyuterda qilingan o‘zgarishlarni git pull tortib oladi.', 'git pull'],
  ['clone', 'Istalgan ochiq loyihani kompyuteringizga to‘liq tarixi bilan nusxalash — git clone.', 'git clone https://github.com/n03027825-sketch/navruz-orbit-portfolio.git']],
  x: '`origin` — masofaviy ombor uchun odatiy nom. `git remote -v` ulangan manzillarni ko‘rsatadi.\n\nKundalik tartib: ishni boshlashda `git pull`, tugatganda `git add` → `git commit` → `git push`.\n\nGitHub hisobingiz — dasturchining **portfoliosi**. Ish beruvchilar va universitetlar ko‘pincha GitHub profilingizga qarab baho beradi: toza README, muntazam commitlar va real loyihalar katta ta’sir qiladi.',
  lang: 'bash',
  code: 'git remote add origin https://github.com/siz/portfolio.git\ngit branch -M main\ngit push -u origin main\n\n# keyingi safarlarda:\ngit pull\ngit add .\ngit commit -m "Yangi loyiha kartasi"\ngit push',
  q: [
   ['Commitlarni GitHub’ga yuborish?', ['git send','git push','git upload','git pull'], 1, 'git push.'],
   ['GitHub’dagi yangiliklarni olish?', ['git pull','git get','git fetch-all','git down'], 0, 'git pull.'],
   ['Loyihani to‘liq nusxalash?', ['git copy','git clone','git fork','git download'], 1, 'git clone.']] },
{ v: [
  ['Pull request', 'Pull request — “mening o‘zgarishlarimni ko‘rib, qo‘shib qo‘ying” degan so‘rov. Jamoada kod shu orqali tekshiriladi.'],
  ['Fork', 'Birovning loyihasiga hissa qo‘shish uchun uni fork qilasiz — o‘z hisobingizda nusxasi paydo bo‘ladi. So‘ng o‘zgartirib, pull request yuborasiz.'],
  ['Kod ko‘rib chiqish', 'Jamoadoshlar izoh qoldiradi, siz tuzatasiz. Bu xatolarni erta topadi va hammani o‘rgatadi.'],
  ['README — loyiha yuzi', 'Har bir repository’da README bo‘lsin: loyiha nima, qanday ishga tushadi, skrinshot va havola.', '# KUNIM\nKun tartibi ilovasi.\n\n**Demo:** https://navruz-kunim.vercel.app']],
  x: 'Pull request (PR) oqimi: branch → commit → push → GitHub’da “Compare & pull request” → tavsif → ko‘rib chiqish → merge.\n\nYaxshi PR kichik bo‘ladi va bitta ishni hal qiladi. Tavsifda nima o‘zgargani va qanday tekshirilganini yozing.\n\nProfilni kuchaytirish: pin qilingan 4–6 ta eng yaxshi loyiha, har birida README va jonli havola, profil README’da o‘zingiz haqingizda qisqa ma’lumot.',
  lang: 'markdown',
  code: '# Navro‘z Orbitasi\n\nPortfolio va o‘quv platformasi.\n\n## Ishga tushirish\n```\ngit clone https://github.com/siz/orbita.git\ncd orbita\n```\n\n## Texnologiyalar\nHTML, CSS, JavaScript, Vercel',
  q: [
   ['Pull request nima?', ['O‘zgarishlarni ko‘rib qo‘shish so‘rovi','Faylni o‘chirish','Parolni tiklash','Server'], 0, 'PR — birlashtirish so‘rovi.'],
   ['Birovning loyihasini o‘z hisobingizga nusxalash?', ['clone','fork','copy','pull'], 1, 'Fork — GitHub’dagi nusxa.'],
   ['Loyiha tavsifi qaysi faylda bo‘ladi?', ['index.html','README.md','.gitignore','LICENSE'], 1, 'README.md.']] }
],
exam: [
 ['Git nima uchun kerak?', ['Rasm chizish','O‘zgarishlar tarixini saqlash','Internetni tezlashtirish','Viruslardan himoya'], 1],
 ['Tayyorlangan o‘zgarishlarni saqlash?', ['git add','git commit','git init','git log'], 1],
 ['Masofaviy omborga yuborish?', ['git pull','git push','git clone','git merge'], 1],
 ['Yangi branch yaratish va o‘tish?', ['git switch -c','git checkout-new','git make','git fork'], 0],
 ['Git kuzatmasligi kerak fayllar ro‘yxati?', ['README.md','.gitignore','.env','package.json'], 1],
 ['git log --oneline nimani ko‘rsatadi?', ['Ixcham commitlar tarixini','Fayllar hajmini','Xatolarni','Branchlarni o‘chiradi'], 0],
 ['Commitni xavfsiz bekor qilish?', ['git revert','git reset --hard','git rm','git clean'], 0],
 ['GitHub’dagi yangi o‘zgarishlarni olish?', ['git push','git pull','git status','git add'], 1],
 ['Konflikt belgisi?', ['<<<<<<<','######','$$$$','!!!!'], 0],
 ['Pull request qayerda ochiladi?', ['Terminalda','GitHub saytida','Brauzer sozlamalarida','Word’da'], 1]
]
};
