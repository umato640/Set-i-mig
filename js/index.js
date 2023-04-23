import Taula from '/js/taula.js';
import Deck from '/js/deck.js';
import Jugador from '/js/jugador.js';
import Game from '/js/game.js';

const seguirButton = document.querySelector('.seguir');
const pararButton = document.querySelector('.parar');
const taulaJugador = document.querySelector('.taula-cartes-jugador');
const taulaOrdinador = document.querySelector('.taula-cartes-ordinador');
const startButton = document.querySelector('.start');
const alerta = document.querySelector('.alerta');

const deck = new Deck();
deck.generar();
deck.suffle();
const jugador = new Jugador('Unai', 100);
const computer = new Jugador('Computer', 100);
const taula = new Taula(taulaJugador,
    taulaOrdinador, startButton, seguirButton, pararButton, alerta);
const game = new Game(jugador, computer, deck, taula);
game.listenStart();
