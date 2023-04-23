/**
 * Classe la qual controlarà la vista del joc, és a dir, la manera en que es mostren les coses a la interfície del joc.
 */
export default class Taula {
  /**
   * Inicialitzar les propietats necessaries per la taula
   * @param {HTMLElement} taulaJugador - Element on s'afegiran les cartes del jugador
   * @param {HTMLElement} taulaOrdinador - Element on s'afegiran les cartes del ordinador
   * @param {HTMLElement} startButton - Botó per iniciar el joc
   * @param {HTMLElement} seguirButton - Botó per seguir i agafar una nova carta
   * @param {HTMLElement} pararButton - Botó per plantar-se
   * @param {HTMLElement} alerta - Element on és mostrarà si el jugador ha guanyat o a perdut
   */
  constructor(taulaJugador, taulaOrdinador, startButton, seguirButton, pararButton, alerta) {
    this.jugador = taulaJugador;
    this.ordinador = taulaOrdinador;
    this.start = startButton;
    this.seguir = seguirButton;
    this.parar = pararButton;
    this.alerta = alerta;
  };

  /**
   * Mostrar la carta a la taula
   * @param {Card} card - La carta que volem mostrar
   * @param {boolean} esJugador - Boolea, que indicarà si és el jugador o no, en cas que no s'afegirà la carta a l'ordinador
   * @return {void}
   */
  mostrarCarta(card, esJugador) {
    /* let text = document.createElement("p");
        text.innerText = card.value + " de " + card.suit;*/

    const img = document.createElement('img');
    img.src = card.img;

    if (esJugador) {
      this.jugador.appendChild(img);
    } else {
      this.ordinador.appendChild(img);
    };
  };

  /**
   * Mostar l'alerta si el jugador ha guanyat o perdut
   * @param {string} titol - Títol de l'alerta
   * @param {string} text - Descripció de l'alerta
   * @return {void}
   */
  mostrarAlerta(titol, text) {
    this.alerta.querySelector('.alerta-titol').textContent = titol;
    this.alerta.querySelector('.alerta-text').textContent = text;
    this.alerta.style = `
            animation-name: mostrar-alerta;
            animation-duration: 2s;
            animation-fill-mode: forwards;
        `;
  };

  /**
   * Amagar la alerta
   * @return {void}
   */
  amagarAlerta() {
    this.alerta.style = `
            animation-name: amagar-alerta;
            animation-duration: 2s;
            animation-fill-mode: forwards;
        `;
  };

  /**
   * Iniciarà un Listener de tipus click, sobre el botó de començar
   * @param {function} func - Funció a ser cridada quan el Listener sigui disparat
   * @param {Game} game - Classe Game pare que és passarà a la funció quan sigui cridada, perquè aquesta pugui accedir a els elements del seu pare
   * @return {void}
   */
  handleStartButton(func, game) {
    this.start.addEventListener('click', (e) => {
      func(game);
    });
  };

  /**
   * Iniciarà un Listener de tipus click, sobre el botó de seguir i parar
   * @param {function} funcSeguir - Funció a ser cridada quan el Listener del botó seguir sigui disparat
   * @param {function} funcParar - Funció a ser cridada quan el Listener del botó parar sigui disparat
   * @param {Game} game - Classe Game pare que és passarà a la funció quan sigui cridada, perquè aquesta pugui accedir a els elements del seu pare
   * @return {void}
   */
  handleButtons(funcSeguir, funcParar, game) {
    this.seguir.addEventListener('click', (e) => {
      funcSeguir(game);
    });

    this.parar.addEventListener('click', (e) => {
      funcParar(game);
    });
  };

  /**
   * Natejar la taula
   * @return {void}
   */
  natejar() {
    this.jugador.innerHTML = '';
    this.ordinador.innerHTML = '';
  };

  /**
   * Canviar el contingut del boto de començar
   * @param {string} text
   * @return {void}
   */
  changeStartText(text) {
    this.start.textContent = text;
  };
};
