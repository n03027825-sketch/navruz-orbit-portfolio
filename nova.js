/* =========================================================
   nova.js — "NOVA" qatlami: haqiqiy 3D Quyosh tizimi (Three.js),
   kinematografik sarlavhalar, sektor o'tish effekti, kartalardagi
   yorug'lik. plus.js dan keyin yuklanadi. Hech narsa buzilmasa ham
   ishlaydi: WebGL bo'lmasa eski 2D orbita qoladi.
   ========================================================= */
(function(){
const NV=window.NV;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const LOW=(navigator.hardwareConcurrency||4)<=2||(navigator.deviceMemory&&navigator.deviceMemory<=4)||innerWidth<700;
const L=()=>document.documentElement.lang==='en'?'en':'uz';
const tx=o=>o==null?'':typeof o==='string'?o:(o[L()]??o.uz);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const UI=()=>NV.ui||{};

Object.assign(NV.DICT.uz,{'hero.hint':'Sudrang — aylantiring · Sayyorani bosing — loyiha ochiladi','nv.drag':'3D · sudrang','nv.open':'Bosing — ochish','nv.sun':'Quyosh — bosing, warp!'});
Object.assign(NV.DICT.en,{'hero.hint':'Drag to rotate · Click a planet to open the project','nv.drag':'3D · drag','nv.open':'Click to open','nv.sun':'The Sun — click to warp!'});
const t=k=>(NV.DICT[L()]||{})[k]??NV.DICT.uz[k]??k;
document.documentElement.classList.add('nv');
$$('[data-i18n="hero.hint"]').forEach(el=>el.textContent=t('hero.hint'));

/* ================= 1. 3D QUYOSH TIZIMI ================= */
function webgl(){try{const c=document.createElement('canvas');return !!(c.getContext('webgl2')||c.getContext('webgl'))}catch(e){return false}}
function loadThree(){return new Promise((res,rej)=>{if(window.THREE)return res(window.THREE);const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js';s.async=true;s.onload=()=>window.THREE?res(window.THREE):rej();s.onerror=rej;document.head.appendChild(s)})}
function canvasTex(T,w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace||tx.colorSpace;return tx}
function glowTex(T,col){return canvasTex(T,128,128,(g,w)=>{const r=g.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);r.addColorStop(0,col);r.addColorStop(.25,col+'aa');r.addColorStop(1,col+'00');g.fillStyle=r;g.fillRect(0,0,w,w)})}
function planetTex(T,c1,c2,seed){return canvasTex(T,256,128,(g,w,h)=>{
  const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,c2);gr.addColorStop(.5,c1);gr.addColorStop(1,c2);g.fillStyle=gr;g.fillRect(0,0,w,h);
  let s=seed*9301+49297;const rnd=()=>(s=(s*9301+49297)%233280)/233280;
  for(let i=0;i<26;i++){const y=rnd()*h,bh=2+rnd()*10;g.globalAlpha=.08+rnd()*.22;g.fillStyle=rnd()>.5?'#ffffff':'#000000';g.beginPath();g.moveTo(0,y);for(let x=0;x<=w;x+=16)g.lineTo(x,y+Math.sin(x*.05+i)*3*rnd());g.lineTo(w,y+bh);g.lineTo(0,y+bh);g.fill()}
  for(let i=0;i<6;i++){g.globalAlpha=.18;g.fillStyle=rnd()>.5?'#fff':c2;g.beginPath();g.ellipse(rnd()*w,rnd()*h,4+rnd()*14,2+rnd()*6,0,0,7);g.fill()}
  g.globalAlpha=1})}

async function hero3D(){
  const box=$('#orbit');if(!box||!webgl()||RM)return;
  let T;try{T=await loadThree()}catch(e){return}
  box.classList.add('gl');
  const cv=document.createElement('canvas');cv.className='nv-gl';cv.setAttribute('aria-hidden','true');box.appendChild(cv);
  const tip=document.createElement('div');tip.className='nv-tip';box.appendChild(tip);
  const badge=document.createElement('div');badge.className='nv-badge';badge.dataset.i18n='nv.drag';badge.textContent=t('nv.drag');box.appendChild(badge);

  let R;try{R=new T.WebGLRenderer({canvas:cv,antialias:!LOW,alpha:true,powerPreference:LOW?'low-power':'high-performance'})}catch(e){box.classList.remove('gl');cv.remove();return}
  R.setPixelRatio(Math.min(devicePixelRatio||1,LOW?1:1.6));
  const S=new T.Scene();const C=new T.PerspectiveCamera(38,1,.1,300);C.position.set(0,5.4,15.5);
  const W=new T.Group();S.add(W);W.rotation.x=.2;
  S.add(new T.AmbientLight(0x5a64a8,.6));
  const PL=new T.PointLight(0xffc27a,3.2,0,0);W.add(PL);

  /* quyosh — jonli olov sharsi (shader) */
  const U={t:{value:0},heat:{value:0}};
  const sun=new T.Mesh(new T.SphereGeometry(1.35,LOW?32:56,LOW?32:56),new T.ShaderMaterial({uniforms:U,
    vertexShader:'varying vec3 vP;varying vec3 vN;void main(){vP=position;vN=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader:`uniform float t;uniform float heat;varying vec3 vP;varying vec3 vN;
      float h(vec3 p){return fract(sin(dot(p,vec3(127.1,311.7,74.7)))*43758.5453);}
      float n(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
        return mix(mix(mix(h(i),h(i+vec3(1,0,0)),f.x),mix(h(i+vec3(0,1,0)),h(i+vec3(1,1,0)),f.x),f.y),
                   mix(mix(h(i+vec3(0,0,1)),h(i+vec3(1,0,1)),f.x),mix(h(i+vec3(0,1,1)),h(i+vec3(1,1,1)),f.x),f.y),f.z);}
      float fbm(vec3 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.07;a*=.5;}return v;}
      void main(){vec3 p=vP*2.3;float f=fbm(p+vec3(t*.16,t*.09,-t*.12));float g=fbm(p*1.8-vec3(0.,t*.22,0.)+f*1.4);
        vec3 c=mix(vec3(.55,.1,0.),vec3(1.,.5,.1),f);c=mix(c,vec3(1.,.93,.68),smoothstep(.5,.86,g));
        float rim=pow(1.-max(dot(vN,vec3(0.,0.,1.)),0.),2.);c+=vec3(1.,.55,.18)*rim*(.9+heat);c*=1.+heat*.35;gl_FragColor=vec4(c,1.);}`}));
  W.add(sun);
  const g1=new T.Sprite(new T.SpriteMaterial({map:glowTex(T,'#ffb45a'),blending:T.AdditiveBlending,transparent:true,depthWrite:false,opacity:.85}));g1.scale.setScalar(9);W.add(g1);
  const g2=new T.Sprite(new T.SpriteMaterial({map:glowTex(T,'#fff0c8'),blending:T.AdditiveBlending,transparent:true,depthWrite:false,opacity:.7}));g2.scale.setScalar(4.2);W.add(g2);

  /* yulduzlar */
  const SN=LOW?260:700,sp=new Float32Array(SN*3);
  for(let i=0;i<SN;i++){const r=40+Math.random()*60,u=Math.random()*2-1,a=Math.random()*Math.PI*2,q=Math.sqrt(1-u*u);sp[i*3]=r*q*Math.cos(a);sp[i*3+1]=r*u;sp[i*3+2]=r*q*Math.sin(a)}
  const sg=new T.BufferGeometry();sg.setAttribute('position',new T.BufferAttribute(sp,3));
  const stars=new T.Points(sg,new T.PointsMaterial({color:0xdfe6ff,size:.18,transparent:true,opacity:.85,depthWrite:false}));S.add(stars);

  /* sayyoralar — har biri bitta loyiha */
  const P=NV.PROJECTS,N=P.length,planets=[],meshes=[sun];
  P.forEach((p,i)=>{
    const r=2.35+i*(5.4/(N-1)),sz=.19+(((i*37)%10)/10)*.2+(p.link?.05:0);
    const m=new T.Mesh(new T.SphereGeometry(sz,LOW?18:30,LOW?14:22),new T.MeshStandardMaterial({map:planetTex(T,p.c1,p.c2,i+1),roughness:.72,metalness:.08,emissive:new T.Color(p.c1),emissiveIntensity:.14}));
    const piv=new T.Group();piv.rotation.x=(((i*53)%7)-3)*.035;piv.rotation.z=(((i*29)%5)-2)*.035;W.add(piv);
    const pts=[];for(let k=0;k<=128;k++){const a=k/128*Math.PI*2;pts.push(new T.Vector3(Math.cos(a)*r,0,Math.sin(a)*r))}
    const ring=new T.Line(new T.BufferGeometry().setFromPoints(pts),new T.LineBasicMaterial({color:new T.Color(p.c1),transparent:true,opacity:.13}));piv.add(ring);
    piv.add(m);
    if(p.cats.includes('oyin')||i%5===2){const rg=new T.Mesh(new T.RingGeometry(sz*1.45,sz*2.2,48),new T.MeshBasicMaterial({color:new T.Color(p.c1),side:T.DoubleSide,transparent:true,opacity:.42,depthWrite:false}));rg.rotation.x=Math.PI/2.3;m.add(rg)}
    const halo=new T.Sprite(new T.SpriteMaterial({map:glowTex(T,p.c1.length===7?p.c1:'#6CE4F0'),blending:T.AdditiveBlending,transparent:true,depthWrite:false,opacity:0}));halo.scale.setScalar(sz*7);m.add(halo);
    const o={p,r,a:(i*2.39996)%(Math.PI*2),sp:.5/Math.pow(r,1.5),m,ring,halo,hov:0};m.userData.o=o;planets.push(o);meshes.push(m)});

  /* o'lcham */
  function size(){const w=box.clientWidth,h=box.clientHeight;if(!w||!h)return;R.setSize(w,h,false);C.aspect=w/h;C.fov=w<420?46:38;C.updateProjectionMatrix()}
  size();if(window.ResizeObserver)new ResizeObserver(size).observe(box);else addEventListener('resize',size);

  /* boshqaruv: sudrash, hover, bosish */
  const ray=new T.Raycaster(),mv=new T.Vector2(-9,-9);let hov=null,down=null,dragged=false,rotY=0,velY=.0,tilt=0,mx=0,my=0;
  const sv=new T.Vector3();
  const pick=(cx,cy)=>{const r=cv.getBoundingClientRect();mv.set((cx-r.left)/r.width*2-1,-((cy-r.top)/r.height)*2+1);ray.setFromCamera(mv,C);const hit=ray.intersectObjects(meshes,false)[0];if(hit)return hit.object;
    // kichik sayyoralarni barmoq bilan bosish oson bo'lishi uchun: ekrandagi eng yaqinini olamiz
    let best=null,bd=(FINE?20:34);planets.forEach(o=>{o.m.getWorldPosition(sv).project(C);const d=Math.hypot((sv.x+1)/2*r.width+r.left-cx,(1-sv.y)/2*r.height+r.top-cy);if(d<bd){bd=d;best=o.m}});return best};
  function setHover(obj){if(obj===hov)return;hov=obj;cv.style.cursor=obj?'pointer':'grab';
    if(!obj){tip.classList.remove('on');return}
    const o=obj.userData.o;
    tip.innerHTML=o?`<b style="color:${o.p.c1}">${esc(tx(o.p.name))}</b><small>${esc(tx(o.p.status))}</small><em>${t('nv.open')} →</em>`:`<b style="color:#FFB547">☀</b><small>${t('nv.sun')}</small>`;
    tip.classList.add('on')}
  cv.addEventListener('pointerdown',e=>{down={x:e.clientX,y:e.clientY,r:rotY,tl:tilt};dragged=false;velY=0;if(e.pointerType==='mouse')cv.setPointerCapture(e.pointerId)});
  cv.addEventListener('pointermove',e=>{
    if(down){const dx=e.clientX-down.x,dy=e.clientY-down.y;if(Math.abs(dx)>6||(e.pointerType==='mouse'&&Math.abs(dy)>6))dragged=true;
      if(dragged){const nr=down.r+dx*.006;velY=nr-rotY;rotY=nr;if(e.pointerType==='mouse')tilt=Math.max(-.35,Math.min(.5,down.tl+dy*.003));setHover(null);cv.style.cursor='grabbing';return}}
    if(e.pointerType==='mouse')setHover(pick(e.clientX,e.clientY))});
  const up=e=>{if(!down)return;const was=dragged;down=null;cv.style.cursor=hov?'pointer':'grab';if(was)return;
    const obj=pick(e.clientX,e.clientY);if(!obj)return;
    const B=UI().burst;B&&B(e.clientX,e.clientY,obj===sun?40:26,obj===sun?['#FFB547','#fff6d8','#FF5D8F']:[obj.userData.o.p.c1,'#fff','#FFB547']);
    if(obj===sun){NV.Space&&NV.Space.warp(1400);U.heat.value=1;return}
    NV.Space&&NV.Space.warp(500);UI().openModal&&UI().openModal(obj.userData.o.p.id)};
  cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',()=>{down=null});
  cv.addEventListener('pointerleave',()=>{if(!down)setHover(null)});
  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});

  /* animatsiya sikli — ko'rinmasa to'xtaydi */
  let vis=true,last=performance.now(),time=0;
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){last=performance.now();requestAnimationFrame(loop)}},{threshold:0}).observe(box);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden&&vis){last=performance.now();requestAnimationFrame(loop)}});
  const wp=new T.Vector3();
  function loop(now){
    if(!vis||document.hidden)return;
    const dt=Math.min(.05,(now-last)/1000);last=now;time+=dt;
    const slow=hov?.12:1;
    U.t.value=time;U.heat.value*=.96;
    if(!down){rotY+=velY;velY*=.94;rotY+=dt*.05*slow}
    W.rotation.y=rotY;W.rotation.x+=((.2+tilt)-W.rotation.x)*.08;
    planets.forEach(o=>{o.a+=o.sp*dt*slow;o.m.position.set(Math.cos(o.a)*o.r,0,Math.sin(o.a)*o.r);o.m.rotation.y+=dt*.6;
      const target=hov===o.m?1:0;o.hov+=(target-o.hov)*.15;o.m.scale.setScalar(1+o.hov*.7);o.ring.material.opacity=.13+o.hov*.55;o.halo.material.opacity=o.hov*.9});
    sun.rotation.y+=dt*.08;const pulse=1+Math.sin(time*1.6)*.03+U.heat.value*.25;g1.scale.setScalar(9*pulse);g2.scale.setScalar(4.2*pulse);
    stars.rotation.y+=dt*.004;
    const sp=Math.min(1,scrollY/innerHeight);
    C.position.x+=(mx*1.6-C.position.x)*.04;C.position.y+=((5.4-my*1.2+sp*3)-C.position.y)*.05;C.position.z+=((15.5+sp*7)-C.position.z)*.05;C.lookAt(0,0,0);
    if(hov){const r=cv.getBoundingClientRect();hov.getWorldPosition(wp).project(C);tip.style.transform=`translate(${(wp.x+1)/2*r.width}px,${(1-wp.y)/2*r.height}px)`}
    R.render(S,C);requestAnimationFrame(loop)}
  requestAnimationFrame(loop);
  NV.Nova.screen=()=>{const r=cv.getBoundingClientRect();return planets.map(o=>{o.m.getWorldPosition(sv).project(C);return{id:o.p.id,x:(sv.x+1)/2*r.width+r.left,y:(1-sv.y)/2*r.height+r.top}})};
  new MutationObserver(()=>{if(hov){const h=hov;hov=null;setHover(h)}badge.textContent=t('nv.drag')}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
}

/* ================= 2. KINEMATOGRAFIK SARLAVHALAR ================= */
function splitWords(el){
  if(el.querySelector('.nv-w'))return;let k=0;
  const walk=node=>{[...node.childNodes].forEach(n=>{
    if(n.nodeType===3){const parts=n.textContent.split(/(\s+)/);if(parts.length===1&&!parts[0])return;
      const f=document.createDocumentFragment();parts.forEach(w=>{if(!w)return;if(/^\s+$/.test(w)){f.appendChild(document.createTextNode(w));return}
        const o=document.createElement('span');o.className='nv-w';const i=document.createElement('span');i.style.setProperty('--i',k++);i.textContent=w;o.appendChild(i);f.appendChild(o)});
      n.replaceWith(f)}
    else if(n.nodeType===1)walk(n)})};
  walk(el)}
function splitAll(){if(RM)return;$$('.h2').forEach(splitWords)}
splitAll();
new MutationObserver(()=>setTimeout(splitAll,60)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
// til almashtirilganda h2 lar qayta yoziladi — ko'rinib turganlarini darhol ochamiz
new MutationObserver(ms=>{ms.forEach(m=>{const h=m.target.closest&&m.target.closest('.h2');if(h&&!h.querySelector('.nv-w'))requestAnimationFrame(()=>splitWords(h))})}).observe(document.body,{childList:true,subtree:true});

/* ================= 3. SEKTOR O'TISH (skaner chizig'i) ================= */
const scan=document.createElement('div');scan.className='nv-scan';scan.setAttribute('aria-hidden','true');document.body.appendChild(scan);
if(NV.Space&&NV.Space.onSector&&!RM)NV.Space.onSector((i,prev)=>{if(prev<0)return;scan.classList.remove('go');void scan.offsetWidth;scan.classList.add('go')});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]:not([data-inlink])');if(a&&a.getAttribute('href').length>1&&NV.Space)NV.Space.warp(800)});

/* ================= 4. KARTALARDAGI YORUG'LIK (spotlight) ================= */
if(FINE&&!RM)document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.trk,.slide.act,.form,.ac-cta,.device,.quiz');if(!c)return;const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')},{passive:true});

/* ================= 5. SCROLL TEZLIGI — sahifa "egiladi" ================= */
if(!RM&&FINE){let ly=scrollY,sk=0;const mq=$('.marq');(function f(){const v=scrollY-ly;ly=scrollY;sk+=((Math.max(-8,Math.min(8,v*.25)))-sk)*.12;if(mq)mq.style.transform=`rotate(-1.4deg) skewY(${-sk*.35}deg)`;document.documentElement.style.setProperty('--nv-sk',sk.toFixed(2));requestAnimationFrame(f)})()}

NV.Nova={splitAll};
hero3D();
})();
