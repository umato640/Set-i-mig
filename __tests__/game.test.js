import Game from '../js/game.js';
import Jugador from '../js/jugador.js';
import Deck from '../js/deck.js';
import Card from '../js/card.js';

/**
 * Classe la qual controlarà la vista del joc, és a dir, la manera en que es mostren les coses a la interfície del joc.
 */
class Taula {
  /**
   * Inicialitzar les propietats necessaries per la taula
   */
  constructor() {
    this.isStartHandlerListening = false;
    this.isListeningMainButtons = false;
    this.countMostrarCartesJugador = 0;
    this.countMostrarCartesOrdinador = 0;
    this.isShowingAlert = false;
    this.isClean = true;
    this.countStartButtonTextChanges = 0;

    this.jugador;
    this.ordinador;
    this.start;
    this.seguir;
    this.parar;
    this.alerta;
  };

  /**
   * Mostrar la carta a la taula
   */
  mostrarCarta(card, esJugador) {
    if (this.isClean) this.isClean = false;
    if (esJugador) this.countMostrarCartesJugador++;
    else this.countMostrarCartesOrdinador++;
  };

  /**
   * Mostar l'alerta si el jugador ha guanyat o perdut
   */
  mostrarAlerta(titol, text) {
    this.isShowingAlert = true;
  };

  /**
   * Amagar la alerta
   * @return {void}
   */
  amagarAlerta() {
    this.isShowingAlert = false;
  };

  /**
   * Iniciarà un Listener de tipus click, sobre el botó de començar
   */
  handleStartButton(func, game) {
    this.isStartHandlerListening = true;
  };

  /**
   * Iniciarà un Listener de tipus click, sobre el botó de seguir i parar
   */
  handleButtons(funcSeguir, funcParar, game) {
    this.isListeningMainButtons = true;
  };

  /**
   * Natejar la taula
   */
  natejar() {
    this.isClean = true;
  };
  /**
   * Si
   */
  changeStartText() {
    this.countStartButtonTextChanges++;
  }
};

