import Deck from './deck.js';
/**
 * Classe Jugador, la qual ens permet generar un jugador amb
 * les propietats necessaries, per el joc.
 */
export default class Jugador {
  /**
   * Inicialitzar les propietats necessaries per una jugador
   * @param {string} name - Nom del jugador
   * @param {number} money - Diners que té
   * @param {number} points - Punts que té, segons les cartes que li van tocant
   */
  constructor(name, money) {
    this.deck = new Deck();
    this.name = name;
    this.money = money;
    this.points = 0;
  };
  /**
   * Reiniciar la baralla i els punts
   * @return {void}
   */
  reiniciar() {
    this.points = 0;
    this.deck = new Deck();
  };
};
