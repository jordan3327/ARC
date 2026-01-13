
const canvas = document.getElementById('candles');
const ctx = canvas.getContext('2d');

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;

window.addEventListener('resize', () => { 
  W = canvas.width = window.innerWidth; 
  H = canvas.height = window.innerHeight; 
});

const headerHeight = document.querySelector('header').offsetHeight;

const candles = [];
const numCandles = Math.floor(W / 12);

for(let i=0;i<numCandles;i++){
  const color = Math.random() > 0.5 ? '#00ff88' : '#ff4c4c';
  candles.push({
    x: i * 23,
    y: color === '#ff4c4c' ? -0 + Math.random() * headerHeight : Math.random() * H,
    width: 14,
    bodyHeight: Math.random() * 110 + 10,
    wickTop: Math.random() * 30,
    wickBottom: Math.random() * 30,
    speed: Math.random() * .8 + 0.5,
    color: color,
    highlight: false,
    highlightTimer: 0
  });
}

canvas.addEventListener('mousemove', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  candles.forEach(c => {
    if(mx >= c.x && mx <= c.x + c.width && my >= c.y && my <= c.y + c.bodyHeight) {
      c.highlight = true;
      c.highlightTimer = 12;
    }
  });
});

canvas.addEventListener('click', e => {
  const rect = canvas.getBoundingClientRect();
  const mx = e.clientX - rect.left;
  const my = e.clientY - rect.top;
  candles.forEach(c => {
    if(mx >= c.x && mx <= c.x + c.width && my >= c.y && my <= c.y + c.bodyHeight) {
      c.highlight = true;
      c.highlightTimer = 24;
      c.color = '#ffe202'; // Destello dorado al click
    }
  });
});

function animate(){
  ctx.clearRect(0,0,W,H);
  const fadeEnd = 1500;

  candles.forEach(c => {
    let opacity = 1;
    if(c.color === '#00ff88' && c.y < fadeEnd){
      opacity = c.y / fadeEnd;
    }
    if(c.color === '#ff4c4c' && c.y < fadeEnd){
      opacity = (H - c.y) / fadeEnd;
    }
    ctx.globalAlpha = opacity;

    // Destello visual si está resaltado
    if(c.highlight && c.highlightTimer > 0) {
      ctx.save();
      ctx.shadowColor = c.color === '#ffe202' ? '#ffe202' : '#fff';
      ctx.shadowBlur = 18;
    }

    ctx.strokeStyle = c.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(c.x + c.width/2, c.y - c.wickTop);
    ctx.lineTo(c.x + c.width/2, c.y + c.bodyHeight + c.wickBottom);
    ctx.stroke();

    ctx.fillStyle = c.color === '#00ff88' ? 'rgba(0,255,136,0.6)' : (c.color === '#ffe202' ? 'rgba(255,226,2,0.7)' : 'rgba(255,76,76,0.6)');
    ctx.fillRect(c.x, c.y, c.width, c.bodyHeight);

    if(c.highlight && c.highlightTimer > 0) {
      ctx.restore();
      c.highlightTimer--;
      if(c.highlightTimer === 0) {
        c.highlight = false;
        if(c.color === '#ffe202') {
          c.color = Math.random() > 0.5 ? '#00ff88' : '#ff4c4c';
        }
      }
    }

    if(c.color === '#00ff88'){
      c.y -= c.speed;
      if(c.y + c.bodyHeight + c.wickBottom < 0){
        c.y = H;
        c.bodyHeight = Math.random() * 30 + 10;
        c.wickTop = Math.random() * 10;
        c.wickBottom = Math.random() * 10;
        c.color = Math.random() > 0.5 ? '#00ff88' : '#ff4c4c';
      }
    } else {
      c.y += c.speed;
      if(c.y - c.wickTop > H){
        c.y = -c.bodyHeight - c.wickBottom + headerHeight;
        c.bodyHeight = Math.random() * 30 + 10;
        c.wickTop = Math.random() * 10;
        c.wickBottom = Math.random() * 10;
        c.color = Math.random() > 0.5 ? '#00ff88' : '#ff4c4c';
      }
    }
    ctx.globalAlpha = 1;
  });

  requestAnimationFrame(animate);
}

animate();