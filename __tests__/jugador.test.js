import Jugador from '../js/jugador.js';
import Card from '../js/card.js';

describe('Unit test de la classe Jugador', () => {
  test('Comprovar constructor', () => {
    const jugador = new Jugador('Unai', 100);
    expect(jugador.deck.cards.length).toBe(0);
    expect(jugador.name).toBe('Unai');
    expect(jugador.money).toBe(100);
    expect(jugador.points).toBe(0);
  });
  test('Comprovar reiniciar', () => {
    const jugador = new Jugador('Unai', 100);
    const card = new Card('oros', 7, '/img/7.png');
    jugador.points = 7.5;
    jugador.deck.push(card);
    jugador.reiniciar();
    expect(jugador.deck.cards.length).toBe(0);
    expect(jugador.name).toBe('Unai');
    expect(jugador.money).toBe(100);
    expect(jugador.points).toBe(0);
  });
});
