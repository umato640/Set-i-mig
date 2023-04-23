/**
 * Classe la qual controlarà el funcionament del joc
 */
export default class Game {
  /**
   * Inicialitzar les propietats necessaries per el joc
   * @param {Jugador} player - El jugador
   * @param {Jugador} computer - L'ordinador
   * @param {Deck} deck - La baralla
   * @param {Taula} taula - La taula
   */
  constructor(player, computer, deck, taula) {
    this.player = player;
    this.computer = computer;
    this.deck = deck;
    this.plantat = false;
    this.taula = taula;
    this.isListening = false;
    this.isGameOver = false;
    this.isStarted = false;
  };

  /**
   * Per començar a esperar a que el botó de començar sigui clicat
   * @return {void}
   */
  listenStart() {
    this.taula.handleStartButton(this.handleStart, this);
  };

  /**
   * Controlar el botó de començar
   * @param {Game} game - Classe Game pare
   * @return {void}
   */
  handleStart(game) {
    if (!game.isStarted) {
      game.isStarted = true;
      game.iniciar();
      game.taula.changeStartText('Reiniciar');
    } else {
      game.reiniciar();
    };
  };

  /**
   * Iniciar el joc, agafar les cartes inicials per cada jugador i cridar les
   * funcions controladores dels botons
   * @return {void}
   */
  iniciar() {
    let card = this.jugar();
    this.taula.mostrarCarta(card, true);
    this.plantat = true;
    card = this.jugar();
    this.taula.mostrarCarta(card, false);
    this.plantat = false;

    if (!this.isListening) {
      this.taula.handleButtons(this.handleSeguir, this.handleParar, this);
      this.isListening = true;
    };
  };

  /**
   * Realitza el funcionament de seguir, agafarà una carta per el jugador i
   * mirarà si s'ha passat de la puntuació màxima
   * @param {Game} game - Classe Game pare
   * @return {void}
   */
  handleSeguir(game) {
    if (!game.isGameOver) {
      if (!game.plantat) {
        const card = game.jugar();
        game.taula.mostrarCarta(card, true);
        if (game.jugadorPerdedor()) {
          game.taula.mostrarAlerta('Perdedor!', 'Llastima, has perdut!');
          game.isGameOver = true;
        };
      };
    };
  };

  /**
   * Realitza el funcionament de jugar la màquina, una vegada el jugador es
   * planta. Finalment és comprova el guanyador.
   * @param {Game} game - Classe Game pare
   * @return {void}
   */
  handleParar(game) {
    if (!game.isGameOver) {
      game.plantat = true;

      while (game.computer.points < game.player.points &&
      game.computer.points < 7.5) {
        const card = game.jugar();
        game.taula.mostrarCarta(card, false);
      };

      game.checkGuanyador();
      game.isGameOver = true;
    };
  };

  /**
   * Reiniciar el joc, reiniciarà tots els components del joc; jugadors,
   * taula i propietats bàsiques del joc. Seguidament el tornarà a iniciar.
   * @return {void}
   */
  reiniciar() {
    this.deck.generar();
    this.deck.suffle();
    this.player.reiniciar();
    this.computer.reiniciar();
    this.taula.natejar();
    this.plantat = false;
    this.isGameOver = false;
    this.iniciar();
    this.taula.amagarAlerta();
  };

  /**
   * Realitzar una jugada, segons si el jugador està plantat o no.
   * @return {Card} - Carta seleccionada
   */
  jugar() {
    let card;
    if (this.plantat) {
      card = this.deck.agafarCarta();
      this.computer.deck.push(card);
      this.computer.points += this.obtenirPuntsCarta(card);
    } else {
      card = this.deck.agafarCarta();
      this.player.deck.push(card);
      this.player.points += this.obtenirPuntsCarta(card);
    };

    return card;
  };

  /**
   * Comprovar els punts del jugador, per veure si ha perdut
   * @return {boolean} - Boolea, que indicarà si el jugador ha perdut o no
   */
  jugadorPerdedor() {
    if (!this.plantat) {
      if (this.player.points > 7.5) return true;
      else return false;
    } else {
      if (this.computer.points > 7.5) return false;
      else if (this.player.points > this.computer.points) return false;
      else return true;
    };
  };

  /**
   * Mirar si el jugador es el guanyador o perdedor, mostrarnt-ho a la taula
   * @return {void}
   */
  checkGuanyador() {
    if (!this.jugadorPerdedor()) {
      this.taula.mostrarAlerta('Guayador!', 'Enorabona, has guanyat!');
    } else this.taula.mostrarAlerta('Perdedor!', 'Llastima, has perdut!');
  };

  /**
   * Obtenir els punts de la carta
   * @param {Card} card - Carta la qual és vol obtenir els punts que li
   * pertoquen
   * @return {number} - Numero que indica els punts de la carta
   */
  obtenirPuntsCarta(card) {
    if (card.value > 7) return 0.5;
    else return card.value;
  };
};
