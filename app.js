/* =========================================================
   app.js — interfeys: til, slayder, oynalar, chat, giper-sakrash
   AI ulash joyi: askAI() funksiyasi (pastda, "CHAT" bo'limida)
   ========================================================= */
(function(){
document.documentElement.classList.add('js');
const NV=window.NV;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const MOBILE=()=>innerWidth<=900;
const MAIL='n03027825@gmail.com';
const store={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ================= ICONS ================= */
const P='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const I={
 brain:P+'<path d="M9 4a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 2 5 3 3 0 0 0 6 1V5a2 2 0 0 0-3-1zM15 4a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-2 5 3 3 0 0 1-6 1"/></svg>',
 route:P+'<path d="M12 22v-8M12 14 6 6M12 14l6-8"/><circle cx="6" cy="5" r="2"/><circle cx="18" cy="5" r="2"/><path d="m16 9 2-3 2 3"/></svg>',
 pen:P+'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>',
 spark:P+'<path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/></svg>',
 sun:P+'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
 wave:P+'<path d="M2 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0"/><path d="M2 17c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity=".6"/><path d="M2 7c2-3 4-3 6 0s4 3 6 0 4-3 6 0" opacity=".6"/></svg>',
 chart:P+'<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-7"/></svg>',
 pulse:P+'<path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
 game:P+'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v4M5 13h4"/><circle cx="16" cy="12" r="1"/><circle cx="18" cy="14.5" r="1"/></svg>',
 py:P+'<path d="M12 3c-4 0-4 1.5-4 3v2h4.5v1H6c-2 0-3 1.5-3 4s1 4 3 4h2v-2.5c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5-1 2.5-2.5V6c0-1.5-1-3-5.5-3z"/><path d="M12 21c4 0 4-1.5 4-3v-2h-4.5v-1H18c2 0 3-1.5 3-4"/></svg>',
 table:P+'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M3 15h18M9 4v16"/></svg>',
 code:P+'<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 4l-4 16"/></svg>',
 git:P+'<circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="9" r="2.5"/><path d="M6 8.5v7M18 11.5c0 3-3 4-9.5 5"/></svg>',
 plug:P+'<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5"/></svg>',
 send:P+'<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>',
 gear:P+'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
 server:P+'<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01"/></svg>',
 check:P+'<path d="M20 6 9 17l-5-5"/></svg>',
 arrow:P+'<path d="M7 17 17 7M8 7h9v9"/></svg>',
 close:P+'<path d="M18 6 6 18M6 6l12 12"/></svg>',
 plus:P+'<path d="M12 5v14M5 12h14"/></svg>',
 moon:P+'<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
 bolt:P+'<path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg>',
 battery:P+'<rect x="2" y="7" width="17" height="10" rx="2"/><path d="M22 11v2M6 11v2"/></svg>',
 star:P+'<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>',
 chat:P+'<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/></svg>',
 copy:P+'<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
 mail:P+'<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>',
 next:P+'<path d="M5 12h14M13 6l6 6-6 6"/></svg>',
 globe:P+'<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/></svg>',
 rocket:P+'<path d="M12 2c3 2.5 4.5 6 4.5 10L14 16h-4l-2.5-4C7.5 8 9 4.5 12 2z"/><circle cx="12" cy="9" r="1.6"/></svg>'
};

/* ================= LANGUAGE ================= */
let L=store.get('nv-lang')||((navigator.language||'').startsWith('uz')?'uz':'uz');
if(L!=='uz'&&L!=='en')L='uz';
const t=(k,v)=>{let s=(NV.DICT[L]&&NV.DICT[L][k])??NV.DICT.uz[k]??k;if(v)for(const x in v)s=s.replace('{'+x+'}',v[x]);return s};
const tx=o=>typeof o==='string'?o:(o[L]??o.uz);
const CUR={uz:{open:'Ochish',drag:'Suring',hi:'Salom',copy:'Nusxa'},en:{open:'Open',drag:'Drag',hi:'Hello',copy:'Copy'}};

function applyStatic(){
  document.documentElement.lang=L;
  $$('[data-i18n]').forEach(el=>el.textContent=t(el.dataset.i18n));
  $$('[data-i18n-html]').forEach(el=>el.innerHTML=t(el.dataset.i18nHtml));
  $$('[data-i18n-ph]').forEach(el=>el.placeholder=t(el.dataset.i18nPh));
  $$('[data-i18n-aria]').forEach(el=>el.setAttribute('aria-label',t(el.dataset.i18nAria)));
  $('#statusBtn').dataset.cursor=CUR[L].hi;$('#copyMail').dataset.cursor=CUR[L].copy;
  $('#lang').classList.toggle('en',L==='en');
  $$('#lang button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===L));
  $$('[data-sector]').forEach(el=>{const i=+el.dataset.sector,s=NV.SECTORS[i];el.innerHTML=`${L==='uz'?'Sektor':'Sector'} ${String(i+1).padStart(2,'0')} · <b>${tx(s.name)}</b> · ${fmtAU(s.au)} AU`});
}
function renderAll(){applyStatic();renderHud();renderOrbitLabels();renderChips();renderSlides(true);renderMoods();renderSkills();renderProcess();quote(qi,true);renderSugg();restartTyped();updateReadout(true);if(!$('#modal').hidden&&curP)openModal(curP,true)}
function setLang(l){
  if(l===L)return;L=l;store.set('nv-lang',L);
  if(RM){renderAll();toast(t('toast.lang'),'globe');return}
  document.body.classList.add('lang-out');
  setTimeout(()=>{renderAll();requestAnimationFrame(()=>document.body.classList.remove('lang-out'));NV.Space&&NV.Space.measure();toast(t('toast.lang'),'globe')},230);
}
$$('#lang button').forEach(b=>b.addEventListener('click',()=>{setLang(b.dataset.lang);const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,14)}));

/* ================= TOAST ================= */
function toast(msg,icon='check'){const el=document.createElement('div');el.className='toast';el.innerHTML=I[icon]+'<span></span>';el.querySelector('span').textContent=msg;$('#toasts').appendChild(el);setTimeout(()=>{el.classList.add('out');setTimeout(()=>el.remove(),400)},2600)}

/* ================= FX (sparks) ================= */
const fxc=$('#fx'),fx=fxc.getContext('2d');let parts=[],fxOn=false,FW=0,FH=0;
function fxSize(){const d=Math.min(devicePixelRatio||1,1.5);FW=innerWidth;FH=innerHeight;fxc.width=FW*d;fxc.height=FH*d;fx.setTransform(d,0,0,d,0,0)}
fxSize();addEventListener('resize',fxSize);
function burst(x,y,n=16,cols=['#FFB547','#6CE4F0','#FF5D8F','#EEEDFB'],opt={}){
  if(RM)return;for(let i=0;i<n;i++){const a=opt.dir!=null?opt.dir+(Math.random()-.5)*(opt.spread||1):Math.random()*Math.PI*2,v=(opt.v||2)+Math.random()*(opt.vr||5);parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:1,r:1.5+Math.random()*(opt.size||2.5),c:cols[i%cols.length],gr:opt.g??.12})}
  if(!fxOn){fxOn=true;requestAnimationFrame(fxLoop)}
}
function fxLoop(){fx.clearRect(0,0,FW,FH);parts=parts.filter(p=>p.l>0);for(const p of parts){p.x+=p.vx;p.y+=p.vy;p.vy+=p.gr;p.vx*=.97;p.l-=.022;fx.globalAlpha=Math.max(p.l,0);fx.fillStyle=p.c;fx.beginPath();fx.arc(p.x,p.y,p.r,0,7);fx.fill()}fx.globalAlpha=1;if(parts.length)requestAnimationFrame(fxLoop);else{fxOn=false;fx.clearRect(0,0,FW,FH)}}
addEventListener('pointerdown',e=>{if(e.target.closest('.fab,.viewport'))return;burst(e.clientX,e.clientY,e.target.closest('button,a')?18:8)});

