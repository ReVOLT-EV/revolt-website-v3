const zlib=require('zlib'),fs=require('fs');
const {createGame}=require(process.argv[2]); const out=process.argv[3];
const g=createGame(); g.resize(320,180); g.reset(0);
const SC=3;
function png(name){
  const cw=g.width,ch=g.height,b=g.buffer,W=cw*SC,H=ch*SC,raw=Buffer.alloc((W*3+1)*H);
  for(let y=0;y<H;y++){raw[y*(W*3+1)]=0;for(let x=0;x<W;x++){const s=((y/SC|0)*cw+(x/SC|0))*4,d=y*(W*3+1)+1+x*3;raw[d]=b[s];raw[d+1]=b[s+1];raw[d+2]=b[s+2];}}
  const T=[];for(let n=0;n<256;n++){let c=n;for(let k=0;k<8;k++)c=c&1?0xedb88320^(c>>>1):c>>>1;T[n]=c>>>0;}
  const crc=bb=>{let c=0xffffffff;for(const x of bb)c=T[(c^x)&255]^(c>>>8);return (c^0xffffffff)>>>0;};
  const chunk=(t,d)=>{const l=Buffer.alloc(4);l.writeUInt32BE(d.length);const td=Buffer.concat([Buffer.from(t),d]);const c=Buffer.alloc(4);c.writeUInt32BE(crc(td));return Buffer.concat([l,td,c]);};
  const ih=Buffer.alloc(13);ih.writeUInt32BE(W,0);ih.writeUInt32BE(H,4);ih[8]=8;ih[9]=2;
  fs.writeFileSync(out+'/g_'+name+'.png',Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ih),chunk('IDAT',zlib.deflateSync(raw)),chunk('IEND',Buffer.alloc(0))]));
}
const phases=[];g.onPhase=p=>phases.push(p);
let now=0; const step=(ms,inp)=>{Object.assign(g.input,inp||{});const n=Math.round(ms/16);for(let i=0;i<n;i++){now+=16;g.update(0.016,now);}g.draw(now);};
step(300); png('1wait');
step(100,{right:true}); step(700,{right:false}); png('2walk');
step(1000); png('3convert');
step(600); step(2500,{right:true}); png('4ride_city');
step(900,{right:true,up:true}); png('5wheelie');
step(3000,{right:true,up:false}); png('6rockies');
let guard=0; while(g.state.phase==='ride'&&guard++<1000) step(16,{right:true});
step(250); png('7finish');
step(1500); 
console.log(phases.join(','), 'd=',Math.round(g.state.d),'now',now);
