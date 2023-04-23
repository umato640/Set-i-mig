import Deck from '../js/deck.js';
import Card from '../js/card.js';

describe('Unit test de la classe Deck', () => {
  test('Comprovar constructor', () => {
    const deck = new Deck();
    expect(deck.cards.length).toBe(0);
  });
  test('Comprovar generacio de la baralla', () => {
    const deck = new Deck();
    deck.generar();
    expect(deck.cards.length).toBe(40);
  });
  test('Comprovar barrejar cartes', () => {
    const deck = new Deck();
    deck.generar();
    deck.suffle();
    expect(deck.cards.length).toBe(40);
  });
  test('Comprovar eliminar carta', () => {
    const deck = new Deck();
    deck.generar();
    deck.pop();
    expect(deck.cards.length).toBe(39);
  });
  test('Comprovar afegir carta', () => {
    const deck = new Deck();
    deck.generar();
    const lcard = deck.cards[deck.cards.length - 1];
    const card = deck.agafarCarta();

    expect(card.suit).toBe(lcard.suit);
    expect(card.value).toBe(lcard.value);
    expect(card.img).toBe(lcard.img);
  });
  test('Comprovar afegir carta', () => {
    const deck = new Deck();
    const card = new Card('oros', 7, '/img/7.png');
    deck.push(card);
    const ncard = deck.agafarCarta();
    expect(ncard.suit).toBe(card.suit);
    expect(ncard.value).toBe(card.value);
    expect(ncard.img).toBe(card.img);
  });
});
