
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const card = document.querySelector('.cyber-card');

// 1. Cambiar color del borde dinámicamente con HSL
let hue = 0;
setInterval(() => {
  hue = (hue + 1) % 360;
  if (card) {
    card.style.borderColor = `hsl(${hue}, 100%, 50%)`;
    card.style.boxShadow = `0 0 25px hsl(${hue}, 100%, 50%)`;
  }
}, 30);

// 2. Ajustar tamaño del canvas dinámicamente
function resizeCanvas() {
  if (card && canvas) {
    canvas.width = card.clientWidth;
    canvas.height = card.clientHeight;
  }
}

// 3. Configuración y animación de lluvia Matrix
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
  ctx.fillStyle = 'rgba(8, 13, 26, 0.15)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00ff41';
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

initMatrix();
setInterval(drawMatrix, 33);
window.addEventListener('resize', initMatrix);

// 4. Manejo de alertas en la consola
function triggerAlert(nombre) {
  console.log(`[ACCESO]: Módulo ${nombre} activado`);
}

// 5. Escuchar clics en los botones mediante data-module (sin HTML inline)
document.querySelectorAll('.cyber-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const modulo = e.target.getAttribute('data-module');
    triggerAlert(modulo);
  });
});

// 6. Efecto de máquina de escribir para el título
const titleElement = document.getElementById('typewriterTitle');
if (titleElement) {
  const text = titleElement.getAttribute('data-text');
  let index = 0;
  
  function typeEffect() {
    if (index < text.length) {
      titleElement.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 150);
    }
  }
  typeEffect();
}