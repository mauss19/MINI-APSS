 
    const TOTAL_BARRAS = 100;
    let contador = 0;
    let naranjasCount = 0;

    const circulo = document.querySelector('#circulo');
    const pantalla = document.querySelector('#valor');
    const panel = document.querySelector('#panel');
    const btnSumar = document.querySelector('#btn-sumar');
    const btnRestar = document.querySelector('#btn-restar');
    const btnReset = document.querySelector('#btn-reset');

    // Generar dinámicamente las 100 barras en círculo
    for (let i = 0; i < TOTAL_BARRAS; i++) {
      const barra = document.createElement('div');
      barra.classList.add('barra');
      const angulo = (i / TOTAL_BARRAS) * 360;
      barra.style.transform = `translate(-50%, -100%) rotate(${angulo}deg) translateY(-140px)`;
      circulo.appendChild(barra);
    }

    const barras = document.querySelectorAll('.barra');

    function actualizar() {
      pantalla.textContent = contador;

      barras.forEach((barra, indice) => {
        // Del 0 al número del contador: Morado
        if (indice < contador) {
          barra.classList.add('activo');
          barra.classList.remove('naranja');
        } 
        // De la posición del contador hasta las barras restadas: Naranja
        else if (indice >= contador && indice < contador + naranjasCount) {
          barra.classList.remove('activo');
          barra.classList.add('naranja');
        } 
        // Resto: Apagado
        else {
          barra.classList.remove('activo');
          barra.classList.remove('naranja');
        }
      });
    }

    btnRestar.addEventListener('click', () => {
      if (contador > 0) {
        contador--;
        naranjasCount++;
        actualizar();

        panel.classList.add('restar');
        setTimeout(() => {
          panel.classList.remove('restar');
        }, 300);
      }
    });

    btnSumar.addEventListener('click', () => {
      if (contador + naranjasCount < TOTAL_BARRAS) {
        if (naranjasCount > 0) {
          naranjasCount--;
        }
        contador++;
        panel.classList.remove('restar');
        actualizar();
      }
    });

    btnReset.addEventListener('click', () => {
      contador = 0;
      naranjasCount = 0;
      panel.classList.remove('restar');
      actualizar();
    });
  