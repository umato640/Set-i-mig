/**
 * Classe per crear una carta
 */
export default class Card {
  /**
   * Inicialitzar les propietats necessaries per una carta
   * @param {string} suit - La suit en la que pertany la carta
   * @param {number} value - El valor de la carta
   * @param {string} img - El link de la imatge de la carta
   * @return {void}
   */
  constructor(suit, value, img) {
    this.suit = suit;
    this.value = value;
    this.img = img;
  };
}
