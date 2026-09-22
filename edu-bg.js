/* =========================================================
   edu-bg.js — ta'limga oid jonli fon (sayyoralar foni o'rniga).
   Suzuvchi kod bo'laklari, formulalar va "neyron tarmoq" yulduzlari.
   Bosh sahifada NV.Space API'sini ham beradi (warp, pos, onSector, measure),
   akademiya sahifasida esa shunchaki fon sifatida ishlaydi.
   ========================================================= */
(function(){
  const cv=document.getElementById('space')||document.getElementById('bg');
  if(!cv)return;
  const g=cv.getContext('2d');
  const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HAS_NV=typeof window.NV==='object'&&window.NV.SECTORS;
  let W=0,H=0,DPR=1,small=false,cards=[],glyphs=[],nodes=[],t0=performance.now(),warpUntil=0,speed=1,sy=0,lastSy=0,mx=0,my=0,pmx=0,pmy=0;
  let tint=[108,228,240],tintT=[108,228,240];

  const SNIPPETS=[
    ['python','for dars in kurs:\n    o‘rgan(dars)\n    test_top(dars)'],
    ['python','def sertifikat(ball):\n    return ball >= 70'],
    ['js','const bilim = kun * mehnat;\nconsole.log(bilim);'],
    ['python','import pandas as pd\ndf = pd.read_csv("savdo.csv")\ndf.groupby("oy").sum()'],
    ['sql','SELECT ism, ball\nFROM talabalar\nORDER BY ball DESC;'],
    ['html','<h1>Salom, dunyo!</h1>\n<p>Birinchi saytim</p>'],
    ['css','.karta {\n  display: flex;\n  gap: 16px;\n}'],
    ['python','model.fit(X_train, y_train)\nmodel.predict(X_test)'],
    ['bash','git add .\ngit commit -m "yangi dars"\ngit push'],
    ['python','@dp.message(CommandStart())\nasync def start(msg):\n    await msg.answer("Salom!")'],
    ['js','btn.addEventListener("click",\n  () => kurs.boshla());'],
    ['python','while not maqsad:\n    harakat += 1'],
    ['python','print(f"Salom, {ism}!")'],
    ['js','[1,2,3].map(n => n * n)'],
    ['python','@app.get("/kurslar")\ndef royxat():\n    return KURSLAR']
  ];
  const FORMULAS=['a² + b² = c²','E = mc²','∑ xᵢ / n','O(log n)','f(x) = ax + b','π ≈ 3.1416','D = b² − 4ac','y = wx + b','∫ f(x) dx','P(A|B)','n! = n·(n−1)!','√2 ≈ 1.414','{ }','</>','λx.x','∞','Δ','σ²','if / else','01001'];
  const COL={k:'#FF5D8F',s:'#7CF0A6',n:'#FFB547',c:'#6E6C92',f:'#6CE4F0',t:'#D9D8F0'};
  const KW=/\b(for|in|def|return|import|as|const|let|while|not|async|await|SELECT|FROM|ORDER|BY|DESC|git|display|gap|class|if|else|print)\b/g;

  function hl(line){
    // oddiy rang ajratish: [matn, rang] bo'laklari
    const out=[];let rest=line;const re=/("[^"]*"|'[^']*'|#.*$|\/\/.*$|\b\d+\b|\b(?:for|in|def|return|import|as|const|let|while|not|async|await|SELECT|FROM|ORDER|BY|DESC|git|display|gap|class|if|else|print)\b|[a-zA-Z_]+(?=\())/g;
    let last=0,m;while((m=re.exec(line))){if(m.index>last)out.push([line.slice(last,m.index),COL.t]);const s=m[0];
      out.push([s,s[0]==='"'||s[0]==="'"?COL.s:(s[0]==='#'||s.startsWith('//'))?COL.c:/^\d/.test(s)?COL.n:/^[a-zA-Z_]+$/.test(s)&&line[m.index+s.length]==='('?COL.f:COL.k]);last=m.index+s.length}
    if(last<line.length)out.push([line.slice(last),COL.t]);return out;
  }
  function renderCard(lang,code){
    const lines=code.split('\n'),fs=small?11:12.5,lh=fs*1.55,pad=14;
    const c=document.createElement('canvas'),x=c.getContext('2d');
    x.font=`500 ${fs}px "JetBrains Mono",ui-monospace,monospace`;
    const w=Math.ceil(Math.max(...lines.map(l=>x.measureText(l).width))+pad*2),h=Math.ceil(lines.length*lh+pad*2+18);
    c.width=w*DPR;c.height=h*DPR;x.scale(DPR,DPR);
    x.fillStyle='rgba(14,16,34,.78)';x.strokeStyle='rgba(170,180,255,.18)';x.lineWidth=1;
    const r=12;x.beginPath();x.moveTo(r,0);x.arcTo(w,0,w,h,r);x.arcTo(w,h,0,h,r);x.arcTo(0,h,0,0,r);x.arcTo(0,0,w,0,r);x.closePath();x.fill();x.stroke();
    ['#FF5D8F','#FFB547','#7CF0A6'].forEach((cc,i)=>{x.fillStyle=cc;x.globalAlpha=.8;x.beginPath();x.arc(pad+i*12,11,3.2,0,7);x.fill()});x.globalAlpha=1;
    x.font=`600 ${fs-2}px "JetBrains Mono",monospace`;x.fillStyle='#6E6C92';x.fillText(lang,w-pad-x.measureText(lang).width,14);
    x.font=`500 ${fs}px "JetBrains Mono",ui-monospace,monospace`;x.textBaseline='top';
    lines.forEach((l,i)=>{let cx=pad;hl(l).forEach(([s,col])=>{x.fillStyle=col;x.fillText(s,cx,pad+18+i*lh);cx+=x.measureText(s).width})});
    return {img:c,w,h};
  }
  function build(){
    cards=[];const n=small?7:13;
    for(let i=0;i<n;i++){const [lang,code]=SNIPPETS[i%SNIPPETS.length];const r=renderCard(lang,code);
      cards.push({...r,x:Math.random(),y:Math.random(),z:.35+Math.random()*.65,vy:.00004+Math.random()*.00006,rot:(Math.random()-.5)*.08,ph:Math.random()*6})}
    glyphs=[];const gn=small?14:26;
    for(let i=0;i<gn;i++)glyphs.push({s:FORMULAS[i%FORMULAS.length],x:Math.random(),y:Math.random(),z:.3+Math.random()*.7,vy:.00003+Math.random()*.00007,ph:Math.random()*6,c:['#6CE4F0','#B79CFF','#FFB547','#7CF0A6','#FF5D8F'][i%5]});
    nodes=[];const nn=small?34:70;
    for(let i=0;i<nn;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:Math.random()*1.6+.4});
  }
  function resize(){DPR=Math.min(devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;small=W<700;cv.width=W*DPR;cv.height=H*DPR;g.setTransform(DPR,0,0,DPR,0,0);build();measure()}

  /* ---- NV.Space bilan moslik (bosh sahifa) ---- */
  const pos={i:0,f:0,au:1};const listeners=[];let secs=[],cur=-1;
  function measure(){if(!HAS_NV)return;sy=scrollY;secs=NV.SECTORS.map(s=>{const el=document.getElementById(s.id);if(!el)return{top:0,h:H};const r=el.getBoundingClientRect();return{top:r.top+scrollY,h:r.height}})}
  function updatePos(){if(!HAS_NV||!secs.length)return;const probe=sy+H*.45;let i=0;for(let k=0;k<secs.length;k++)if(secs[k].top<=probe)i=k;
    const a=secs[i],b=secs[i+1];let f=0;if(b){const ca=a.top+Math.min(a.h,H)*.5,cb=b.top;f=Math.min(1,Math.max(0,(probe-ca)/((cb-ca)||1)))}
    const A=NV.SECTORS[i].au,B=NV.SECTORS[Math.min(i+1,secs.length-1)].au;pos.i=i;pos.f=f;pos.au=Math.exp(Math.log(A)+(Math.log(B)-Math.log(A))*f);
    if(i!==cur){const prev=cur;cur=i;const c=NV.SECTORS[i].c;tintT=[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];listeners.forEach(fn=>fn(i,prev))}}

  function frame(now){
    sy=scrollY;const vel=sy-lastSy;lastSy=sy;updatePos();
    pmx+=(mx-pmx)*.05;pmy+=(my-pmy)*.05;
    let target=1+Math.min(Math.abs(vel)*.02,4);if(now<warpUntil)target=9;if(RM)target=0;speed+=(target-speed)*.06;
    for(let k=0;k<3;k++)tint[k]+=(tintT[k]-tint[k])*.03;
    const [tr,tg,tb]=tint.map(Math.round);
    // fon
    const bg=g.createRadialGradient(W*.5,H*.35,0,W*.5,H*.4,Math.max(W,H)*.9);
    bg.addColorStop(0,`rgba(${tr},${tg},${tb},.10)`);bg.addColorStop(.45,'#070919');bg.addColorStop(1,'#04050B');
    g.fillStyle=bg;g.fillRect(0,0,W,H);
    // setka (daftar katak)
    g.strokeStyle='rgba(170,180,255,.045)';g.lineWidth=1;const step=small?38:52,off=(sy*.15)%step;
    g.beginPath();for(let x=(pmx*20)%step;x<W;x+=step){g.moveTo(x,0);g.lineTo(x,H)}for(let y=-off;y<H;y+=step){g.moveTo(0,y);g.lineTo(W,y)}g.stroke();
    // neyron tarmoq
    const sp=Math.max(.2,speed*.6);
    for(const n of nodes){n.x+=n.vx*sp;n.y+=n.vy*sp-vel*.05;if(n.x<0)n.x+=W;if(n.x>W)n.x-=W;if(n.y<0)n.y+=H;if(n.y>H)n.y-=H}
    g.lineWidth=.7;
    for(let i=0;i<nodes.length;i++){const a=nodes[i];for(let j=i+1;j<nodes.length;j++){const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=dx*dx+dy*dy;if(d<11000){g.strokeStyle=`rgba(${tr},${tg},${tb},${(1-d/11000)*.16})`;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()}}}
    for(const n of nodes){g.fillStyle=`rgba(${tr},${tg},${tb},.55)`;g.beginPath();g.arc(n.x,n.y,n.r,0,7);g.fill()}
    // formulalar
    g.textBaseline='middle';
    for(const q of glyphs){q.y-=q.vy*speed*(.6+q.z)*16;if(q.y<-.05){q.y=1.05;q.x=Math.random()}
      const x=q.x*W+pmx*40*q.z,y=q.y*H+pmy*30*q.z-(sy*.08*q.z)%H;const yy=((y%H)+H)%H;
      g.globalAlpha=(.12+.22*q.z)*(.75+.25*Math.sin(now*.001+q.ph));g.fillStyle=q.c;g.font=`${600} ${Math.round((small?12:15)+q.z*10)}px "JetBrains Mono",monospace`;g.fillText(q.s,x,yy)}
    // kod kartalari
    for(const c of cards){c.y-=c.vy*speed*(.5+c.z)*16;if(c.y<-.2){c.y=1.15;c.x=Math.random()}
      const s=(small?.62:.78)*c.z+.18,w=c.w*s,h=c.h*s;const x=c.x*(W+w)-w/2+pmx*60*c.z,y=c.y*(H+h)-h/2+pmy*40*c.z;
      g.save();g.globalAlpha=.18+.5*c.z*c.z;g.translate(x,y);g.rotate(c.rot+Math.sin(now*.0004+c.ph)*.02);g.drawImage(c.img,-w/2,-h/2,w,h);g.restore()}
    g.globalAlpha=1;
    if(!RM||!frame.once){frame.once=true;requestAnimationFrame(frame)}
  }

  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
  let rT;addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(resize,150)});
  if(window.ResizeObserver)new ResizeObserver(()=>measure()).observe(document.body);
  const api={pos,warp(ms=1400){if(!RM)warpUntil=performance.now()+ms},onSector(fn){listeners.push(fn)},measure};
  if(HAS_NV)NV.Space=api;else window.EduBG=api;
  resize();requestAnimationFrame(frame);
  if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>build());
})();