/* ================= CURSOR + MAGNET ================= */
const dot=$('#cdot'),ring=$('#cring'),clab=$('#clabel');let cx=innerWidth/2,cy=innerHeight/2,rx=cx,ry=cy;
if(FINE&&!RM){
  document.body.classList.add('has-cursor');
  addEventListener('pointermove',e=>{cx=e.clientX;cy=e.clientY;dot.style.transform=`translate(${cx}px,${cy}px)`},{passive:true});
  (function loop(){rx+=(cx-rx)*.2;ry+=(cy-ry)*.2;ring.style.transform=`translate(${rx}px,${ry}px)`+(ring.classList.contains('down')?' scale(.7)':'');requestAnimationFrame(loop)})();
  document.addEventListener('pointerover',e=>{const el=e.target.closest('[data-cursor],.planet,.slide,a,button,input,textarea,.step,[role=checkbox]');ring.classList.remove('big','hov');if(!el)return;const lab=el.dataset.cursor||(el.classList.contains('planet')?CUR[L].open:(el.classList.contains('slide')&&!e.target.closest('button'))?CUR[L].drag:'');if(lab){clab.textContent=lab;ring.classList.add('big')}else ring.classList.add('hov')});
  addEventListener('pointerdown',()=>ring.classList.add('down'));addEventListener('pointerup',()=>ring.classList.remove('down'));
  document.addEventListener('mouseleave',()=>{dot.style.opacity=0;ring.style.opacity=0});document.addEventListener('mouseenter',()=>{dot.style.opacity=1;ring.style.opacity=1});
}
function magnet(el){if(!FINE||RM||el._mag)return;el._mag=1;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.32}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')}
$$('.mag').forEach(magnet);

/* ================= NAV / PROGRESS / SPY ================= */
const nav=$('#nav'),prog=$('#prog');
function onScroll(){const h=document.documentElement,max=h.scrollHeight-h.clientHeight;prog.style.transform=`scaleX(${max>0?h.scrollTop/max:0})`;nav.classList.toggle('solid',h.scrollTop>30);$('#hchip').classList.toggle('show',h.scrollTop>innerHeight*.5)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
const spy=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)$$('#links a').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
['loyihalar','demo','konikmalar','jarayon','aloqa'].forEach(id=>spy.observe(document.getElementById(id)));
function goTo(id){const el=document.getElementById(id);if(!el)return;el.scrollIntoView({behavior:RM?'auto':'smooth',block:'start'})}
$('#logo').addEventListener('click',e=>{if(scrollY>innerHeight){e.preventDefault();hyperjump(e.currentTarget)}else NV.Space.warp(900)});
$('#core').addEventListener('click',()=>{NV.Space.warp(1400);toast(t('toast.warp'),'bolt')});
$('#statusBtn').addEventListener('click',()=>{openChat();toast(t('toast.hello'),'chat')});

/* ================= HUD / SECTORS ================= */
const fmtAU=a=>a>=100?'~'+Math.round(a):a>=10?a.toFixed(1):a.toFixed(2);
function fmtLight(au){const s=au*499.005,h=Math.floor(s/3600),m=Math.floor(s%3600/60),sec=Math.floor(s%60);return L==='uz'?(h?`${h} soat ${m} daq`:`${m} daq ${sec} s`):(h?`${h} h ${m} min`:`${m} min ${sec} s`)}
function renderHud(){
  $('#hudList').innerHTML=NV.SECTORS.map((s,i)=>`<li style="--c:${s.c}"><button type="button" data-sec="${i}" aria-label="${esc(tx(s.name))}"><span class="pd"></span><span class="nm">${String(i+1).padStart(2,'0')} · ${esc(tx(s.name))}</span></button></li>`).join('');
  $$('#hudList button').forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.sec;i===0&&scrollY>innerHeight?hyperjump(b):goTo(NV.SECTORS[i].id)}));
}
let lastRead='';
function updateReadout(force){
  const p=NV.Space.pos,s=NV.SECTORS[p.i];
  const key=L+p.i+p.au.toFixed(2);if(key===lastRead&&!force)return;lastRead=key;
  $('#readout').style.setProperty('--c',s.c);$('#readout').innerHTML=`<span class="sn">${esc(tx(s.name))}</span>${t('hud.from')}<strong>${fmtAU(p.au)} AU</strong>${t('hud.light')}<em>${fmtLight(p.au)}</em>`;
  $$('#hudList li').forEach((li,k)=>li.classList.toggle('on',k===p.i));
  $('#hudFill').style.height=`calc(${(p.i+p.f)/(NV.SECTORS.length-1)} * (100% - 12px))`;
  $('#hcName').textContent=tx(s.name);$('#hcAu').textContent=fmtAU(p.au)+' AU';$('#hchip').style.setProperty('--c',s.c);
  // dock state
  const map={0:'top',1:'loyihalar',2:'demo',6:'aloqa'};
  $$('#dock [data-go]').forEach(b=>b.classList.toggle('on',b.dataset.go===map[p.i]));
}
(function hudLoop(){updateReadout();requestAnimationFrame(hudLoop)})();
$('#hchip').addEventListener('click',()=>{const i=NV.Space.pos.i;const n=(i+1)%NV.SECTORS.length;n===0?hyperjump($('#hchip')):goTo(NV.SECTORS[n].id)});
let arT;
NV.Space.onSector((i,prev)=>{
  if(prev<0)return;
  const s=NV.SECTORS[i],a=$('#arrive');a.style.setProperty('--c',s.c);
  $('#arSmall').textContent=`${t('arrive')} · ${L==='uz'?'Sektor':'Sector'} ${String(i+1).padStart(2,'0')} · ${fmtAU(s.au)} AU`;
  $('#arName').textContent=tx(s.name);$('#arFact').textContent=tx(s.fact);
  a.classList.remove('on');void a.offsetWidth;a.classList.add('on');clearTimeout(arT);arT=setTimeout(()=>a.classList.remove('on'),MOBILE()?2400:3400);
  if(!jumping)NV.Space.warp(450);
});

