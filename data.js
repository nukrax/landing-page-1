<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>nukrax.cr — Deposit</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--bg:#000;--layer1:#0d0d0d;--layer2:#121212;--layer3:#1a1a1a;--layer4:#222;--border:#2a2a2a;--border2:#333;--mid:#4a4a4a;--secondary:#888;--text:#bfbfbf;--white:#fff;--warn:#e53e3e;--warn-bg:rgba(229,62,62,.08);--glass:rgba(255,255,255,.03);--glass2:rgba(255,255,255,.06);--radius:16px;--radius-sm:10px;--shadow:0 4px 24px rgba(0,0,0,.6);--shadow-lg:0 8px 48px rgba(0,0,0,.8);--cr:#3ecf8e;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--white);font-family:'Inter',sans-serif;font-size:15px;line-height:1.5;overflow-x:hidden;min-height:100vh}
#bgCanvas{position:fixed;inset:0;pointer-events:none;z-index:0}
#preloader{position:fixed;inset:0;z-index:9999;background:#000;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;transition:opacity .6s ease,visibility .6s}
#preloader.out{opacity:0;visibility:hidden}
.pre-ring{width:72px;height:72px;position:relative;display:flex;align-items:center;justify-content:center}
.pre-ring::before{content:'';position:absolute;inset:0;border:1.5px solid transparent;border-top-color:var(--cr);border-right-color:rgba(62,207,142,.2);border-radius:50%;animation:spin .9s linear infinite}
.pre-ring::after{content:'';position:absolute;inset:10px;border:1px solid transparent;border-top-color:rgba(255,255,255,.3);border-left-color:rgba(255,255,255,.1);border-radius:50%;animation:spin 1.4s linear infinite reverse}
@keyframes spin{to{transform:rotate(360deg)}}
.pre-ring-inner{width:36px;height:36px;border:1px solid var(--border2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;color:var(--white);overflow:hidden;position:relative;z-index:1}
.pre-ring-inner img{width:100%;height:100%;object-fit:cover;display:none;border-radius:50%}
.pre-ring-inner img.ok{display:block}
.pre-name{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--white);letter-spacing:-.02em}
.pre-name span{color:var(--cr)}
.pre-sub{font-size:10px;color:var(--mid);letter-spacing:.14em;text-transform:uppercase;font-family:'Space Mono',monospace}
.pre-track{width:130px;height:1px;background:var(--layer4);border-radius:1px;overflow:hidden}
.pre-fill{height:100%;background:linear-gradient(90deg,transparent,var(--cr),var(--cr));animation:load 2.2s ease forwards}
@keyframes load{0%{width:0}100%{width:100%}}
#app{position:relative;z-index:1;opacity:0;transform:translateY(12px);transition:opacity .6s ease,transform .6s ease}
#app.show{opacity:1;transform:none}
nav{position:sticky;top:0;z-index:100;background:rgba(0,0,0,.78);backdrop-filter:blur(24px) saturate(180%);-webkit-backdrop-filter:blur(24px);border-bottom:1px solid var(--border);height:60px;display:flex;align-items:center;padding:0 clamp(16px,4vw,40px);justify-content:space-between;gap:16px}
.nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none}
.nav-logo-mark{width:32px;height:32px;background:var(--layer3);border:1px solid var(--border2);border-radius:8px;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;color:var(--white);overflow:hidden;position:relative}
.nav-logo-mark img{width:100%;height:100%;object-fit:cover;display:none}
.nav-logo-mark img.ok{display:block}
.nav-brand{font-family:'Space Grotesk',sans-serif;font-size:16px;font-weight:600;color:var(--white);letter-spacing:-.02em}
.nav-brand em{color:var(--cr);font-style:normal}
.nav-pill{display:flex;align-items:center;gap:6px;background:var(--layer3);border:1px solid var(--border);border-radius:40px;padding:5px 12px 5px 8px;font-size:11px;color:var(--text);font-family:'Space Mono',monospace;letter-spacing:.05em;white-space:nowrap}
.nav-pill .dot{width:6px;height:6px;border-radius:50%;background:var(--cr);box-shadow:0 0 6px var(--cr)}
main{max-width:900px;margin:0 auto;padding:clamp(28px,5vw,60px) clamp(16px,4vw,32px)}
.hero{text-align:center;margin-bottom:clamp(36px,5vw,56px);animation:riseIn .7s ease .2s both}
@keyframes riseIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
.hero-sup{display:inline-flex;align-items:center;gap:8px;background:var(--layer3);border:1px solid var(--border2);border-radius:40px;padding:5px 14px;font-size:11px;color:var(--secondary);font-family:'Space Mono',monospace;letter-spacing:.1em;text-transform:uppercase;margin-bottom:20px}
.hero-sup .dot2{width:5px;height:5px;border-radius:50%;background:var(--mid)}
.hero h1{font-family:'Space Grotesk',sans-serif;font-size:clamp(28px,5vw,46px);font-weight:700;line-height:1.1;color:var(--white);letter-spacing:-.03em;margin-bottom:14px}
.hero h1 span{color:var(--cr)}
.hero p{font-size:15px;color:var(--secondary);max-width:420px;margin:0 auto;line-height:1.6;font-weight:400}
.sec-label{font-size:11px;font-family:'Space Mono',monospace;color:var(--mid);letter-spacing:.12em;text-transform:uppercase;margin-bottom:14px;display:flex;align-items:center;gap:10px}
.sec-label::after{content:'';flex:1;height:1px;background:var(--border)}
.crypto-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:10px;margin-bottom:36px;animation:riseIn .7s ease .35s both}
.cc{background:var(--layer2);border:1px solid var(--border);border-radius:var(--radius);padding:18px 12px 16px;cursor:pointer;text-align:center;transition:border-color .2s,background .2s,transform .2s,box-shadow .2s;user-select:none;position:relative;overflow:hidden}
.cc::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.04),transparent);opacity:0;transition:opacity .2s;border-radius:inherit}
.cc:hover{border-color:var(--border2);background:var(--layer3);transform:translateY(-2px);box-shadow:var(--shadow)}
.cc:hover::before{opacity:1}
.cc:active{transform:translateY(0) scale(.97)}
.cc.active{border-color:rgba(62,207,142,.4);background:var(--layer3);box-shadow:0 0 0 1px rgba(62,207,142,.15),var(--shadow)}
.cc.active::before{opacity:1}
.cc-icon{width:42px;height:42px;border-radius:50%;background:var(--layer4);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;margin:0 auto 10px;font-size:17px;font-weight:700;color:var(--white);font-family:'Space Mono',monospace;transition:border-color .2s}
.cc.active .cc-icon{border-color:rgba(62,207,142,.4)}
.cc-name{font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:600;color:var(--text);letter-spacing:-.01em;transition:color .2s}
.cc.active .cc-name{color:var(--white)}
.cc-ticker{font-family:'Space Mono',monospace;font-size:9px;color:var(--mid);margin-top:2px;letter-spacing:.05em}
#net-section{margin-bottom:32px;animation:riseIn .4s ease both}
.net-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px}
.nc{background:var(--layer2);border:1px solid var(--border);border-radius:var(--radius-sm);padding:13px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;transition:all .18s ease;position:relative;overflow:hidden}
.nc::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--cr);opacity:0;transition:opacity .18s;border-radius:2px 0 0 2px}
.nc:hover{border-color:var(--border2);background:var(--layer3);transform:translateX(2px)}
.nc.active{border-color:rgba(62,207,142,.3);background:var(--layer3)}
.nc.active::after{opacity:1}
.nc:active{transform:scale(.98)}
.nc-dot{width:7px;height:7px;border-radius:50%;background:var(--mid);flex-shrink:0;transition:background .18s}
.nc.active .nc-dot,.nc:hover .nc-dot{background:var(--cr)}
.nc-info{flex:1;min-width:0}
.nc-name{font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:500;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;transition:color .18s}
.nc.active .nc-name{color:var(--white)}
.nc-badge{font-family:'Space Mono',monospace;font-size:9px;color:var(--mid);letter-spacing:.06em;margin-top:1px}
.tag-best{font-family:'Space Mono',monospace;font-size:8px;padding:2px 7px;border-radius:20px;background:rgba(62,207,142,.1);border:1px solid rgba(62,207,142,.3);color:var(--cr);letter-spacing:.08em;text-transform:uppercase;flex-shrink:0}
.tag-sug{font-family:'Space Mono',monospace;font-size:8px;padding:2px 7px;border-radius:20px;background:transparent;border:1px solid var(--border2);color:var(--secondary);letter-spacing:.08em;text-transform:uppercase;flex-shrink:0}
.hidden{display:none!important}
#toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(16px);background:var(--layer3);border:1px solid var(--border2);backdrop-filter:blur(16px);border-radius:40px;padding:9px 20px;font-family:'Space Mono',monospace;font-size:11px;color:var(--white);letter-spacing:.1em;text-transform:uppercase;z-index:9000;transition:transform .25s ease,opacity .25s ease;opacity:0;white-space:nowrap;box-shadow:var(--shadow)}
#toast.show{transform:translateX(-50%) translateY(0);opacity:1}
footer{border-top:1px solid var(--border);padding:clamp(32px,5vw,56px) clamp(16px,4vw,40px)}
.footer-inner{max-width:900px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:32px 40px}
.footer-col h3{font-family:'Space Grotesk',sans-serif;font-size:12px;font-weight:600;color:var(--text);letter-spacing:.04em;margin-bottom:10px;text-transform:uppercase}
.footer-col p{font-size:13px;color:var(--mid);line-height:1.65}
.footer-col p strong{color:var(--secondary);font-weight:500}
.flinks{list-style:none;display:flex;flex-direction:column;gap:8px}
.flinks a{font-family:'Space Mono',monospace;font-size:10px;color:var(--mid);text-decoration:none;letter-spacing:.04em;transition:color .2s}
.flinks a:hover{color:var(--secondary)}
.footer-bottom{max-width:900px;margin:28px auto 0;padding-top:20px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.footer-bottom-l{font-family:'Space Grotesk',sans-serif;font-size:12px;color:var(--mid)}
.footer-bottom-r{font-family:'Space Mono',monospace;font-size:9px;color:var(--border2);letter-spacing:.1em;text-transform:uppercase}
@media(max-width:480px){.crypto-grid{grid-template-columns:repeat(3,1fr);gap:8px}.cc{padding:14px 8px 12px}.cc-icon{width:36px;height:36px;font-size:14px}.net-grid{grid-template-columns:1fr}.nav-pill{display:none}}
@media(max-width:340px){.crypto-grid{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>
<canvas id="bgCanvas"></canvas>
<div id="preloader">
  <div class="pre-ring">
    <div class="pre-ring-inner">
      <img src="assets/logo.png" id="preLogo" alt="N">
      <span id="preFb">N</span>
    </div>
  </div>
  <div class="pre-name">nukrax<span>.cr</span></div>
  <div class="pre-track"><div class="pre-fill"></div></div>
  <div class="pre-sub">Deposit Portal · Loading</div>
</div>
<div id="toast"></div>
<div id="app">
  <nav>
    <a href="index.html" class="nav-logo">
      <div class="nav-logo-mark"><img src="assets/logo.png" id="navLogo" alt="N"><span id="navFb">N</span></div>
      <span class="nav-brand">nukrax<em>.cr</em></span>
    </a>
    <div class="nav-pill"><span class="dot"></span>Deposit Only</div>
  </nav>
  <main>
    <div class="hero">
      <div class="hero-sup"><span class="dot2"></span>Secure · Non-custodial · Read-only</div>
      <h1>Deposit <span>Crypto</span><br>With Precision</h1>
      <p>Select an asset and network to instantly receive your verified deposit address.</p>
    </div>
    <div class="sec-label">Select Asset</div>
    <div class="crypto-grid" id="cryptoGrid"></div>
    <div id="net-section" class="hidden">
      <div class="sec-label" id="netLabel">Select Network</div>
      <div class="net-grid" id="netGrid"></div>
    </div>
  </main>
  <footer>
    <div class="footer-inner">
      <div class="footer-col">
        <h3>About</h3>
        <p>nukrax.cr is a <strong>deposit-only</strong> crypto portal. View addresses, copy, send — nothing else. No account required.</p>
      </div>
      <div class="footer-col">
        <h3>Creator</h3>
        <p>Built by <strong>CosmoLanex</strong> — part of the <strong>nukrax</strong> ecosystem. Minimal crypto infrastructure.</p>
      </div>
      <div class="footer-col">
        <h3>Assets</h3>
        <p>XRP · SOL · USDT · USDC · BTC · ETH · MATIC · BNB · TRX · ADA</p>
      </div>
      <div class="footer-col">
        <h3>Links</h3>
        <ul class="flinks">
          <li><a href="../index.html">← NUKRAX Hub</a></li>
          <li><a href="https://github.com/nukrax" target="_blank">GitHub</a></li>
          <li><a href="https://linktr.ee/CosmoLanex" target="_blank">Linktree</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-l">nukrax.cr — By CosmoLanex</div>
      <div class="footer-bottom-r">Deposit Only · No Withdrawals · No Trading</div>
    </div>
  </footer>
</div>
<script src="data.js"></script>
<script>
['preLogo','navLogo'].forEach(id=>{
  const img=document.getElementById(id);if(!img)return;
  img.onload=()=>{img.classList.add('ok');const fb=document.getElementById(id==='preLogo'?'preFb':'navFb');if(fb)fb.style.display='none'};
  img.onerror=()=>{img.style.display='none'};
});
setTimeout(()=>{document.getElementById('preloader').classList.add('out');setTimeout(()=>document.getElementById('app').classList.add('show'),80)},2400);
let _tt;function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(_tt);_tt=setTimeout(()=>t.classList.remove('show'),1800)}
let activeCrypto=null;
function renderCryptoGrid(){
  const g=document.getElementById('cryptoGrid');
  Object.entries(CRYPTO_DATA).forEach(([key,c])=>{
    const el=document.createElement('div');el.className='cc';el.dataset.key=key;
    el.innerHTML=`<div class="cc-icon">${c.icon}</div><div class="cc-name">${c.name}</div><div class="cc-ticker">${c.ticker}</div>`;
    el.addEventListener('click',()=>selectCrypto(key,el));
    el.addEventListener('mousemove',e=>tilt(e,el));
    el.addEventListener('mouseleave',()=>el.style.transform='');
    g.appendChild(el);
  });
}
function tilt(e,el){const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;el.style.transform=`translateY(-2px) rotateX(${-y*6}deg) rotateY(${x*6}deg)`}
function selectCrypto(key,el){
  activeCrypto=key;
  document.querySelectorAll('.cc').forEach(c=>c.classList.toggle('active',c===el));
  renderNetGrid(key);
  document.getElementById('net-section').classList.remove('hidden');
  document.getElementById('netLabel').textContent=`Select Network — ${CRYPTO_DATA[key].name}`;
  setTimeout(()=>document.getElementById('net-section').scrollIntoView({behavior:'smooth',block:'start'}),80);
}
function renderNetGrid(key){
  const g=document.getElementById('netGrid');g.innerHTML='';
  CRYPTO_DATA[key].networks.forEach((n,i)=>{
    const el=document.createElement('div');el.className='nc';el.dataset.idx=i;
    let tag='';if(n.tag==='best')tag='<span class="tag-best">★ Best</span>';else if(n.tag==='suggested')tag='<span class="tag-sug">Suggested</span>';
    el.innerHTML=`<div class="nc-dot"></div><div class="nc-info"><div class="nc-name">${n.name}</div><div class="nc-badge">${n.badge}</div></div>${tag}`;
    el.addEventListener('click',()=>goToDeposit(key,i));
    g.appendChild(el);
  });
}
function goToDeposit(k,i){document.querySelectorAll('.nc').forEach((el,j)=>el.classList.toggle('active',j===i));setTimeout(()=>{window.location.href=`redirect.html?c=${k}&n=${i}`},160)}

/* ── UNIQUE CRYPTO BG ANIMATION ── */
(function(){
  const cv=document.getElementById('bgCanvas'),ctx=cv.getContext('2d');
  let W,H;
  function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight}
  resize();window.addEventListener('resize',resize);
  const symbols=['₿','Ξ','◎','₮','✕','◈','⬡'];
  const nodes=[];
  for(let i=0;i<55;i++){
    nodes.push({x:Math.random()*1400,y:Math.random()*900,vx:(Math.random()-.5)*.18,vy:(Math.random()-.5)*.18,r:.5+Math.random()*.8,pulse:Math.random()*Math.PI*2,pspeed:.5+Math.random()*.8,active:Math.random()<.15,sym:symbols[Math.floor(Math.random()*symbols.length)]});
  }
  const streams=Array.from({length:7},()=>({x:Math.random()*1400,y:-80-Math.random()*400,speed:.4+Math.random()*.7,chars:Array.from({length:10},()=>Math.random()>.5?'1':'0'),alpha:.03+Math.random()*.04}));
  let t=0;
  function draw(){
    requestAnimationFrame(draw);t+=0.01;
    ctx.clearRect(0,0,W,H);
    nodes.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
    });
    /* connections */
    for(let i=0;i<nodes.length;i++) for(let j=i+1;j<nodes.length;j++){
      const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<150){
        const a=(nodes[i].active||nodes[j].active)?0.07*(1-d/150):0.03*(1-d/150);
        ctx.strokeStyle=nodes[i].active||nodes[j].active?`rgba(62,207,142,${a})`:`rgba(255,255,255,${a})`;
        ctx.lineWidth=.4;
        ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();
      }
    }
    /* nodes */
    nodes.forEach(p=>{
      const pulse=.5+.5*Math.sin(t*p.pspeed+p.pulse);
      if(p.active){
        ctx.fillStyle=`rgba(62,207,142,${.15+.2*pulse})`;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r+1,0,Math.PI*2);ctx.fill();
        ctx.strokeStyle=`rgba(62,207,142,${.06*pulse})`;
        ctx.lineWidth=1;ctx.beginPath();ctx.arc(p.x,p.y,8+pulse*5,0,Math.PI*2);ctx.stroke();
        /* symbol */
        ctx.font=`9px 'Space Mono',monospace`;ctx.fillStyle=`rgba(62,207,142,${.08+.06*pulse})`;ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.fillText(p.sym,p.x,p.y-14);
      } else {
        ctx.fillStyle=`rgba(255,255,255,${.06+.04*pulse})`;
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
      }
    });
    /* data streams */
    streams.forEach(s=>{
      s.y+=s.speed;if(s.y>H+100){s.y=-100;s.x=Math.random()*W;}
      if(Math.random()<.03)s.chars[Math.floor(Math.random()*s.chars.length)]=Math.random()>.5?'1':'0';
      for(let i=0;i<s.chars.length;i++){
        const a=s.alpha*(1-i/s.chars.length)*(.5+.5*Math.sin(t*2+i*.5));
        ctx.font='8px monospace';ctx.fillStyle=`rgba(62,207,142,${a})`;ctx.textAlign='center';
        ctx.fillText(s.chars[i],s.x,s.y-i*9);
      }
    });
  }
  draw();
})();

renderCryptoGrid();
const preselect=new URLSearchParams(location.search).get('preselect');
if(preselect&&CRYPTO_DATA[preselect]){
  const t=document.querySelector(`.cc[data-key="${preselect}"]`);
  if(t){t.classList.add('active');activeCrypto=preselect;renderNetGrid(preselect);document.getElementById('net-section').classList.remove('hidden');document.getElementById('netLabel').textContent=`Select Network — ${CRYPTO_DATA[preselect].name}`;setTimeout(()=>t.scrollIntoView({behavior:'smooth',block:'center'}),200)}
}
</script>
</body>
</html>
