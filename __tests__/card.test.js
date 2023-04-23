import Card from '../js/card.js';

describe('Unit test de la classe Card', () => {
  test('Comprovar constructor', () => {
    const card = new Card('oros', 7, '/img/7.png');
    expect(card.suit).toBe('oros');
    expect(card.value).toBe(7);
    expect(card.img).toBe('/img/7.png');
  });
});