/* ================= HERO ================= */
const nm=$('#name');const NAME='Navro’z';nm.textContent='';
[...NAME].forEach((c,i)=>{const s=document.createElement('span');s.className='ch'+(i===4?' alt':'');s.textContent=c;s.style.animationDelay=(i*.07)+'s';s.setAttribute('aria-hidden','true');
  const rub=()=>{s.classList.remove('rub');s.style.animationDelay='0s';void s.offsetWidth;s.classList.add('rub')};
  s.addEventListener('mouseenter',rub);s.addEventListener('click',rub);nm.appendChild(s)});
let tyT,wi=0,ci=0,del=false;const ty=$('#typed');
function typeStep(){const words=NV.TYPED[L],w=words[wi%words.length];ty.textContent=w.slice(0,ci);if(!del&&ci<w.length){ci++;tyT=setTimeout(typeStep,65)}else if(!del){del=true;tyT=setTimeout(typeStep,1600)}else if(ci>0){ci--;tyT=setTimeout(typeStep,32)}else{del=false;wi++;tyT=setTimeout(typeStep,250)}}
function restartTyped(){clearTimeout(tyT);ci=0;del=false;if(RM){ty.textContent=NV.TYPED[L][0];return}typeStep()}
const cio=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,n=+el.dataset.count,st=performance.now();(function f(tm){const k=Math.min(1,(tm-st)/1200);el.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(st);cio.unobserve(el)}),{threshold:.6});
$$('[data-count]').forEach(el=>cio.observe(el));

/* orbit */
const byId=id=>NV.PROJECTS.find(p=>p.id===id);
const orbit=$('#orbit');
const OP=['bm','yolchi','yozai','uai','kunim','oqim','sil'].map((id,i)=>({p:byId(id),r:[.24,.36,.48,.24,.36,.48,.36][i],a:i*(Math.PI*2/7)+(i%2?1:0),sp:[.0052,.0036,.0025,.0052,.0036,.0025,.0036][i],s:[42,48,54,38,44,50,40][i]}));
OP.forEach(o=>{const b=document.createElement('button');b.type='button';b.className='planet';b.style.setProperty('--c1',o.p.c1);b.style.setProperty('--c2',o.p.c2);b.style.setProperty('--s',o.s+'px');
  b.innerHTML=`<span class="ball">${I[o.p.icon]}</span><span class="lbl"></span>`;
  b.addEventListener('click',()=>openModal(o.p.id));b.addEventListener('mouseenter',()=>slow=.06);b.addEventListener('mouseleave',()=>slow=1);b.addEventListener('focus',()=>slow=0);b.addEventListener('blur',()=>slow=1);orbit.appendChild(b);o.el=b});
function renderOrbitLabels(){OP.forEach(o=>{o.el.querySelector('.lbl').textContent=tx(o.p.name);o.el.setAttribute('aria-label',tx(o.p.name))})}
let slow=1,sm=1;
(function spinO(){sm+=(slow-sm)*.08;const w=orbit.clientWidth,h=orbit.clientHeight;const sc=w<380?.8:1;
  OP.forEach(o=>{o.a+=o.sp*sm*(RM?0:1);const x=w/2+Math.cos(o.a)*o.r*w,y=h/2+Math.sin(o.a)*o.r*h;const d=(Math.sin(o.a)+1)/2;
    o.el.style.transform=`translate(${x}px,${y}px) translate(-50%,-${o.s*sc/2+6}px) scale(${(.78+d*.3)*sc})`;o.el.style.zIndex=Math.sin(o.a)>0?30:10;o.el.style.opacity=.72+d*.28});
  requestAnimationFrame(spinO)})();
$('#marq').innerHTML=[...NV.MARQ,...NV.MARQ].map(s=>`<span><i></i>${s}</span>`).join('');

