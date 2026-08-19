const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const card = document.querySelector('.cyber-card');

// Cambiar color del borde dinámicamente con HSL
let hue = 0;
setInterval(() => {
  hue = (hue + 1) % 360;
  if (card) {
    card.style.borderColor = `hsl(${hue}, 100%, 50%)`;
    card.style.boxShadow = `0 0 25px hsl(${hue}, 100%, 50%)`;
  }
}, 30);

// Ajustar tamaño del canvas dinámicamente
function resizeCanvas() {
  if (card && canvas) {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
}

// Configuración de la lluvia Matrix
const chars = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789';
const fontSize = 14;
let columns = 0;
let drops = [];

function initMatrix() {
  resizeCanvas();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

function drawMatrix() {
  // Fondo translúcido con el color base de la tarjeta (#080d1a) para dejar la estela
  ctx.fillStyle = 'rgba(8, 13, 26, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff41'; // Verde brillante de Matrix
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = chars.charAt(Math.floor(Math.random() * chars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// Inicializar animación y eventos
initMatrix();
setInterval(drawMatrix, 33); // 30 FPS

window.addEventListener('resize', initMatrix);

function triggerAlert(nombre) {
  console.log(`[ACCESO]: Módulo ${nombre} activado`);
}