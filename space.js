/* =========================================================
   space.js — Quyosh tizimi fon sahnasi (canvas)
   Scroll qilganda kamera Yerdan geliopauzagacha "uchadi".
   Tashqi API: NV.Space.warp(ms), NV.Space.pos, NV.Space.onSector(fn)
   ========================================================= */
(function(){
  const NV = window.NV;
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cv = document.getElementById('space');
  const g = cv.getContext('2d');
  let W=0,H=0,DPR=1,small=false;
  let stars=[], speed=RM?0:.0008, base=RM?0:.0008, warpUntil=0;
  let mx=0,my=0,pmx=0,pmy=0, sy=0, lastSy=0, t0=performance.now();
  let secs=[], tex={}, asteroids=[], sat=null, comet=null, shoot=null;
  let listeners=[], curSector=-1;
  const pos={i:0,f:0,au:1};

  /* ---------- seeded random ---------- */
  function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  function mk(w,h){const c=document.createElement('canvas');c.width=Math.max(2,Math.ceil(w));c.height=Math.max(2,Math.ceil(h));return c}

  /* ---------- planet painters ---------- */
  function sphere(c,r,cx,cy,a,b){const gr=c.createRadialGradient(cx-r*.35,cy-r*.35,r*.05,cx,cy,r);gr.addColorStop(0,a);gr.addColorStop(1,b);c.fillStyle=gr;c.beginPath();c.arc(cx,cy,r,0,7);c.fill()}
  function shade(c,r,cx,cy,k=1){c.save();c.globalCompositeOperation='source-atop';const gr=c.createRadialGradient(cx-r*.45,cy-r*.45,0,cx-r*.1,cy-r*.1,r*1.45);gr.addColorStop(0,'rgba(255,255,255,.10)');gr.addColorStop(.45,'rgba(0,0,0,0)');gr.addColorStop(.78,`rgba(0,0,0,${.55*k})`);gr.addColorStop(1,`rgba(0,0,0,${.92*k})`);c.fillStyle=gr;c.fillRect(0,0,c.canvas.width,c.canvas.height);c.restore()}
  function atmo(c,r,cx,cy,col,w=1.14){const gr=c.createRadialGradient(cx,cy,r*.94,cx,cy,r*w);gr.addColorStop(0,col);gr.addColorStop(1,'rgba(0,0,0,0)');c.save();c.globalCompositeOperation='lighter';c.fillStyle=gr;c.beginPath();c.arc(cx,cy,r*w,0,7);c.fill();c.restore()}
  function clipBody(c,r,cx,cy,fn){c.save();c.beginPath();c.arc(cx,cy,r,0,7);c.clip();fn();c.restore()}

  function paintEarth(r){
    const cvs=mk(r*2.4,r*2.4),c=cvs.getContext('2d'),cx=r*1.2,cy=r*1.2,R=rng(7);
    sphere(c,r,cx,cy,'#2f6fc9','#081c4a');
    clipBody(c,r,cx,cy,()=>{
      for(let i=0;i<16;i++){const x=cx+(R()-.5)*r*1.8,y=cy+(R()-.5)*r*1.5;c.fillStyle=R()<.6?'rgba(64,128,70,.92)':'rgba(150,128,80,.9)';c.beginPath();for(let k=0;k<7;k++){c.ellipse(x+(R()-.5)*r*.35,y+(R()-.5)*r*.25,r*(.05+R()*.14),r*(.03+R()*.09),R()*3,0,7)}c.fill()}
      for(let i=0;i<70;i++){c.fillStyle=`rgba(255,255,255,${.12+R()*.3})`;c.beginPath();c.ellipse(cx+(R()-.5)*r*2,cy+(R()-.5)*r*2,r*(.04+R()*.12),r*(.006+R()*.014),(R()-.5)*.6,0,7);c.fill()}
    });
    shade(c,r,cx,cy,.85);atmo(c,r,cx,cy,'rgba(108,184,255,.55)',1.08);return cvs;
  }
  function paintMoon(r){
    const cvs=mk(r*2.2,r*2.2),c=cvs.getContext('2d'),cx=r*1.1,cy=r*1.1,R=rng(3);
    sphere(c,r,cx,cy,'#e4e4ea','#6c6c7a');
    clipBody(c,r,cx,cy,()=>{for(let i=0;i<18;i++){const x=cx+(R()-.5)*r*1.8,y=cy+(R()-.5)*r*1.8,s=r*(.05+R()*.18);c.fillStyle='rgba(90,90,105,.45)';c.beginPath();c.arc(x,y,s,0,7);c.fill();c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=Math.max(1,s*.15);c.beginPath();c.arc(x-s*.12,y-s*.12,s,Math.PI*.9,Math.PI*1.7);c.stroke()}});
    shade(c,r,cx,cy);return cvs;
  }
  function paintMars(r){
    const cvs=mk(r*2.4,r*2.4),c=cvs.getContext('2d'),cx=r*1.2,cy=r*1.2,R=rng(11);
    sphere(c,r,cx,cy,'#f07a45','#6b1d05');
    clipBody(c,r,cx,cy,()=>{
      for(let i=0;i<26;i++){c.fillStyle=`rgba(110,35,15,${.2+R()*.35})`;c.beginPath();c.ellipse(cx+(R()-.5)*r*1.9,cy+(R()-.3)*r*1.4,r*(.08+R()*.3),r*(.03+R()*.1),R()*3,0,7);c.fill()}
      c.strokeStyle='rgba(80,20,5,.45)';c.lineWidth=r*.035;c.beginPath();c.moveTo(cx-r*.7,cy+r*.05);c.quadraticCurveTo(cx,cy+r*.18,cx+r*.6,cy+r*.02);c.stroke();
      c.fillStyle='rgba(255,250,245,.95)';c.beginPath();c.ellipse(cx-r*.1,cy-r*.93,r*.38,r*.12,-.1,0,7);c.fill();
    });
    shade(c,r,cx,cy);atmo(c,r,cx,cy,'rgba(255,122,69,.35)',1.07);return cvs;
  }
  function paintJupiter(r){
    const cvs=mk(r*2.3,r*2.3),c=cvs.getContext('2d'),cx=r*1.15,cy=r*1.15,R=rng(5);
    sphere(c,r,cx,cy,'#e8d2b0','#6b4a2e');
    const pal=['#e9dcc6','#c28f61','#f2e6d2','#a4643f','#dcb98c','#b8784d','#efe0c8','#8f5a3a'];
    clipBody(c,r,cx,cy,()=>{
      let y=cy-r;let k=0;while(y<cy+r){const h=r*(.07+R()*.12);c.fillStyle=pal[k++%pal.length];c.globalAlpha=.82;c.beginPath();c.moveTo(cx-r,y);for(let x=-r;x<=r;x+=r/8)c.lineTo(cx+x,y+Math.sin(x/r*6+k)*r*.012);c.lineTo(cx+r,y+h);c.lineTo(cx-r,y+h);c.fill();y+=h}
      c.globalAlpha=1;c.fillStyle='#b4452a';c.beginPath();c.ellipse(cx+r*.28,cy+r*.32,r*.22,r*.12,-.05,0,7);c.fill();
      c.fillStyle='rgba(240,150,110,.7)';c.beginPath();c.ellipse(cx+r*.28,cy+r*.32,r*.12,r*.06,-.05,0,7);c.fill();
    });
    shade(c,r,cx,cy);atmo(c,r,cx,cy,'rgba(224,169,109,.3)',1.06);return cvs;
  }
  function paintSaturn(r){
    const cvs=mk(r*5,r*2.6),c=cvs.getContext('2d'),cx=r*2.5,cy=r*1.3,tilt=-.32;
    const ring=(half)=>{c.save();c.translate(cx,cy);c.rotate(tilt);c.scale(1,.27);
      const bands=[[1.28,1.45,'rgba(200,180,140,.35)'],[1.46,1.78,'rgba(236,214,160,.85)'],[1.78,1.84,'rgba(0,0,0,0)'],[1.84,2.06,'rgba(214,188,132,.7)'],[2.1,2.16,'rgba(200,180,140,.4)']];
      for(const[a,b,col]of bands){c.strokeStyle=col;c.lineWidth=(b-a)*r;c.beginPath();c.arc(0,0,(a+b)/2*r,half?0:Math.PI,half?Math.PI:Math.PI*2);c.stroke()}
      c.restore()};
    ring(false);
    const p=mk(r*2.2,r*2.2),pc=p.getContext('2d'),px=r*1.1;
    sphere(pc,r,px,px,'#f4e2b4','#7a6232');
    clipBody(pc,r,px,px,()=>{const pal=['#f3e5bf','#dcc28a','#f7ecd0','#cfb07a','#e8d5a3'];let y=px-r,k=0;while(y<px+r){const h=r*.13;pc.fillStyle=pal[k++%pal.length];pc.globalAlpha=.7;pc.fillRect(0,y,r*2.2,h);y+=h}pc.globalAlpha=1});
    shade(pc,r,px,px);
    c.drawImage(p,cx-px,cy-px);
    // ring shadow on planet
    c.save();c.beginPath();c.arc(cx,cy,r,0,7);c.clip();c.translate(cx,cy);c.rotate(tilt);c.fillStyle='rgba(0,0,0,.35)';c.fillRect(-r,r*.05,r*2,r*.1);c.restore();
    ring(true);return cvs;
  }
  function paintNeptune(r){
    const cvs=mk(r*2.4,r*2.4),c=cvs.getContext('2d'),cx=r*1.2,cy=r*1.2,R=rng(9);
    sphere(c,r,cx,cy,'#7aa4ff','#0f2275');
    clipBody(c,r,cx,cy,()=>{for(let i=0;i<9;i++){c.fillStyle=`rgba(${R()<.5?'150,190,255':'20,40,140'},.25)`;c.fillRect(cx-r,cy-r+i*r*.23+R()*r*.05,r*2,r*(.04+R()*.07))}c.fillStyle='rgba(10,20,80,.7)';c.beginPath();c.ellipse(cx-r*.25,cy+r*.2,r*.16,r*.08,0,0,7);c.fill();c.fillStyle='rgba(255,255,255,.7)';c.beginPath();c.ellipse(cx-r*.05,cy+r*.1,r*.08,r*.02,0,0,7);c.fill()});
    shade(c,r,cx,cy);atmo(c,r,cx,cy,'rgba(79,120,255,.55)',1.1);return cvs;
  }
  function paintGalaxy(r){
    const cvs=mk(r*2,r*2),c=cvs.getContext('2d'),cx=r,cy=r,R=rng(21);
    c.globalCompositeOperation='lighter';
    const core=c.createRadialGradient(cx,cy,0,cx,cy,r*.35);core.addColorStop(0,'rgba(255,236,200,.9)');core.addColorStop(1,'rgba(255,200,150,0)');c.fillStyle=core;c.fillRect(0,0,r*2,r*2);
    for(let i=0;i<1600;i++){const arm=i%2,t=R()*4.2,a=t*1.35+arm*Math.PI+(R()-.5)*.5,d=(t/4.2)*r*.92*(.9+R()*.2);const x=cx+Math.cos(a)*d,y=cy+Math.sin(a)*d*.55;const col=R()<.3?'180,200,255':R()<.5?'255,200,230':'255,245,230';c.fillStyle=`rgba(${col},${.25+R()*.5})`;c.fillRect(x,y,R()<.1?2:1,R()<.1?2:1)}
    return cvs;
  }

  /* ---------- setup ---------- */
  function buildTextures(){
    const m=Math.min(W,H),cap=v=>Math.min(v,420);
    const d=Math.min(DPR,1.5);
    const mkT=(fn,r)=>({img:fn(cap(r*d)),r,s:r/cap(r*d)});
    tex.earth=mkT(paintEarth,Math.max(W,H)*(small?.9:.7));
    tex.moon=mkT(paintMoon,m*.045);
    tex.mars=mkT(paintMars,m*(small?.2:.17));
    tex.jupiter=mkT(paintJupiter,m*(small?.34:.3));
    tex.saturn=mkT(paintSaturn,m*(small?.12:.13));
    tex.neptune=mkT(paintNeptune,m*(small?.14:.11));
    tex.galaxy=mkT(paintGalaxy,m*(small?.3:.26));
    const R=rng(42);asteroids=[];
    for(let i=0;i<(small?22:40);i++){const pts=[];const n=7+(R()*5|0);for(let k=0;k<n;k++){const a=k/n*Math.PI*2;pts.push([Math.cos(a)*(.7+R()*.35),Math.sin(a)*(.7+R()*.35)])}
      asteroids.push({x:R(),yo:(R()-.5)*1.4,z:.4+R()*.9,s:(small?5:7)+R()*R()*(small?20:30),rot:R()*6,vr:(R()-.5)*.01,pts,col:R()<.5?[150,135,115]:[110,100,95]})}
  }
  function resize(){
    DPR=Math.min(window.devicePixelRatio||1,1.5);W=innerWidth;H=innerHeight;small=W<700;
    cv.width=W*DPR;cv.height=H*DPR;g.setTransform(DPR,0,0,DPR,0,0);
    const N=small?160:300;stars=[];for(let i=0;i<N;i++)stars.push({x:Math.random()*2-1,y:Math.random()*2-1,z:Math.random(),t:Math.random()*6,h:Math.random()<.14?1:(Math.random()<.18?2:0)});
    buildTextures();measure();
  }
  function measure(){
    sy=scrollY;
    secs=NV.SECTORS.map(s=>{const el=document.getElementById(s.id);if(!el)return{top:0,h:H};const r=el.getBoundingClientRect();return{top:r.top+scrollY,h:r.height}});
  }

  /* ---------- helpers ---------- */
  const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
  function secY(i){const s=secs[i];if(!s)return-9999;return H/2+((s.top+s.h/2-sy)-H/2)*.55}
  function drawTex(t,x,y,alpha=1,rot=0){if(!t)return;const w=t.img.width*t.s,h=t.img.height*t.s;if(y+h/2<-50||y-h/2>H+50||x+w/2<-50||x-w/2>W+50)return;g.save();g.globalAlpha=alpha;g.translate(x,y);if(rot)g.rotate(rot);g.drawImage(t.img,-w/2,-h/2,w,h);g.restore()}
  function updatePos(){
    const probe=sy+H*.45;let i=0;for(let k=0;k<secs.length;k++)if(secs[k].top<=probe)i=k;
    const a=secs[i],b=secs[i+1];let f=0;if(b){const ca=a.top+Math.min(a.h,H)*.5,cb=b.top;f=Math.min(1,Math.max(0,(probe-ca)/(cb-ca)))}
    const A=NV.SECTORS[i].au,B=NV.SECTORS[Math.min(i+1,secs.length-1)].au;
    pos.i=i;pos.f=f;pos.au=Math.exp(Math.log(A)+(Math.log(B)-Math.log(A))*f);
    if(i!==curSector){const prev=curSector;curSector=i;listeners.forEach(fn=>fn(i,prev));}
  }

  /* ---------- frame ---------- */
  function frame(now){
    const t=now-t0;sy=scrollY;const vel=sy-lastSy;lastSy=sy;
    pmx+=(mx-pmx)*.05;pmy+=(my-pmy)*.05;
    let target=base+Math.min(Math.abs(vel)*.00007,.028);if(now<warpUntil)target=.045;if(RM)target=0;
    speed+=(target-speed)*.06;
    const streak=speed>.004;
    g.globalCompositeOperation='source-over';
    g.fillStyle=streak?'rgba(4,5,11,.38)':'#04050B';g.fillRect(0,0,W,H);
    updatePos();

    // nebula tint (blend current + next sector colour)
    const ca=hex(NV.SECTORS[pos.i].c),cb=hex(NV.SECTORS[Math.min(pos.i+1,NV.SECTORS.length-1)].c);
    const col=ca.map((v,k)=>Math.round(v+(cb[k]-v)*pos.f));
    let gr=g.createRadialGradient(W*.75,H*.25,0,W*.75,H*.25,Math.max(W,H)*.7);gr.addColorStop(0,`rgba(${col},.13)`);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);
    gr=g.createRadialGradient(W*.15,H*.85,0,W*.15,H*.85,Math.max(W,H)*.55);gr.addColorStop(0,`rgba(${cb},.07)`);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,W,H);

    // stars
    const cx=W/2-pmx*30,cy=H/2-pmy*30,f=Math.max(W,H)*.3;
    for(const s of stars){
      const pz=s.z;s.z-=speed;if(s.z<=.02){s.z=1;s.x=Math.random()*2-1;s.y=Math.random()*2-1;continue}
      const x=cx+s.x/s.z*f,y=cy+s.y/s.z*f;if(x<-40||x>W+40||y<-40||y>H+40){s.z=1;continue}
      s.t+=.03;const a=Math.min(1,(1-s.z)*1.5)*(.6+.4*Math.sin(s.t));const r=Math.max(.4,(1-s.z)*2);
      const c=s.h===1?'108,228,240':s.h===2?'255,200,120':'238,237,251';
      if(streak){const px=cx+s.x/pz*f,py=cy+s.y/pz*f;g.strokeStyle=`rgba(${c},${a})`;g.lineWidth=r;g.beginPath();g.moveTo(px,py);g.lineTo(x,y);g.stroke()}
      else{g.fillStyle=`rgba(${c},${a})`;g.beginPath();g.arc(x,y,r,0,7);g.fill()}
    }

    const px=k=>-pmx*k,py=k=>-pmy*k,bob=(k,a=6)=>Math.sin(t*.0006+k)*a;
    const dim=small?.5:.78;

    // 1. heliopause (aloqa) — bow shock + galaxy + probe
    let y6=secY(6);
    if(y6>-H&&y6<H*2){
      g.save();g.globalCompositeOperation='lighter';
      for(let k=0;k<3;k++){g.strokeStyle=`rgba(183,156,255,${.06-k*.015})`;g.lineWidth=40+k*40;g.beginPath();g.arc(W*1.25+px(10),y6+py(10),Math.max(W,H)*.85+k*30,Math.PI*.6,Math.PI*1.4);g.stroke()}
      g.restore();
      drawTex(tex.galaxy,W*(small?.75:.8)+px(8),y6-H*.3+py(8)+bob(6,4),.8*dim,t*.00003-.4);
      // Voyager-like probe
      const vx=W*(small?.2:.12)+Math.sin(t*.0002)*20+px(25),vy=y6+H*.3+bob(2,8);
      g.save();g.translate(vx,vy);g.rotate(-.5+Math.sin(t*.0004)*.08);g.globalAlpha=.9*dim;
      g.fillStyle='#e8e4d8';g.beginPath();g.arc(0,0,11,Math.PI*.1,Math.PI*.9,true);g.fill();
      g.fillStyle='#8f8a7c';g.fillRect(-3,0,6,10);g.strokeStyle='#cfcabb';g.lineWidth=1.2;g.beginPath();g.moveTo(0,8);g.lineTo(0,38);g.moveTo(3,8);g.lineTo(26,20);g.stroke();
      g.fillStyle='#ffd27a';g.beginPath();g.arc(0,38,2.2,0,7);g.fill();g.restore();
    }
    // 2. Neptune
    drawTex(tex.neptune,W*(small?.12:.1)+px(18),secY(5)+bob(5),dim);
    // 3. Saturn
    drawTex(tex.saturn,W*(small?.82:.88)+px(22),secY(4)+bob(4),dim);
    // 4. Jupiter
    drawTex(tex.jupiter,-tex.jupiter.r*.3+px(14),secY(3)+bob(3,5),dim);
    // 5. asteroid belt
    const y2=secY(2);
    if(y2>-H*1.5&&y2<H*2.5){
      for(const a of asteroids){
        a.rot+=a.vr*(RM?0:1);
        const x=((a.x*W*1.2+t*.012*a.z*(RM?0:1))%(W*1.2))-W*.1+px(30*a.z);
        const y=y2+a.yo*H*.9*(.6+a.z*.5)+py(30*a.z);
        if(y<-60||y>H+60)continue;
        const s=a.s*a.z;g.save();g.translate(x,y);g.rotate(a.rot);
        const gg=g.createLinearGradient(-s,-s,s,s);gg.addColorStop(0,`rgba(${a.col.map(v=>v+60)},${.95*dim})`);gg.addColorStop(1,`rgba(${a.col.map(v=>v*.35|0)},${.95*dim})`);
        g.fillStyle=gg;g.beginPath();a.pts.forEach(([u,v],k)=>k?g.lineTo(u*s,v*s):g.moveTo(u*s,v*s));g.closePath();g.fill();
        g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.arc(s*.2,s*.1,s*.2,0,7);g.fill();g.restore();
      }
    }
    // 6. Mars (+ Phobos)
    const y1=secY(1),mxp=W*(small?.84:.9)+px(20);
    drawTex(tex.mars,mxp,y1+bob(1),dim);
    if(tex.mars){const rr=tex.mars.r*1.5,a=t*.0004;g.fillStyle=`rgba(170,150,140,${.9*dim})`;g.beginPath();g.ellipse(mxp+Math.cos(a)*rr,y1+Math.sin(a)*rr*.3,4,3,a,0,7);g.fill()}
    // 7. Earth horizon + Moon + satellite (hero)
    if(sy<H*2.2){
      const er=tex.earth.r,ey=H+er*(small?.86:.84)+sy*.35;
      drawTex(tex.earth,W*.5+px(8),ey+py(6),Math.max(0,1-sy/(H*1.2)));
      drawTex(tex.moon,W*(small?.88:.93)+px(40),H*.15-sy*.3+bob(0,5),.95);
      // ISS-like satellite
      if(!sat&&!RM&&Math.random()<.004)sat={x:-60,y:H*(.25+Math.random()*.3),v:1.2+Math.random()};
      if(sat){sat.x+=sat.v;const X=sat.x,Y=sat.y-sy*.6;g.save();g.translate(X,Y);g.rotate(.15);g.fillStyle='#d8dce8';g.fillRect(-6,-3,12,6);g.fillStyle='#3b6fd8';g.fillRect(-26,-2,16,4);g.fillRect(10,-2,16,4);g.fillStyle='rgba(255,90,90,'+(Math.sin(t*.01)>0?1:.2)+')';g.beginPath();g.arc(0,-5,1.5,0,7);g.fill();g.restore();if(sat.x>W+60)sat=null}
    }
    // comet (any sector)
    if(!comet&&!RM&&Math.random()<.0015)comet={x:W+80,y:Math.random()*H*.5,vx:-(2.5+Math.random()*2),vy:1+Math.random(),l:1};
    if(comet){comet.x+=comet.vx;comet.y+=comet.vy;const tl=90;const gg=g.createLinearGradient(comet.x,comet.y,comet.x-comet.vx*tl/3,comet.y-comet.vy*tl/3);gg.addColorStop(0,'rgba(200,245,255,.9)');gg.addColorStop(1,'rgba(108,228,240,0)');g.strokeStyle=gg;g.lineWidth=3;g.lineCap='round';g.beginPath();g.moveTo(comet.x,comet.y);g.lineTo(comet.x-comet.vx*tl/3,comet.y-comet.vy*tl/3);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(comet.x,comet.y,2.5,0,7);g.fill();if(comet.x<-100||comet.y>H+100)comet=null}
    // shooting star
    if(!shoot&&!RM&&Math.random()<.004)shoot={x:Math.random()*W,y:Math.random()*H*.4,vx:6+Math.random()*4,vy:2+Math.random()*2,l:1};
    if(shoot){const gg=g.createLinearGradient(shoot.x,shoot.y,shoot.x-shoot.vx*14,shoot.y-shoot.vy*14);gg.addColorStop(0,`rgba(255,255,255,${shoot.l})`);gg.addColorStop(1,'rgba(255,255,255,0)');g.strokeStyle=gg;g.lineWidth=2;g.beginPath();g.moveTo(shoot.x,shoot.y);g.lineTo(shoot.x-shoot.vx*14,shoot.y-shoot.vy*14);g.stroke();shoot.x+=shoot.vx;shoot.y+=shoot.vy;shoot.l-=.012;if(shoot.l<=0)shoot=null}

    requestAnimationFrame(frame);
  }

  addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
  let rT;addEventListener('resize',()=>{clearTimeout(rT);rT=setTimeout(resize,150)});
  // re-measure when layout shifts (fonts, images, language change)
  if(window.ResizeObserver)new ResizeObserver(()=>measure()).observe(document.body);

  NV.Space={
    pos,
    warp(ms=1400){if(!RM)warpUntil=performance.now()+ms},
    onSector(fn){listeners.push(fn)},
    measure
  };
  resize();requestAnimationFrame(frame);
})();
