const suits = ["♠", "♥", "♦", "♣"];
const values = ["7", "8", "9", "10", "J", "Q", "K", "A"];

export function createDeck() {
  let deck = [];
  for (let suit of suits) {
    for (let value of values) {
      deck.push({ suit, value });
    }
  }
  return deck;
}
