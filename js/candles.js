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
    color: color
  });
}

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

    ctx.strokeStyle = c.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(c.x + c.width/2, c.y - c.wickTop);
    ctx.lineTo(c.x + c.width/2, c.y + c.bodyHeight + c.wickBottom);
    ctx.stroke();

    ctx.fillStyle = c.color === '#00ff88' ? '#fcf2e6' : '#fcf2e7';
    ctx.fillRect(c.x, c.y, c.width, c.bodyHeight);

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

const mouse = { x: undefined, y: undefined };

// Detectar Mouse o Toque en Tablet
window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('touchstart', (e) => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    // Aquí podrías disparar el sonido de "Select"
    if(typeof playSound === "function") playSound('select');
});

// En el loop de animate(), dentro del candles.forEach, añade esto:
function checkHover(c) {
    const dx = mouse.x - c.x;
    const dy = mouse.y - c.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 50) { // Radio de cercanía
        ctx.shadowBlur = 15;
        ctx.shadowColor = c.color;
        ctx.globalAlpha = 0.8; // Se vuelve más sólida al tocarla
    } else {
        ctx.shadowBlur = 0;
    }
}