describe('Unit test de la classe Game', () => {
  test('Comprovar constructor', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());

    expect(game.player.deck.cards.length).toBe(0);
    expect(game.player.name).toBe('Unai');
    expect(game.player.money).toBe(100);
    expect(game.player.points).toBe(0);

    expect(game.computer.deck.cards.length).toBe(0);
    expect(game.computer.name).toBe('Ordinador');
    expect(game.computer.money).toBe(100);
    expect(game.computer.points).toBe(0);

    expect(game.deck.cards.length).toBe(40);

    expect(game.taula.isStartHandlerListening).toBe(false);
    expect(game.taula.isListeningMainButtons).toBe(false);
    expect(game.taula.isShowingAlert).toBe(false);
    expect(game.taula.countMostrarCartesOrdinador).toBe(0);
    expect(game.taula.countMostrarCartesJugador).toBe(0);
    expect(game.taula.countStartButtonTextChanges).toBe(0);
    expect(game.taula.isClean).toBe(true);
    expect(game.jugador).toBe(undefined);
    expect(game.ordinador).toBe(undefined);
    expect(game.start).toBe(undefined);
    expect(game.seguir).toBe(undefined);
    expect(game.parar).toBe(undefined);
    expect(game.alerta).toBe(undefined);

    expect(game.plantat).toBe(false);
    expect(game.isListening).toBe(false);
    expect(game.isGameOver).toBe(false);
    expect(game.isStarted).toBe(false);
  });

  test('Comprovar event del boto de començar', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.listenStart();
    expect(game.taula.isStartHandlerListening).toBe(true);
  });

  test('Comprovar controlador del boto de començar', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.handleStart(game);

    expect(game.taula.countMostrarCartesOrdinador).toBe(1);
    expect(game.taula.countMostrarCartesJugador).toBe(1);
    expect(game.taula.countStartButtonTextChanges).toBe(1);
    expect(game.isStarted).toBe(true);
    expect(game.player.deck.cards.length).toBe(1);
    expect(game.computer.deck.cards.length).toBe(1);
    expect(game.plantat).toBe(false);
    expect(game.taula.isListeningMainButtons).toBe(true);
    expect(game.isListening).toBe(true);
  });

  test('Comprovar controlador del boto de reiniciar', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.handleStart(game);
    game.handleStart(game);

    expect(game.deck.cards.length).toBe(38);
    expect(game.player.deck.cards.length).toBe(1);
    expect(game.player.name).toBe(jugador.name);
    // expect(game.player.money).toBe();
    expect(game.computer.deck.cards.length).toBe(1);
    expect(game.computer.name).toBe(computer.name);
    // expect(game.player.money).toBe();

    expect(game.taula.isClean).toBe(false);
    expect(game.isGameOver).toBe(false);
    expect(game.taula.isShowingAlert).toBe(false);

    expect(game.taula.countStartButtonTextChanges).toBe(1);
    expect(game.taula.countMostrarCartesOrdinador).toBe(2);
    expect(game.taula.countMostrarCartesJugador).toBe(2);
    expect(game.isStarted).toBe(true);
    expect(game.plantat).toBe(false);
    expect(game.taula.isListeningMainButtons).toBe(true);
  });

  test('Comprovar controlador del boto de seguir', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.handleSeguir(game);
    expect(game.taula.countMostrarCartesJugador).toBe(1);
  });

  test('Comprovar controlador del boto de seguir quan el joc ja ha acabat', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.isGameOver = true;
    game.handleSeguir(game);
    expect(game.taula.countMostrarCartesJugador).toBe(0);
  });

  test('Comprovar controlador del boto de seguir quan el jugador ja s\'ha plantat', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.plantat = true;
    game.handleSeguir(game);
    expect(game.taula.countMostrarCartesJugador).toBe(0);
  });

  test('Comprovar controlador del boto de seguir quan el jugador ha perdut', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.player.points = 8;
    game.handleSeguir(game);
    expect(game.taula.countMostrarCartesJugador).toBe(1);
    expect(game.taula.isShowingAlert).toBe(true);
    expect(game.isGameOver).toBe(true);
  });

  test('Comprovar controlador del boto de parar', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.handleParar(game);
    expect(game.taula.countMostrarCartesOrdinador).toBe(0);
    expect(game.plantat).toBe(true);
    expect(game.taula.isShowingAlert).toBe(true);
    expect(game.isGameOver).toBe(true);
  });

  test('Comprovar controlador del boto de parar amb el jugador amb punts superiors', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.player.points = 0.5;
    game.handleParar(game);
    expect(game.taula.countMostrarCartesOrdinador).toBe(1);
    expect(game.plantat).toBe(true);
    expect(game.taula.isShowingAlert).toBe(true);
    expect(game.isGameOver).toBe(true);
  });

  test('Comprovar controlador del boto de parar quan el joc ja s\'ha acabat', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.isGameOver = true;
    game.handleParar(game);
    expect(game.taula.countMostrarCartesOrdinador).toBe(0);
    expect(game.plantat).toBe(false);
    expect(game.taula.isShowingAlert).toBe(false);
    expect(game.isGameOver).toBe(true);
  });

  test('Comprovar funcio reiniciar', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.handleStart(game);
    game.handleStart(game);

    expect(game.deck.cards.length).toBe(38);
    expect(game.player.deck.cards.length).toBe(1);
    expect(game.player.name).toBe(jugador.name);
    // expect(game.player.money).toBe();
    expect(game.computer.deck.cards.length).toBe(1);
    expect(game.computer.name).toBe(computer.name);
    // expect(game.player.money).toBe();

    expect(game.taula.isClean).toBe(false);
    expect(game.isGameOver).toBe(false);
    expect(game.taula.isShowingAlert).toBe(false);

    expect(game.taula.countStartButtonTextChanges).toBe(1);
    expect(game.taula.countMostrarCartesOrdinador).toBe(2);
    expect(game.taula.countMostrarCartesJugador).toBe(2);
    expect(game.isStarted).toBe(true);
    expect(game.plantat).toBe(false);
    expect(game.taula.isListeningMainButtons).toBe(true);
  });

  test('Comprovar funcio jugar com a jugador', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    const card = new Card('oros', 7, '/img/abc.jpg');
    deck.push(card);
    const game = new Game(jugador, computer, deck, new Taula());
    const ncard = game.jugar();
    expect(game.plantat).toBe(false);
    expect(ncard.value).toBe(card.value);
    expect(ncard.suit).toBe(card.suit);
    expect(ncard.img).toBe(card.img);
    expect(game.player.deck.cards[0].value).toBe(card.value);
    expect(game.player.deck.cards[0].suit).toBe(card.suit);
    expect(game.player.deck.cards[0].img).toBe(card.img);
    expect(game.player.points).toBe(game.obtenirPuntsCarta(card));
  });

  test('Comprovar funcio jugar com a ordinador', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    const card = new Card('oros', 7, '/img/abc.jpg');
    deck.push(card);
    const game = new Game(jugador, computer, deck, new Taula());
    game.plantat = true;
    const ncard = game.jugar();
    expect(game.plantat).toBe(true);
    expect(ncard.value).toBe(card.value);
    expect(ncard.suit).toBe(card.suit);
    expect(ncard.img).toBe(card.img);
    expect(game.computer.deck.cards[0].value).toBe(card.value);
    expect(game.computer.deck.cards[0].suit).toBe(card.suit);
    expect(game.computer.deck.cards[0].img).toBe(card.img);
    expect(game.computer.points).toBe(game.obtenirPuntsCarta(card));
  });

  test('Comprovar funcio obtenir punts d\'una carta inferior o igual a 7', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    const card = new Card('oros', 7, '/img/abc.jpg');
    const game = new Game(jugador, computer, deck, new Taula());
    const points = game.obtenirPuntsCarta(card);
    expect(points).toBe(card.value);
  });

  test('Comprovar funcio obtenir punts d\'una carta superior a 7', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    const card = new Card('oros', 11, '/img/abc.jpg');
    const game = new Game(jugador, computer, deck, new Taula());
    const points = game.obtenirPuntsCarta(card);
    expect(points).toBe(0.5);
  });

  test('Comprovar funcio jugador perdedor en cas de estar jugant el jugador i no s\'ha passat de 7.5', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.player.points = 7.5;
    const esJugadorPerdedor = game.jugadorPerdedor();
    expect(game.plantat).toBe(false);
    expect(esJugadorPerdedor).toBe(false);
  });

  test('Comprovar funcio jugador perdedor en cas de estar jugant el jugador i s\'ha passat de 7.5', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.player.points = 8;
    const esJugadorPerdedor = game.jugadorPerdedor();
    expect(game.plantat).toBe(false);
    expect(esJugadorPerdedor).toBe(true);
  });

  test('Comprovar funcio jugador perdedor en cas de estar jugant l\'ordinador i s\'ha passat de 7.5', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.plantat = true;
    game.computer.points = 8;
    const esJugadorPerdedor = game.jugadorPerdedor();
    expect(game.plantat).toBe(true);
    expect(esJugadorPerdedor).toBe(false);
  });

  test('Comprovar funcio jugador perdedor en cas de estar jugant l\'ordinador i té una puntuació inferior al jugador', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.plantat = true;
    game.player.points = 7.5;
    game.computer.points = 7;
    const esJugadorPerdedor = game.jugadorPerdedor();
    expect(game.plantat).toBe(true);
    expect(esJugadorPerdedor).toBe(false);
  });

  test('Comprovar funcio jugador perdedor en cas de estar jugant l\'ordinador i té una puntuació superior o igual al jugador', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.plantat = true;
    game.player.points = 7;
    game.computer.points = 7.5;
    const esJugadorPerdedor = game.jugadorPerdedor();
    expect(game.plantat).toBe(true);
    expect(esJugadorPerdedor).toBe(true);
  });

  test('Comprovar funcio de compovar guanyador en cas que el jugador sigui guanyador', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.plantat = true;
    game.player.points = 7.5;
    game.computer.points = 7;
    game.checkGuanyador();
    expect(game.plantat).toBe(true);
    expect(game.taula.isShowingAlert).toBe(true);
  });

  test('Comprovar funcio de compovar guanyador en cas que el jugador sigui perdedor', () => {
    const jugador = new Jugador('Unai', 100);
    const computer = new Jugador('Ordinador', 100);
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    const game = new Game(jugador, computer, deck, new Taula());
    game.player.points = 8;
    game.checkGuanyador();
    expect(game.plantat).toBe(false);
    expect(game.taula.isShowingAlert).toBe(true);
  });
});
