import Card from './card.js';

/**
 * Classe per crear una baralla
 */
export default class Deck {
  /**
   * Inicialitzar una array on és guardaran les cartes
   */
  constructor() {
    this.cards = [];
  };

  /**
   * Amplanar la array de cards amb les cartes requerides
   * @return {void}
   */
  generar() {
    const SUITS = ['oros', 'copas', 'bastos', 'espadas'];
    this.cards = [];

    for (let i = 0; i < SUITS.length; i++) {
      const suit = SUITS[i];

      for (let z = 1; z < 8; z++) {
        this.cards.push(new Card(
            suit,
            z,
            'img/' + suit + '/' + suit + '_' + z + '.jpg',
        ));
      }
      for (let z = 10; z < 13; z++) {
        this.cards.push(new Card(
            suit,
            z,
            'img/' + suit + '/' + suit + '_' + z + '.jpg',
        ));
      }
    };
  };

  /**
   * Eliminar l'última carta
   * @return {void}
   */
  pop() {
    this.cards.pop();
  };

  /**
   * Barrejar les cartes
   * @return {void}
   */
  suffle() {
    const ncards = [];

    while (this.cards.length > 0) {
      const random = Math.floor(Math.random() * this.cards.length);
      ncards.push(this.cards[random]);
      this.cards.splice(random, 1);
    };

    this.cards = ncards;
  };

  /**
   * Afegir una carta
   * @param {Card} card - La carta la qual volem afegir
   * @return {void}
   **/
  push(card) {
    this.cards.push(card);
  };

  /**
   * Agafar una carta
   * @return {Card} - La carta que hem agafar
   */
  agafarCarta() {
    const card = this.cards[this.cards.length - 1];
    this.pop();
    return card;
  };
}
