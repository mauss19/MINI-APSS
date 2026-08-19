 
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');
    const card = document.querySelector('.cyber-card');

    // Ajustar el tamaño del canvas exactamente a la dimensión de la tarjeta
    function resizeCanvas() {
      canvas.width = card.clientWidth;
      canvas.height = card.clientHeight;
    }
    resizeCanvas();

    // Caracteres Matrix (Katakana + Números)
    const chars = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);

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

    // Ejecutar renderizado a 30 FPS
    setInterval(drawMatrix, 33);

    // Re-calcular columnas si cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
      resizeCanvas();
      columns = Math.floor(canvas.width / fontSize);
      drops = Array(columns).fill(1);
    });

    function triggerAlert(nombre) {
      console.log(`[ACCESO]: Módulo ${nombre} activado`);
    }
  
