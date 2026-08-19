  
    let tonoActual = 75;
    let saturacionActual = 91;

    const inputColor = document.querySelector('#input-color');
    const btnCambiar = document.querySelector('#btn-cambiar');
    const textoColor = document.querySelector('#texto-color');
    const deslizador = document.querySelector('#deslizador-brillo');

    // Diccionario básico inglés-español para nombres de colores comunes
    const coloresEspanol = {
      'rojo': 'red', 'azul': 'blue', 'verde': 'green', 'amarillo': 'yellow',
      'naranja': 'orange', 'morado': 'purple', 'rosado': 'pink', 'rosa': 'pink',
      'negro': 'black', 'blanco': 'white', 'gris': 'gray', 'cafe': 'brown',
      'marrón': 'brown', 'turquesa': 'turquoise', 'violeta': 'violet'
    };

    // Convierte HSL a Hexadecimal
    function hslAHex(h, s, l) {
      s /= 100;
      l /= 100;
      let c = (1 - Math.abs(2 * l - 1)) * s;
      let x = c * (1 - Math.abs((h / 60) % 2 - 1));
      let m = l - c / 2;
      let r = 0, g = 0, b = 0;

      if (0 <= h && h < 60) { r = c; g = x; b = 0; }
      else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
      else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
      else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
      else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
      else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

      r = Math.round((r + m) * 255).toString(16).padStart(2, '0');
      g = Math.round((g + m) * 255).toString(16).padStart(2, '0');
      b = Math.round((b + m) * 255).toString(16).padStart(2, '0');

      return `#${r}${g}${b}`.toUpperCase();
    }

    // Convierte cualquier formato CSS válido a valores HSL
    function convertirColorAHSL(cadenaColor) {
      const div = document.createElement('div');
      div.style.color = cadenaColor;
      document.body.appendChild(div);
      const colorCalculado = window.getComputedStyle(div).color;
      document.body.removeChild(div);

      const rgb = colorCalculado.match(/\d+/g);
      if (!rgb || rgb.length < 3) return null;

      let r = parseInt(rgb[0]) / 255;
      let g = parseInt(rgb[1]) / 255;
      let b = parseInt(rgb[2]) / 255;

      let max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }

      return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
      };
    }

    // Actualiza el fondo de pantalla
    function aplicarColor() {
      const luminosidad = 100 - deslizador.value;
      const hex = hslAHex(tonoActual, saturacionActual, luminosidad);
      
      document.body.style.backgroundColor = hex;
      textoColor.textContent = hex;
    }

    // Evento al buscar/escribir un color
    inputColor.addEventListener('input', (e) => {
      let valor = e.target.value.trim().toLowerCase();
      
      // Traduce si el usuario escribió en español
      if (coloresEspanol[valor]) {
        valor = coloresEspanol[valor];
      }

      const hsl = convertirColorAHSL(valor);
      
      // Si es un color válido, actualiza las variables y el tono
      if (hsl) {
        tonoActual = hsl.h;
        saturacionActual = hsl.s;
        deslizador.value = 100 - hsl.l; // Ajusta el slider a la luminosidad del color buscado
        aplicarColor();
      }
    });

    // Evento al presionar el botón "Cambiar Color"
    btnCambiar.addEventListener('click', () => {
      tonoActual = Math.floor(Math.random() * 360);
      saturacionActual = Math.floor(Math.random() * 41) + 60;
      deslizador.value = 50;
      inputColor.value = ''; // Limpia el buscador al hacer clic en aleatorio
      aplicarColor();
    });

    // Evento al mover el deslizador de brillo
    deslizador.addEventListener('input', aplicarColor);

    // Color inicial
    aplicarColor();


    function convertirColorAHSL(cadenaColor) {
  // Evita que cambie a blanco si el texto aún no es un color válido
  if (!CSS.supports('color', cadenaColor)) return null;

  const div = document.createElement('div');
  div.style.color = cadenaColor;
  document.body.appendChild(div);
  const colorCalculado = window.getComputedStyle(div).color;
  document.body.removeChild(div);

  const rgb = colorCalculado.match(/\d+/g);
  if (!rgb || rgb.length < 3) return null;

  let r = parseInt(rgb[0]) / 255;
  let g = parseInt(rgb[1]) / 255;
  let b = parseInt(rgb[2]) / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

const btnLimpiar = document.querySelector('#btn-limpiar');

btnLimpiar.addEventListener('click', () => {
  inputColor.value = '';
  inputColor.focus(); // Opcional: vuelve a poner el cursor en la caja de texto
});


  