/* ================= PROJECT SLIDER ================= */
let cat='all',list=NV.PROJECTS.slice(),idx=0,timer=null,paused=false,off=0;const track=$('#track'),vp=$('#viewport'),DUR=6500;
function renderChips(){
  $('#chips').innerHTML=NV.CATS.map(([k,l])=>{const n=k==='all'?NV.PROJECTS.length:NV.PROJECTS.filter(p=>p.cats.includes(k)).length;return `<button class="chip${k===cat?' on':''}" data-cat="${k}" role="tab" aria-selected="${k===cat}">${esc(tx(l))}<sup>${n}</sup></button>`}).join('');
  $$('#chips .chip').forEach(c=>c.addEventListener('click',()=>{cat=c.dataset.cat;list=cat==='all'?NV.PROJECTS.slice():NV.PROJECTS.filter(p=>p.cats.includes(cat));idx=0;renderChips();renderSlides()}));
}
const art=p=>`<div class="globe">${I[p.icon]}</div><div class="oring"></div>`;
const linkBtn=(p,cls)=>!p.link?`<span class="${cls} soon" aria-disabled="true">${t('proj.soon')}</span>`:p.link[0]==='#'?`<a class="${cls} go" href="${p.link}" data-inlink>${t('proj.try')} ${I.bolt}</a>`:`<a class="${cls} go" href="${esc(p.link)}" target="_blank" rel="noopener">${t('proj.open')} ${I.arrow}</a>`;
function renderSlides(keep){
  if(!keep)idx=0;track.style.transition='none';
  track.innerHTML=list.map((p,i)=>`<article class="slide dyn" data-i="${i}" style="--c1:${p.c1};--c2:${p.c2}" aria-label="${esc(tx(p.name))}">
    <div class="art"><span class="num">${String(NV.PROJECTS.indexOf(p)+1).padStart(2,'0')} / ${String(NV.PROJECTS.length).padStart(2,'0')}</span><span class="pill">${esc(tx(p.status))}</span>${art(p)}</div>
    <div class="sbody"><h3>${esc(tx(p.name))}</h3><p>${esc(tx(p.short))}</p><div class="tags">${p.tags.map(s=>`<span>${esc(s)}</span>`).join('')}</div>
    <div class="srow">${linkBtn(p,'more')}<button class="more alt" type="button" data-open="${p.id}">${t('proj.more')} ${I.plus}</button><button class="more alt" type="button" data-ask="${p.id}">${t('proj.ask')} ${I.chat}</button></div></div></article>`).join('');
  $('#dots').innerHTML=list.map((p,i)=>`<button type="button" aria-label="${esc(tx(p.name))}"></button>`).join('');
  $$('#dots button').forEach((d,i)=>d.addEventListener('click',()=>go(i)));
  $('#tot').textContent=String(list.length).padStart(2,'0');
  $$('.slide').forEach(tilt);
  go(Math.min(idx,list.length-1));requestAnimationFrame(()=>requestAnimationFrame(()=>track.style.transition=''));
}
function go(i){
  const n=list.length;if(!n)return;idx=(i+n)%n;const sl=$$('.slide');
  const w=sl[0].offsetWidth,gap=parseFloat(getComputedStyle(track).gap)||26;off=vp.clientWidth/2-(idx*(w+gap)+w/2);
  track.style.transform=`translateX(${off}px)`;
  sl.forEach((s,k)=>{s.classList.toggle('act',k===idx);s.setAttribute('aria-hidden',k!==idx);s.querySelectorAll('button,a').forEach(b=>b.tabIndex=k===idx?0:-1)});
  $$('#dots button').forEach((d,k)=>d.classList.toggle('on',k===idx));
  $('#cur').textContent=String(idx+1).padStart(2,'0');auto();
}
function auto(){clearTimeout(timer);const b=$('#abar');b.classList.remove('run');void b.offsetWidth;if(RM||paused||!inView)return;b.style.setProperty('--dur',DUR+'ms');b.classList.add('run');timer=setTimeout(()=>go(idx+1),DUR)}
let inView=false;new IntersectionObserver(es=>{inView=es[0].isIntersecting;auto()},{threshold:.3}).observe(vp);
vp.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'){paused=true;auto()}});vp.addEventListener('pointerleave',()=>{paused=false;auto()});
$('#prev').addEventListener('click',()=>go(idx-1));$('#next').addEventListener('click',()=>go(idx+1));
vp.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();go(idx+1)}if(e.key==='ArrowLeft'){e.preventDefault();go(idx-1)}});
let dx=null,dy0=0,moved=0,downT=null,axis=null;
vp.addEventListener('pointerdown',e=>{dx=e.clientX;dy0=e.clientY;moved=0;axis=null;downT=e.target});
vp.addEventListener('pointermove',e=>{if(dx===null)return;const mX=e.clientX-dx,mY=e.clientY-dy0;if(!axis&&(Math.abs(mX)>8||Math.abs(mY)>8))axis=Math.abs(mX)>Math.abs(mY)?'x':'y';if(axis==='x'){moved=mX;track.classList.add('drag');track.style.transform=`translateX(${off+moved*.9}px)`}});
let swiped=false;
function endDrag(e,cancel){
  if(dx===null)return;const d=moved,ax=axis;dx=null;track.classList.remove('drag');swiped=ax==='x';
  if(ax==='x'&&Math.abs(d)>50){go(idx+(d<0?1:-1));return}
  track.style.transform=`translateX(${off}px)`;
}
vp.addEventListener('pointerup',e=>endDrag(e,false));vp.addEventListener('pointercancel',e=>endDrag(e,true));
// click works for mouse, touch, keyboard (Enter/Space) and screen readers
track.addEventListener('click',e=>{
  const ln=e.target.closest('a');
  if(swiped){swiped=false;if(ln)e.preventDefault();return}
  const op=e.target.closest('[data-open]'),ak=e.target.closest('[data-ask]'),sl=e.target.closest('.slide');
  if(sl&&+sl.dataset.i!==idx){if(ln)e.preventDefault();go(+sl.dataset.i);return}
  if(op){openModal(op.dataset.open);return}
  if(ak){const n=tx(byId(ak.dataset.ask).name);openChat();ask(L==='uz'?n+' nima?':'What is '+n+'?')}
});
addEventListener('resize',()=>go(idx));
function tilt(el){if(!FINE||RM)return;el.addEventListener('pointermove',e=>{if(!el.classList.contains('act')||dx!==null)return;const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateY(${x*8}deg) rotateX(${-y*8}deg) scale(1.01)`});el.addEventListener('pointerleave',()=>el.style.transform='')}

/* ================= MODAL (smart window / bottom sheet) ================= */
const modal=$('#modal'),mcard=$('#mcard');let lastFocus=null,curP=null;
function openModal(id,silent){
  const p=byId(id);curP=id;if(!silent)lastFocus=document.activeElement;
  mcard.style.setProperty('--c1',p.c1);mcard.style.setProperty('--c2',p.c2);
  mcard.innerHTML=`<div class="handle" data-drag></div><div class="art" data-drag>${art(p)}<button class="mclose" type="button" data-close aria-label="${t('m.close')}">${I.close}</button><span class="pill">${esc(tx(p.status))}</span></div>
  <div class="mbody"><span class="eyebrow" style="color:${p.c1}">${esc(tx(p.area))}</span><h3 id="mtitle">${esc(tx(p.name))}</h3><p class="desc">${esc(tx(p.desc))}</p>
  <div class="facts"><div><small>${t('m.status')}</small><b>${esc(tx(p.status))}</b></div><div><small>${t('m.area')}</small><b>${esc(tx(p.area))}</b></div><div><small>${t('m.stack')}</small><b>${p.tags.map(esc).join(' · ')}</b></div></div>
  <h6>${t('m.feats')}</h6><ul class="feats">${tx(p.feats).map((f,i)=>`<li style="animation-delay:${i*.05}s">${I.check}<span>${esc(f)}</span></li>`).join('')}</ul>
  <div class="next"><b>${t('m.nextstep')}</b> ${esc(tx(p.next))}</div>
  <div class="mact">${p.link?linkBtn(p,'btn pri'):''}<button class="btn ${p.link?'ghost':'pri'}" type="button" id="mnext">${t('m.next')} ${I.next}</button><button class="btn ghost" type="button" id="mask">${t('m.ask')} ${I.chat}</button><a class="btn ghost" href="#aloqa" id="mcontact">${t('m.collab')} ${I.mail}</a></div></div>`;
  if(modal.hidden){modal.hidden=false;document.body.style.overflow='hidden'}
  mcard.scrollTop=0;mcard.style.transform='';
  $('#mnext').onclick=()=>{const i=NV.PROJECTS.findIndex(x=>x.id===curP);openModal(NV.PROJECTS[(i+1)%NV.PROJECTS.length].id,true)};
  $('#mask').onclick=()=>{closeModal();openChat();ask(L==='uz'?tx(p.name)+' nima?':'What is '+tx(p.name)+'?')};
  $('#mcontact').onclick=()=>{closeModal();$('#fmsg')&&($('#fmsg').value=t('m.collabMsg',{p:tx(p.name)}))};
  if(!silent)setTimeout(()=>mcard.querySelector('.mclose').focus({preventScroll:true}),50);
}
function closeModal(){if(modal.hidden)return;modal.hidden=true;document.body.style.overflow='';curP=null;lastFocus&&lastFocus.focus&&lastFocus.focus({preventScroll:true})}
modal.addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal()});
$$('[data-project]').forEach(b=>b.addEventListener('click',()=>openModal(b.dataset.project)));
// swipe-down to close (sheet)
function sheetDrag(el,handleSel,onClose){
  let y0=null,dy=0;
  el.addEventListener('pointerdown',e=>{if(!MOBILE()||!e.target.closest(handleSel)||e.target.closest('button'))return;y0=e.clientY;dy=0;el.style.transition='none';el.setPointerCapture(e.pointerId)});
  el.addEventListener('pointermove',e=>{if(y0===null)return;dy=Math.max(0,e.clientY-y0);el.style.transform=`translateY(${dy}px)`});
  const end=()=>{if(y0===null)return;y0=null;el.style.transition='transform .35s var(--ease)';if(dy>110){el.style.transform='translateY(100%)';setTimeout(()=>{el.style.transform='';el.style.transition='';onClose()},300)}else{el.style.transform='';setTimeout(()=>el.style.transition='',350)}};
  el.addEventListener('pointerup',end);el.addEventListener('pointercancel',end);
}
sheetDrag(mcard,'[data-drag]',closeModal);
// focus trap
modal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=[...mcard.querySelectorAll('button,a')];if(!f.length)return;if(e.shiftKey&&document.activeElement===f[0]){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&document.activeElement===f[f.length-1]){e.preventDefault();f[0].focus()}});

/* ================= KUN RITMI DEMO ================= */
let mood=1,done=[false,false,false];
function renderMoods(){
  $('#moods').innerHTML=NV.MOODS.map((m,i)=>`<button type="button" class="mood dyn${i===mood?' on':''}" style="--mc:${m.c}" data-m="${i}" aria-pressed="${i===mood}">${I[m.ic]}${esc(tx(m.k))}</button>`).join('');
  $$('.mood').forEach(b=>b.addEventListener('click',()=>setMood(+b.dataset.m,true)));
  renderSteps();
}
function renderSteps(){
  $('#steps').innerHTML=tx(NV.MOODS[mood].s).map((s,k)=>`<li class="step dyn${done[k]?' done':''}" tabindex="0" role="checkbox" aria-checked="${done[k]}" data-k="${k}"><span class="ck">${I.check}</span><span class="st">${esc(s)}</span></li>`).join('');
  $$('.step').forEach(li=>{const f=()=>toggleStep(li);li.addEventListener('click',f);li.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f()}})});upd();
}
function setMood(i,user){mood=i;done=[false,false,false];$$('.mood').forEach((b,k)=>{b.classList.toggle('on',k===i);b.setAttribute('aria-pressed',k===i)});renderSteps();if(user)toast(t('toast.mood',{m:tx(NV.MOODS[i].k)}),NV.MOODS[i].ic)}
function toggleStep(li){const k=+li.dataset.k;done[k]=!done[k];li.classList.toggle('done',done[k]);li.setAttribute('aria-checked',done[k]);upd();
  if(done.every(Boolean)){const r=li.getBoundingClientRect();burst(r.left+r.width/2,r.top,46,['#7CF0A6','#FFB547','#6CE4F0']);toast(t('toast.moodAll'),'star')}}
function upd(){const n=done.filter(Boolean).length;$('#rtxt').textContent=t('demo.prog',{n});$('#rbar').style.transform=`scaleX(${n/3})`}
const dev=$('#device');if(FINE&&!RM){dev.addEventListener('pointermove',e=>{const r=dev.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;dev.style.transform=`perspective(1000px) rotateY(${x*5}deg) rotateX(${-y*5}deg)`});dev.addEventListener('pointerleave',()=>dev.style.transform='')}

/* ================= SKILLS ================= */
let openSk=new Set();
function renderSkills(){
  $('#skills').innerHTML=NV.SKILLS.map(([ic,n,s,x],i)=>`<button type="button" class="skill dyn${openSk.has(i)?' open':''}" data-i="${i}" aria-expanded="${openSk.has(i)}"><span class="plus">${I.plus}</span><span class="ic">${I[ic]}</span><h4>${esc(tx(n))}</h4><p>${esc(tx(s))}</p><span class="x"><span>${esc(tx(x))}</span></span></button>`).join('');
  $$('.skill').forEach(b=>{b.addEventListener('click',()=>{const i=+b.dataset.i,o=!openSk.has(i);o?openSk.add(i):openSk.delete(i);b.classList.toggle('open',o);b.setAttribute('aria-expanded',o)});b.addEventListener('pointermove',e=>{const r=b.getBoundingClientRect();b.style.setProperty('--mx',(e.clientX-r.left)+'px');b.style.setProperty('--my',(e.clientY-r.top)+'px')})});
}

/* ================= PROCESS ================= */
let pi=0,puser=false;const pl=$('#pline');
function renderProcess(){
  $$('.pstep').forEach(b=>b.remove());
  NV.PROCESS.forEach(([h],i)=>{const b=document.createElement('button');b.type='button';b.className='pstep dyn';b.innerHTML=`<span class="n">T−${3-i}</span><h4>${esc(tx(h))}</h4>`;b.addEventListener('click',()=>{puser=true;pstep(i)});pl.appendChild(b)});
  pstep(pi);
}
function pstep(i){pi=i;$$('.pstep').forEach((b,k)=>{b.classList.toggle('on',k<=i);b.setAttribute('aria-pressed',k===i)});const tot=pl.clientWidth-58;$('#pfill').style.width=(tot*i/3)+'px';$('#comet').style.left=(21+tot*i/3)+'px';
  $('#pdetail').innerHTML=`<span class="big anim">0${i+1}</span><div class="anim"><h5>${esc(tx(NV.PROCESS[i][0]))}</h5><p>${esc(tx(NV.PROCESS[i][1]))}</p></div>`}
addEventListener('resize',()=>pstep(pi));
let pVis=false;new IntersectionObserver(es=>pVis=es[0].isIntersecting).observe(pl);
setInterval(()=>{if(!puser&&!RM&&pVis)pstep((pi+1)%4)},4200);

/* ================= QUOTES ================= */
let qi=0,qt=null;
function quote(i,keep){qi=(i+NV.QUOTES.length)%NV.QUOTES.length;const q=NV.QUOTES[qi];
  $('#qtext').innerHTML=tx(q[0]).split(' ').map((w,k)=>`<span class="w" style="animation-delay:${k*.06}s">${esc(w)}</span>`).join(' ');$('#qsub').textContent=tx(q[1]);
  $('#qdots').innerHTML=NV.QUOTES.map((x,k)=>`<button type="button" class="${k===qi?'on':''}" aria-label="${k+1}"></button>`).join('');
  $$('#qdots button').forEach((d,k)=>d.addEventListener('click',()=>quote(k)));
  clearTimeout(qt);if(!RM)qt=setTimeout(()=>quote(qi+1),7500)}
$('#qprev').addEventListener('click',()=>quote(qi-1));$('#qnext').addEventListener('click',()=>quote(qi+1));

/* ================= REVEAL ================= */
const rio=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');rio.unobserve(e.target)}}),{threshold:.1});
$$('.rv').forEach(el=>rio.observe(el));

/* ================= CONTACT ================= */
async function copy(s){try{await navigator.clipboard.writeText(s);return true}catch(e){const ta=document.createElement('textarea');ta.value=s;ta.style.cssText='position:fixed;opacity:0';document.body.appendChild(ta);ta.select();let ok=false;try{ok=document.execCommand('copy')}catch(_){}ta.remove();return ok}}
$('#copyMail').addEventListener('click',async()=>toast(await copy(MAIL)?t('mail.copied'):MAIL,'copy'));
/* ---- SIGNAL → TELEGRAM ----
   Forma /api/signal ga yuboradi (api/signal.js — Vercel serverless funksiya).
   Bot tokeni faqat serverda (Vercel Environment Variables) saqlanadi, bu faylda EMAS.
   Server ishlamasa (masalan, faylni to'g'ridan-to'g'ri ochganda) — zaxira: nusxa + email. */
const CFG=NV.CONFIG||{};
function sendSignal(data){
  if(location.protocol==='file:')return Promise.reject(new Error('offline'));
  const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),12000);
  return fetch(CFG.signalEndpoint||'/api/signal',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data),signal:ctl.signal})
    .then(async r=>{clearTimeout(tm);let j={};try{j=await r.json()}catch(_){}if(!r.ok||!j.ok){const e=new Error(j.error||('http '+r.status));e.code=r.status;throw e}return j});
}
function bindForm(){
  const form=$('#cform');
  form.addEventListener('submit',async e=>{
    e.preventDefault();if(form.dataset.busy)return;let ok=true;
    const rules=[['fname',v=>v.trim().length>1&&v.trim().length<=80,'f.e.name'],['femail',v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),'f.e.email'],['ftg',v=>!v.trim()||/^@?[A-Za-z0-9_]{5,32}$/.test(v.trim()),'f.e.tg'],['fmsg',v=>v.trim().length>4&&v.trim().length<=2000,'f.e.msg']];
    rules.forEach(([id,fn,m])=>{const el=$('#'+id);if(!el)return;const w=el.parentElement;w.querySelector('.em')?.remove();w.classList.remove('err');if(!fn(el.value)){ok=false;void w.offsetWidth;w.classList.add('err');const sp=document.createElement('span');sp.className='em';sp.textContent=t(m);w.appendChild(sp)}});
    if(!ok){toast(t('f.check'),'close');return}
    const name=$('#fname').value.trim(),em=$('#femail').value.trim(),tg=($('#ftg')?.value||'').trim().replace(/^@?/,v=>'@'),msg=$('#fmsg').value.trim();
    const tgv=tg==='@'?'':tg;
    const btn=form.querySelector('[type=submit]'),lbl=btn.querySelector('span');
    form.dataset.busy='1';btn.classList.add('loading');btn.disabled=true;lbl.textContent=t('f.sending');
    const box=$('#formBox'),saved=box.innerHTML;
    const done=()=>{delete form.dataset.busy;btn.classList.remove('loading');btn.disabled=false;lbl.textContent=t('f.send')};
    try{
      await sendSignal({name,email:em,telegram:tgv,message:msg,lang:L,page:location.href.split('#')[0],hp:$('#fhp')?.value||''});
      const r=box.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2,60,['#7CF0A6','#6CE4F0','#FFB547','#fff']);NV.Space.warp(700);
      box.innerHTML=`<div class="sent"><div class="okc">${I.send}</div><h4>${esc(t('f.okTitle',{name}))}</h4><p>${t('f.okText')}</p><div class="cta"><button class="btn ghost" type="button" id="again">${t('f.again')}</button></div></div>`;
      toast(t('f.toast'),'send');
    }catch(err){
      done();
      const body=`${msg}\n\n— ${name} (${em}${tgv?', '+tgv:''})`;
      const href=`mailto:${MAIL}?subject=${encodeURIComponent((L==='uz'?'Portfolio orqali: ':'Via portfolio: ')+name)}&body=${encodeURIComponent(body)}`;
      const copied=await copy(body);
      const tooMany=err.code===429;
      box.innerHTML=`<div class="sent"><div class="okc fail">${I.close}</div><h4>${t(tooMany?'f.slowTitle':'f.failTitle')}</h4><p>${t(tooMany?'f.slowText':'f.failText')}${copied?' '+t('f.copiedNote'):''}</p><div class="cta"><a class="btn pri" href="${href}" target="_top">${t('f.openMail')} ${I.mail}</a>${CFG.telegramUser?`<a class="btn ghost" href="https://t.me/${encodeURIComponent(CFG.telegramUser.replace(/^@/,''))}" target="_blank" rel="noopener">Telegram ${I.send}</a>`:''}<button class="btn ghost" type="button" id="again">${t('f.retry')}</button></div></div>`;
      toast(t(tooMany?'f.slowTitle':'f.failTitle'),'close');
      $('#again').addEventListener('click',()=>{box.innerHTML=saved;applyStatic();bindForm();$$('#formBox .mag').forEach(magnet);$('#fname').value=name;$('#femail').value=em;$('#ftg')&&($('#ftg').value=tgv);$('#fmsg').value=msg});
      return;
    }
    $('#again').addEventListener('click',()=>{box.innerHTML=saved;applyStatic();bindForm();$$('#formBox .mag').forEach(magnet)});
  });
}
bindForm();

/* ================= HYPERJUMP (Yerga qaytish) ================= */
let jumping=false;
function hyperjump(origin){
  if(jumping)return;
  if(RM){scrollTo(0,0);return}
  jumping=true;closeModal();toggleChat(false);
  const J=$('#jump'),r=(origin||document.body).getBoundingClientRect();
  const x=r.width?r.left+r.width/2:innerWidth/2,y=r.height?Math.min(r.top+r.height/2,innerHeight-40):innerHeight*.8;
  J.style.setProperty('--x',x+'px');J.style.setProperty('--y',y+'px');
  J.classList.remove('on');void J.offsetWidth;J.classList.add('on');
  burst(x,y,40,['#FFB547','#FF5D8F','#fff'],{dir:Math.PI/2,spread:2.2,v:3,vr:6,g:.05});
  const rk=J.querySelector('.jrocket');let n=0;
  const trail=setInterval(()=>{const b=rk.getBoundingClientRect();burst(b.left+b.width/2,b.bottom-6,6,['#FFB547','#FF5D8F','#fff6d8'],{dir:Math.PI/2,spread:.8,v:1,vr:3,g:.02,size:3});if(++n>30)clearInterval(trail)},30);
  setTimeout(()=>NV.Space.warp(1500),250);
  setTimeout(()=>{const h=document.documentElement,prev=h.style.scrollBehavior;h.style.scrollBehavior='auto';scrollTo(0,0);h.style.scrollBehavior=prev},1150);
  setTimeout(()=>{J.classList.remove('on');jumping=false;const e=$('#name').getBoundingClientRect();burst(e.left+e.width/2,e.top+e.height/2,50)},2400);
}
$$('[data-jump]').forEach(b=>b.addEventListener('click',()=>hyperjump(b)));

/* ================= CHAT + DRAGGABLE FAB ================= */
const chat=$('#chat'),fab=$('#fab'),msgs=$('#msgs');let greeted=false;
let fabPos=(()=>{try{return JSON.parse(store.get('nv-fab'))||null}catch(e){return null}})()||{side:'right',y:.86};
function placeFab(anim){const W=innerWidth,H=innerHeight,x=fabPos.side==='left'?20:W-62-20,y=Math.min(H-82,Math.max(84,fabPos.y*H-31));fab.classList.toggle('snap',!!anim);fab.classList.toggle('left',fabPos.side==='left');fab.style.transform=`translate(${x}px,${y}px)`;fab._x=x;fab._y=y}
placeFab(false);addEventListener('resize',()=>{placeFab(false);if(!chat.hidden)placeChat()});
let fd=null;
fab.addEventListener('pointerdown',e=>{fd={x:e.clientX,y:e.clientY,ox:fab._x,oy:fab._y,drag:false};fab.setPointerCapture(e.pointerId);fab.classList.remove('snap')});
fab.addEventListener('pointermove',e=>{if(!fd)return;const dx=e.clientX-fd.x,dy=e.clientY-fd.y;if(!fd.drag&&Math.hypot(dx,dy)>6){fd.drag=true;fab.classList.add('dragging')}if(fd.drag){fab._x=fd.ox+dx;fab._y=fd.oy+dy;fab.style.transform=`translate(${fab._x}px,${fab._y}px) scale(1.08)`;if(!chat.hidden)placeChat()}});
fab.addEventListener('pointerup',e=>{if(!fd)return;const was=fd.drag;fd=null;fab.classList.remove('dragging');
  if(was){fabPos={side:fab._x+31<innerWidth/2?'left':'right',y:(fab._y+31)/innerHeight};store.set('nv-fab',JSON.stringify(fabPos));placeFab(true);setTimeout(()=>{if(!chat.hidden)placeChat()},10);burst(fab._x+31,fab._y+31,14,['#6CE4F0','#fff'])}
  else toggleChat(chat.hidden)});
fab.addEventListener('pointercancel',()=>{fd=null;fab.classList.remove('dragging');placeFab(true)});
fab.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleChat(chat.hidden)}});
function placeChat(){
  if(MOBILE()){chat.style.left=chat.style.top='';return}
  const W=innerWidth,H=innerHeight,cw=chat.offsetWidth,ch=chat.offsetHeight;
  let left=fabPos.side==='left'?fab._x:fab._x+62-cw;left=Math.min(W-cw-12,Math.max(12,left));
  let top=fab._y>H/2?fab._y-ch-14:fab._y+62+14;top=Math.min(H-ch-12,Math.max(12,top));
  chat.style.left=left+'px';chat.style.top=top+'px';chat.style.transformOrigin=`${fabPos.side==='left'?'left':'right'} ${fab._y>H/2?'bottom':'top'}`;
}
function toggleChat(on){
  if(on===!chat.hidden)return;chat.hidden=!on;
  fab.querySelector('svg').outerHTML=on?I.close:I.spark;$('#dockAi').classList.toggle('on',on);
  fab.setAttribute('aria-label',on?t('m.close'):t('chat.open'));fab.setAttribute('aria-expanded',on);
  if(on){placeChat();if(!greeted){greeted=true;bot(t('chat.hello'))}if(!MOBILE())setTimeout(()=>$('#chatIn').focus({preventScroll:true}),200);if(MOBILE())document.body.style.overflow='hidden'}
  else if(modal.hidden)document.body.style.overflow='';
}
function openChat(){toggleChat(true)}
$('#chatX').addEventListener('click',()=>toggleChat(false));
$$('[data-open-chat]').forEach(b=>b.addEventListener('click',openChat));
sheetDrag(chat,'#chatHandle, .chat header',()=>toggleChat(false));
function add(s,who){const d=document.createElement('div');d.className='msg '+who;d.textContent=s;msgs.appendChild(d);msgs.scrollTop=msgs.scrollHeight}
function bot(s,openId){add(s,'bot');if(openId){const b=document.createElement('button');b.type='button';b.className='more';b.style.cssText='--c1:var(--ice);align-self:flex-start;animation:msgIn .4s var(--spring)';b.innerHTML=(L==='uz'?'Missiya faylini ochish ':'Open mission file ')+I.arrow;b.addEventListener('click',()=>{if(MOBILE())toggleChat(false);openModal(openId)});msgs.appendChild(b);msgs.scrollTop=msgs.scrollHeight}}
function renderSugg(){$('#sugg').innerHTML=NV.CHAT_SUGG[L].map(s=>`<button type="button">${esc(s)}</button>`).join('');$$('#sugg button').forEach(b=>b.addEventListener('click',()=>ask(b.textContent)))}

/* ---- AI ULASH JOYI ----
   Hozir: oddiy qoidalarga asoslangan javoblar.
   Haqiqiy AI uchun: askAI ichida o'z backend'ingizga so'rov yuboring, masalan:
     const r = await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({q,lang:L})});
     return (await r.json()).answer;
   API kalitini HECH QACHON shu faylga yozmang — faqat serverda saqlang. */
async function askAI(q){
  const s=q.toLowerCase().replace(/[’'‘`]/g,'');const U=L==='uz';
  for(const p of NV.PROJECTS){if(p.key.some(k=>s.includes(k.replace(/[’'‘`]/g,'')))){return {text:`${tx(p.name)} — ${tx(p.short)} ${U?'Holati':'Status'}: ${tx(p.status)}.`,open:p.id}}}
  if(/loyiha|proyekt|project|nima qil|what.*(do|build)/.test(s))return U?'Orbitada 13 ta loyiha bor: Business Memory, Yo’lchi, YozAI, Navruz Universal AI, KUNIM, Oqim, Sales Insight Lab, Kun Ritmi, 3D o’yin hamda CITY RUSH 3D, NEON RUSH, Chaqqon! va Karvon o’yinlari. Birortasining nomini yozing — batafsil aytaman.':'There are 13 projects in orbit: Business Memory, Yo’lchi, YozAI, Navruz Universal AI, KUNIM, Oqim, Sales Insight Lab, Kun Ritmi, a 3D game, plus the games CITY RUSH 3D, NEON RUSH, Chaqqon! and Karvon. Type any name for details.';
  if(/texno|stack|tech|python|skill|konikma|til/.test(s))return U?'Asosiy til — Python. Yana: Pandas, AI/LLM va NLP, JavaScript/HTML/CSS, Git & GitHub, API, Telegram botlar, avtomatlashtirish va backend.':'Main language: Python. Plus Pandas, AI/LLM & NLP, JavaScript/HTML/CSS, Git & GitHub, APIs, Telegram bots, automation and backend.';
  if(/boglan|aloqa|email|pochta|contact|touch|reach/.test(s)){setTimeout(()=>{toggleChat(false);goTo('aloqa')},1300);return (U?'Email: ':'Email: ')+MAIL+(U?'. Sizni aloqa bo’limiga olib o’tyapman.':'. Taking you to the contact section.')}
  if(/salom|assalom|\bhi\b|hello|hey/.test(s))return U?'Va alaykum assalom! Loyihalar, texnologiyalar yoki hamkorlik haqida so’rang.':'Hello! Ask me about projects, tech or working together.';
  if(/kim|haqida|about|who|navro|navruz/.test(s))return U?'Navro’z — Python, AI va ma’lumotlar bilan real muammolarga sodda, ishlaydigan yechimlar quradigan dasturchi. Shiori: “G’oyadan demogacha”.':'Navro’z builds simple, working solutions to real problems with Python, AI and data. Motto: “From idea to demo”.';
  if(/yer|earth|mars|saturn|jupiter|yupiter|neptun|sayyora|planet|kosmos|space/.test(s))return U?'Bu sayt — Quyosh tizimi bo’ylab sayohat: Yer (1 AU) dan geliopauzagacha (~120 AU). Chapdagi yoki tepadagi paneldan masofa va yorug’lik yo’lini kuzating.':'This site is a journey across the Solar System — from Earth (1 AU) to the heliopause (~120 AU). Watch the distance and light-travel time in the HUD.';
  return U?'Bu savolga haqiqiy AI ulanganda aniqroq javob beraman. Hozircha loyihalar, texnologiyalar yoki aloqa haqida so’rang.':'I’ll answer that properly once the real AI is connected. For now, ask about projects, tech or contact.';
}
async function ask(q){if(!q||!q.trim())return;if(chat.hidden)toggleChat(true);add(q,'me');const ty=document.createElement('div');ty.className='msg bot typing';ty.innerHTML='<i></i><i></i><i></i>';msgs.appendChild(ty);msgs.scrollTop=msgs.scrollHeight;const a=await askAI(q);setTimeout(()=>{ty.remove();typeof a==='string'?bot(a):bot(a.text,a.open)},650+Math.random()*450)}
$('#chatForm').addEventListener('submit',e=>{e.preventDefault();const v=$('#chatIn').value;$('#chatIn').value='';ask(v)});

/* ================= MOBILE DOCK ================= */
$$('#dock [data-go]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.go;if(id==='top'){scrollY>innerHeight?hyperjump(b):scrollTo({top:0,behavior:RM?'auto':'smooth'});return}goTo(id)}));
$('#dockAi').addEventListener('click',()=>toggleChat(chat.hidden));

/* ================= KEYBOARD ================= */
addEventListener('keydown',e=>{if(e.key==='Escape'){if(!modal.hidden)closeModal();else if(!chat.hidden)toggleChat(false)}});

/* in-page project links (e.g. live demo) */
document.addEventListener('click',e=>{const a=e.target.closest('a[data-inlink]');if(!a)return;e.preventDefault();closeModal();goTo(a.getAttribute('href').slice(1))});

/* ================= START ================= */
NV.ui={burst,toast,magnet,openModal,closeModal,goTo,t,esc,icons:I};
renderAll();
})();
