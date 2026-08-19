

    // Selección de elementos
const formClima = document.querySelector('#form-clima');
const inputCiudad = document.querySelector('#input-ciudad');
const btnBuscar = document.querySelector('#btn-buscar');
const resultado = document.querySelector('#resultado');

// Intérprete de códigos WMO de Open-Meteo
function interpretarClima(code) {
  switch (code) {
    case 0: return { texto: "Cielo despejado", icono: "☀️" };
    case 1: case 2: return { texto: "Parcialmente nublado", icono: "⛅" };
    case 3: return { texto: "Nublado", icono: "☁️" };
    case 45: case 48: return { texto: "Niebla", icono: "🌫️" };
    case 51: case 53: case 55: return { texto: "Llovizna ligera", icono: "🌧️" };
    case 61: case 63: case 65: return { texto: "Lluvia", icono: "🌧️" };
    case 71: case 73: case 75: return { texto: "Nieve", icono: "❄️" };
    case 80: case 81: case 82: return { texto: "Chubascos", icono: "🌦️" };
    case 95: case 96: case 99: return { texto: "Tormenta eléctrica", icono: "⚡" };
    default: return { texto: "Clima variado", icono: "🌡️" };
  }
}

// Cambiar fondo con imagen dinámicamente
async function cambiarFondoCiudad(nombreCiudad) {
  try {
    const wikiApiUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(nombreCiudad)}`;
    const res = await fetch(wikiApiUrl);
    
    if (res.ok) {
      const data = await res.json();
      if (data.originalimage && data.originalimage.source) {
        aplicarFondo(data.originalimage.source);
        return;
      }
    }
  } catch (e) {
    // Si falla Wikipedia, pasa al respaldo
  }

  aplicarFondo(`https://picsum.photos/1200/800?blur=1`);
}

function aplicarFondo(url) {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    document.body.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.45)), url('${url}')`;
  };
}

// Obtener datos del clima mediante API
async function obtenerClima(ciudad) {
  try {
    // Activar indicador de carga y deshabilitar botón
    btnBuscar.disabled = true;
    resultado.innerHTML = `<div class="spinner"></div><p class="mensaje-estado">Consultando el clima...</p>`;

    // 1. Obtener Coordenadas
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Ciudad no encontrada");
    }

    const { latitude, longitude, name, country } = geoData.results[0];

    // 2. Obtener Clima Actual
    const climaUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
    const climaRes = await fetch(climaUrl);
    const climaData = await climaRes.json();

    const actual = climaData.current;
    const temp = Math.round(actual.temperature_2m);
    const sensacion = Math.round(actual.apparent_temperature);
    const humedad = actual.relative_humidity_2m;
    const viento = Math.round(actual.wind_speed_10m);
    const infoClima = interpretarClima(actual.weather_code);

    // 3. Fondo dinámico
    cambiarFondoCiudad(name);

    // 4. Inyectar HTML con animación de entrada
    resultado.innerHTML = `
      <div class="fade-in">
        <div class="icono-clima">${infoClima.icono}</div>
        <div class="nombre-ciudad">${name}</div>
        <div class="pais">${country || ''}</div>
        <div class="temperatura">${temp}°C</div>
        <div class="estado-clima">${infoClima.texto}</div>

        <div class="detalles-grid">
          <div class="tarjeta-detalle">
            <span>🌡️</span>
            <span>SENSACIÓN</span>
            <span>${sensacion}°C</span>
          </div>
          <div class="tarjeta-detalle">
            <span>💧</span>
            <span>HUMEDAD</span>
            <span>${humedad}%</span>
          </div>
          <div class="tarjeta-detalle">
            <span>💨</span>
            <span>VIENTO</span>
            <span>${viento} km/h</span>
          </div>
          <div class="tarjeta-detalle">
            <span>📍</span>
            <span>ESTADO</span>
            <span>OK</span>
          </div>
        </div>
      </div>
    `;

  } catch (error) {
    resultado.innerHTML = `<p class="error">❌ ${error.message}</p>`;
  } finally {
    btnBuscar.disabled = false;
  }
}

// Listener global para envío de formulario (Enter o clic)
if (formClima) {
  formClima.addEventListener('submit', (e) => {
    e.preventDefault();
    const ciudad = inputCiudad.value.trim();
    if (ciudad !== "") obtenerClima(ciudad);
  });
}
 