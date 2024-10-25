import React, { useState } from "react";
import { createDeck } from "./Deck.js";

function shuffleDeck(deck) {
  if (!Array.isArray(deck)) {
    console.error("Le deck n'est pas un tableau :", deck);
    return [];
  }
  const deckCopy = [...deck];
  for (let i = deckCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
  }
  return deckCopy;
}

export default function PokerGame() {
  const [deck, setDeck] = useState(shuffleDeck(createDeck()));
  const [playerHand, setPlayerHand] = useState([]);
  const [botHand, setBotHand] = useState([]);
  const [winner, setWinner] = useState(null);

  const dealCards = () => {
    const shuffledDeck = shuffleDeck(createDeck());
    setPlayerHand(shuffledDeck.slice(0, 4));
    setBotHand(shuffledDeck.slice(4, 8));
    setDeck(shuffledDeck.slice(8));
  };

  React.useEffect(() => {
    dealCards();
  }, []);

  return (
    <div>
      <h1>Poker Game</h1>
      <div className="">
        <h2>Joueur 1</h2>
        <div className="flex-row-reverse">
          <Hand cards={playerHand} />
        </div>
      </div>
      <div className="">
        <h2>Joueur 2</h2>
        <Hand cards={botHand} />
      </div>
      {winner && <h2>{winner} gagne!</h2>}
    </div>
  );

  function Hand({ cards }) {
    return (
      <div className="hand">
        {cards.map((card, index) => (
          <div key={index} className="card">
            {card.value} {card.suit}
          </div>
        ))}
      </div>
    );
  }
}
