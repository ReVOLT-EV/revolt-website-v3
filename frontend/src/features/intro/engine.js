// 8-bit intro engine (ported from design/intro-prototype/game.js). Pure: no DOM access.
// ReVOLT 8-bit intro game. Renders into its own RGBA buffer; the page blits it with putImageData.
function createGame(){
  const C = {k:'#0B0C0E', w:'#F2F3EE', v:'#C8F031', g:'#8A8F96', b:'#4A4F56', d:'#2A2E33', s:'#5A5F66', r:'#D9473A',
    sky:'#0D1015', sky2:'#121822', far:'#18202A', farSnow:'#3C4654', rock:'#222B37', rockLite:'#2C3746', snow:'#C9D2DC',
    city:'#1B232D', city2:'#222C38', win:'#39434F', lit:'#8A9A3E', wall:'#101317', peg:'#1A1F25', ground:'#0C0E11'};
  const HEX = {};
  const rgb = c => HEX[c] || (HEX[c] = [parseInt(c.slice(1,3),16), parseInt(c.slice(3,5),16), parseInt(c.slice(5,7),16)]);
  let W = 320, H = 180, buf = new Uint8ClampedArray(W*H*4);
  let layer = null;

  function px(x,y,c){
    if (layer){ const lx=x+layer.ox, ly=y+layer.oy; if(lx>=0&&ly>=0&&lx<layer.w&&ly<layer.h) layer.data[ly*layer.w+lx]=c; return; }
    if (x<0||y<0||x>=W||y>=H) return;
    const o=(y*W+x)*4, k=rgb(c); buf[o]=k[0]; buf[o+1]=k[1]; buf[o+2]=k[2]; buf[o+3]=255;
  }
  function P(x,y,w,h,c){
    x=Math.round(x); y=Math.round(y);
    let x0=x, x1=x+w, y0=y, y1=y+h;
    if (!layer){ x0=Math.max(0,x0); y0=Math.max(0,y0); x1=Math.min(W,x1); y1=Math.min(H,y1); }
    for(let j=y0;j<y1;j++) for(let i=x0;i<x1;i++) px(i,j,c);
  }
  function line(x0,y0,x1,y1,c){
    x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);
    const dx=Math.abs(x1-x0), sx=x0<x1?1:-1, dy=-Math.abs(y1-y0), sy=y0<y1?1:-1; let e=dx+dy;
    for(;;){ px(x0,y0,c); if(x0===x1&&y0===y1)break; const e2=2*e; if(e2>=dy){e+=dy;x0+=sx;} if(e2<=dx){e+=dx;y0+=sy;} }
  }
  function ring(cx,cy,r,c){
    let x=r, y=0, err=1-r;
    while(x>=y){ [[x,y],[y,x],[-y,x],[-x,y],[-x,-y],[-y,-x],[y,-x],[x,-y]].forEach(([a,b])=>px(cx+a,cy+b,c)); y++; if(err<0) err+=2*y+1; else { x--; err+=2*(y-x)+1; } }
  }
  function map(m,x,y){ x=Math.round(x); y=Math.round(y); for(let r=0;r<m.length;r++) for(let c=0;c<m[r].length;c++){ const ch=m[r][c]; if(ch!=='.') px(x+c,y+r,C[ch]); } }
  function rng(seed){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

  const STAND_A = ['..wwww...','.wwwwww..','.wwwkkkk.','.wwwkvvk.','.wwwwww..','..wwww...','..wvvw...','.wwvvww..','.wwvvww..','w.wvvw.w.','w.wwww.w.','..wwww...','..gggg...','..gg.gg..','..gg.gg..','.gg...gg.','.gg...gg.','bbb...bbb'];
  const STAND_B = STAND_A.slice(0,13).concat(['...ggg...','...gg....','...gg....','...gg....','..bbbb...']);
  const SEAT = ['.......wwww....','......wwwwww...','......wwwkkkk..','......wwwkvvk..','......wwwwww...','....vvwwww.....','...wvvwwwww....','..wwvvwwwwwww..','.wwvvww....ww..','wwwww..........','ggggggg........','.gggggggg......','.......gg......','......gg.......','......bbb......'];
  const BANG = ['.wwwwww.','wwwkkwww','wwwkkwww','wwwkkwww','wwwkkwww','wwwwwwww','wwwkkwww','.wwwwww.','...www..','...ww...','...w....'];
  const BAYER = [0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];

  // Seeded scenery
  const MW = 480, far = [];
  { const r=rng(7); let h=34; for(let x=0;x<MW;x++){ if(x%5===0) h+=Math.round((r()-0.5)*8); h=Math.max(16,Math.min(48,h)); far.push(h);} for(let i=0;i<30;i++) far[MW-30+i]=Math.round(far[MW-30+i]+(far[i]-far[MW-30+i])*(i/30)); }
  const stars=[]; { const r=rng(3); for(let i=0;i<90;i++) stars.push([r(),r()*0.55,r()<0.25]); }
  const blocks=[]; { const r=rng(21); let x=150; while(x<660){ const w=9+Math.floor(r()*12), h=14+Math.floor(r()*30); const wins=[]; for(let yy=3;yy<h-2;yy+=4) for(let xx=2;xx<w-2;xx+=3) if(r()<0.2) wins.push([xx,yy,r()<0.3]); blocks.push({x,w,h,wins}); x+=w+1+Math.floor(r()*5); } }
  const peaks=[[330,64,44],[400,92,62],[470,70,50],[540,104,74],[630,84,58],[710,110,80],[800,90,62],[880,120,84]];

  // Game state
  const BX0 = 46, D = 1250;
  const S = {};
  const input = { right:false, left:false, up:false, tap:false };
  let onPhase = ()=>{}, onWheelie = ()=>{};
  function reset(now){
    Object.assign(S, { phase:'wait', t:now||0, riderX:10, bxw:BX0, v:0, a:0, spin:0.5, d:0, scroll:0, frozen:0, pf:0, p0:0, wheelieMs:0, GW:Math.max(340, W+24) });
    input.tap=false;
  }
  function setPhase(p, now){ S.phase=p; S.t=now; onPhase(p); }
  reset(0);

  function update(dt, now){
    dt = Math.min(dt, 0.05);
    const ph = S.phase;
    if (ph==='wait'){ if (input.right || input.tap){ input.tap=false; setPhase('walk', now); } }
    else if (ph==='walk'){ S.riderX += 46*dt; if (S.riderX >= S.bxw - 14) setPhase('convert', now); }
    else if (ph==='convert'){ if (now - S.t >= 1350) setPhase('ride', now); }
    else if (ph==='ride'){
      if (input.right) S.v += 150*dt; else S.v -= 55*dt;
      if (input.left) S.v -= 240*dt;
      S.v = Math.max(0, Math.min(165, S.v));
      S.bxw += S.v*dt; S.d = S.bxw - BX0; S.scroll = Math.max(0, S.bxw - W*0.34);
      if (S.d >= D){ S.frozen = S.scroll; S.p0 = 1; setPhase('finish', now); }
    } else if (ph==='finish'){
      S.v = Math.min(280, S.v + 320*dt); S.bxw += S.v*dt; S.scroll = S.frozen;
      S.pf = Math.min(1, (now - S.t)/650);
      if (S.pf >= 1 && S.bxw - S.scroll > W + 80) setPhase('done', now);
    }
    // wheelie
    const want = (ph==='ride' && input.up && S.v > 22) ? 0.5 : 0;
    if (want > S.a) S.a = Math.min(want, S.a + 2.6*dt); else S.a = Math.max(0, S.a - 3.4*dt);
    if (S.a > 0.3){ S.wheelieMs += dt*1000; if (S.wheelieMs > 600 && !S.wheelieAwarded){ S.wheelieAwarded = true; onWheelie(); } } else { S.wheelieMs = 0; S.wheelieAwarded = false; }
    S.spin += S.v*dt/7;
  }

  // ---- drawing ----
  const bikeLayer = { w:84, h:64, ox:26, oy:48, data:new Array(84*64).fill(null) };
  function drawBikeLayer(now){
    bikeLayer.data.fill(null); layer = bikeLayer;
    const ph = S.phase, tc = (ph==='convert') ? now - S.t : (ph==='wait'||ph==='walk' ? -1 : 99999);
    const converted = tc >= 0, lightOn = tc >= 1150, gasRunning = !converted;
    const bx = -8, by = 8;
    const jit = gasRunning ? (Math.floor(now/60)%2 ? -1 : 0) : 0;
    const yb = by + jit;
    const th = S.spin;
    [[bx+8,by-8],[bx+36,by-8]].forEach(([cx,cy])=>{
      for(let k=0;k<2;k++){ const a=th+k*Math.PI/2; line(cx-Math.cos(a)*5,cy-Math.sin(a)*5,cx+Math.cos(a)*5,cy+Math.sin(a)*5,C.s); }
      ring(cx,cy,7,C.w); ring(cx,cy,6,C.b); px(cx,cy,C.v);
    });
    line(bx+8,yb-8,bx+18,yb-12,C.w);
    line(bx+18,yb-12,bx+21,yb-18,C.w); line(bx+21,yb-18,bx+31,yb-19,C.w);
    line(bx+18,yb-12,bx+28,yb-12,C.w); line(bx+28,yb-12,bx+31,yb-19,C.w);
    line(bx+31,yb-20,bx+36,by-8,C.w); line(bx+31,yb-20,bx+28,yb-23,C.w); P(bx+26,yb-23,3,1,C.w);
    if (gasRunning || (tc < 700 && Math.floor(tc/90)%2===0)){
      line(bx+20,yb-11,bx+5,yb-11,C.s);
      P(bx+19,yb-17,9,6,C.b); P(bx+20,yb-16,7,1,C.s); P(bx+20,yb-14,7,1,C.s);
    }
    if (tc >= 450){
      const u=Math.min(1,(tc-450)/600), n=7.5625; let k;
      if(u<1/2.75)k=n*u*u; else if(u<2/2.75){const q=u-1.5/2.75;k=n*q*q+.75;} else if(u<2.5/2.75){const q=u-2.25/2.75;k=n*q*q+.9375;} else {const q=u-2.625/2.75;k=n*q*q+.984375;}
      const yo=Math.round(-40*(1-k));
      if (tc>1100 && Math.floor(now/300)%2) P(bx+18,yb-18+yo,11,8,'#3A4A14');
      P(bx+19,yb-17+yo,9,6,C.v); P(bx+23,yb-16+yo,2,1,C.k); P(bx+22,yb-15+yo,2,1,C.k); P(bx+22,yb-14+yo,3,1,C.k); P(bx+23,yb-13+yo,2,1,C.k);
    }
    P(bx+21,yb-22,9,3,C.d); P(bx+22,yb-23,7,1,C.w); P(bx+29,yb-22,1,2,C.w);
    P(bx+10,yb-20,10,2,C.b); P(bx+10,yb-21,10,1,C.w);
    P(bx+6,yb-22,4,2,C.d); P(bx+5,yb-23,3,1,C.w);
    P(bx+33,yb-20,2,2, lightOn ? C.v : C.s);
    P(bx+4,yb-20,2,2, converted ? C.v : C.r); // tail light turns green
    if (gasRunning){ for(let i=0;i<3;i++){ const t=((now/1000)+i*0.45)%1.35/1.35; const sz=1+Math.floor(t*3); if(t<0.9) P(bx+4-t*16,yb-12-t*11,sz,sz,t<0.5?C.s:C.d); } }
    if (converted) map(SEAT, bx+14, yb-29);
    layer = null;
    return { lightOn };
  }
  function blit(L, sx, sy, a){
    sx=Math.round(sx); sy=Math.round(sy);
    if (a < 0.01){ for(let j=0;j<L.h;j++) for(let i=0;i<L.w;i++){ const c=L.data[j*L.w+i]; if(c) px(sx+i-L.ox, sy+j-L.oy, c); } return; }
    const ca=Math.cos(a), sa=Math.sin(a), R=Math.ceil(Math.hypot(L.w, L.h));
    for(let dy=-R; dy<=R; dy++) for(let dx=-R; dx<=R; dx++){
      const lx=Math.round(dx*ca - dy*sa), ly=Math.round(dx*sa + dy*ca);
      const i=lx+L.ox, j=ly+L.oy; if(i<0||j<0||i>=L.w||j>=L.h) continue;
      const c=L.data[j*L.w+i]; if(c) px(sx+dx, sy+dy, c);
    }
  }

  function draw(now){
    const gy = H - 20, sc = S.scroll;
    // sky
    P(0,0,W,H,C.sky); P(0,Math.floor(gy*0.5),W,gy-Math.floor(gy*0.5),C.sky2);
    stars.forEach(([sx,sy,tw])=>{ if(tw && Math.floor(now/450+sx*13)%3===0) return; px(Math.floor(sx*W),Math.floor(sy*gy),'#4A5260'); });
    P(W-40,12,6,8,'#3A424E'); P(W-42,14,10,4,'#3A424E'); P(W-38,12,4,2,C.sky);
    // far ridge
    const fo = Math.floor(sc*0.08);
    for(let x=0;x<W;x++){ const h=far[(x+fo)%MW]; P(x,gy-h,1,h,C.far); if(h>40) P(x,gy-h,1,2,C.farSnow); }
    // Rockies (arrive in the second half)
    const ro = sc*0.25;
    peaks.forEach(([L,hw,h])=>{ const cx=L-ro; if(cx+hw<0||cx-hw>W) return;
      for(let x=-hw;x<=hw;x++){ const t=Math.abs(x)/hw; const top=Math.round(gy - h*(1-t) - ((x*13)%5===0?1:0)); const X=Math.round(cx+x); P(X,top,1,gy-top, x<0?C.rock:C.rockLite); const cap=Math.round(h*0.28*(1-t*1.6)); if(cap>0) P(X,top,1,cap,C.snow); } });
    // Calgary skyline + landmarks
    const co = sc*0.45;
    blocks.forEach(b=>{ const x=Math.round(b.x-co); if(x>W||x+b.w<0) return; P(x,gy-b.h,b.w,b.h,C.city); b.wins.forEach(([wx,wy,lit])=>px(x+wx,gy-b.h+wy,lit?C.lit:C.win)); });
    { const x=Math.round(250-co); if(x>-20&&x<W+20){ for(let y=0;y<74;y++){ const t=y/74, w=10+Math.round(4*Math.sin(Math.PI*t)); P(x,gy-74+y,w,1,C.city2); if((y%4)===0) for(let i=(y/4)%2?1:3;i<w;i+=4) px(x+i,gy-74+y,C.win);} } } // Bow building
    { const x=Math.round(330-co); if(x>-20&&x<W+20){ P(x,gy-60,3,60,C.city2); P(x-1,gy-60,5,4,C.city2); P(x-4,gy-64,11,4,C.city2); P(x-3,gy-66,9,2,'#2E3A48'); P(x-3,gy-62,9,1,C.lit); px(x+1,gy-68,C.r); px(x+1,gy-67,'#F2A23A'); } } // Calgary Tower
    { const x=Math.round(450-co), w=38; if(x>-w&&x<W+10){ for(let i=0;i<w;i++){ const t=(2*i/(w-1))-1, top=Math.round(gy-12-7*t*t); P(x+i,top,1,gy-top,'#2A3542'); px(x+i,top,'#8A9AAE'); px(x+i,top+1,'#55657A'); } for(let i=3;i<w-3;i+=4) px(x+i,gy-6,C.lit); } } // Saddledome
    // Peace Bridge (foreground-ish)
    { const x=Math.round(690-sc*0.85), w=64; if(x>-w&&x<W+10){ for(let i=0;i<w;i++){ const top=Math.round(gy-4-7*Math.sin(Math.PI*i/(w-1))); for(let y=top;y<top+5;y++){ if(((i+y)%4===0)||((i-y+400)%4===0)||y===top) px(x+i,y,C.r);} P(x+i,top+5,1,gy-top-5,'#141920'); } } }
    // ground
    P(0,gy,W,H-gy,C.ground); P(0,gy,W,1,C.d);
    const lo = Math.floor(sc)%16; for(let x=-lo;x<W;x+=16) P(x,gy+11,8,2,C.d);
    // garage
    const gx = -Math.floor(sc);
    if (gx + S.GW + 4 > 0){
      P(gx-60,0,S.GW+60,gy,C.wall);
      for(let y=4;y<gy-2;y+=6) for(let x=-56;x<S.GW-2;x+=6) px(gx+x,y,C.peg);
      P(gx+S.GW,0,3,gy,'#232830'); P(gx+S.GW-2,0,2,gy,C.d);
      const lx = BX0 + 14;
      P(gx+lx,0,1,gy-74,C.d); P(gx+lx-5,gy-74,11,3,'#232830'); P(gx+lx-7,gy-71,15,2,'#232830');
      if (Math.floor(now/90)%40!==0) for(let y=gy-69;y<gy;y++){ const t=(y-(gy-69))/69, half=Math.floor(6+t*30); for(let x=-half;x<=half;x++) if(((x+y)&1)===0 && ((x*7+y*3)%5!==0)) px(gx+lx+x,y,'#1A1F25'); }
      P(gx+96,gy-18,44,3,C.d); P(gx+98,gy-15,2,15,C.d); P(gx+136,gy-15,2,15,C.d); P(gx+102,gy-26,14,8,'#232830'); P(gx+106,gy-28,6,2,C.d); P(gx+122,gy-23,3,5,C.d); P(gx+128,gy-25,2,7,C.d);
      [[0,10],[6,14],[12,8],[18,12],[24,9]].forEach(([dx,h])=>P(gx+160+dx,gy-70,2,h,C.d));
      for(let i=0;i<9;i++){ P(gx+206+i*6,16,3,4,'#3A3F1E'); P(gx+209+i*6,16,3,4,C.d); }
      for(let k=0;k<3;k++){ ring(gx+290,gy-6-k*9,5,'#20252C'); }
    }
    // the pie of light from the tail
    const ph = S.phase;
    let pe = 0, dens = 0;
    if (ph==='ride'){ pe = Math.min(1, S.d/D); }
    if (ph==='finish' || ph==='done'){ pe = 1; }
    if (pe > 0.002){
      const bsx = S.bxw - sc;
      const cx = bsx - 6, cy = gy - 11;
      let half = Math.PI * Math.min(1, Math.pow(pe, 1.15));
      dens = 0.18 + 0.82*Math.pow(pe, 2.2);
      if (ph==='finish'){ dens = dens + (1-dens)*S.pf; half = Math.PI; }
      if (ph==='done'){ dens = 1; half = Math.PI; }
      for(let y=0;y<H;y++) for(let x=0;x<W;x++){
        if (BAYER[(y&3)*4+(x&3)]/16 >= dens) continue;
        if (half < Math.PI){ let ang=Math.atan2(y-cy, x-cx); let diff=Math.abs(ang) ; diff = Math.PI - diff; if (diff > half) continue; }
        px(x,y,C.v);
      }
    }
    // bike
    const info = drawBikeLayer(now);
    const bob = (ph==='ride' && S.v>10 && S.a<0.05) ? (Math.floor(now/200)%2 ? -1 : 0) : 0;
    if (info.lightOn && ph==='ride'){ const hx=S.bxw-sc+27, hy=gy-20+bob; const ang=S.a; for(let i=1;i<46;i++){ const sp=Math.floor(i*0.3); for(let j=-sp;j<=sp;j++){ if(((i+j)&1)===0 && (i<16 || (i+j)%3===0)){ const X=Math.round(hx+i*Math.cos(ang)+j*Math.sin(ang)), Y=Math.round(hy-i*Math.sin(ang)+j*Math.cos(ang)); px(X,Y,i<14?C.v:'#5E7024'); } } } }
    blit(bikeLayer, S.bxw - sc, gy - 8 + bob, S.a);
    // rider on foot
    if (ph==='wait' || ph==='walk'){
      const walking = ph==='walk';
      const rx = S.riderX - sc;
      const frame = walking && Math.floor(now/110)%2 ? STAND_B : STAND_A;
      const hop = walking && S.riderX > S.bxw - 20 ? -3 : 0;
      map(frame, rx, gy-18+hop);
      if (ph==='wait'){ const yo = Math.floor(now/260)%2 ? 0 : -1; if (Math.floor(now/1600)%8 !== 7) map(BANG, rx+1, gy-32+yo); }
    }
  }

  return {
    get width(){ return W; }, get height(){ return H; }, get buffer(){ return buf; },
    get state(){ return S; }, D,
    input, resize(w,h){ W=w; H=h; buf=new Uint8ClampedArray(w*h*4); S.GW=Math.max(S.GW||0, 340, w+24); },
    reset, update, draw,
    set onPhase(f){ onPhase=f; }, set onWheelie(f){ onWheelie=f; }
  };
}
export { createGame };
