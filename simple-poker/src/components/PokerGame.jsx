import React, { useState, useEffect } from "react";
import { createDeck } from "./Deck.jsx";
import { evaluateHand, getWinner } from "../utils/evaluateHand.js";

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
  const [winningHand, setWinningHand] = useState(null);

  const dealCards = () => {
    const shuffledDeck = shuffleDeck(createDeck());
    const newPlayerHand = shuffledDeck.slice(0, 4);
    const newBotHand = shuffledDeck.slice(4, 8);
    setPlayerHand(newPlayerHand);
    setBotHand(newBotHand);
    setDeck(shuffledDeck.slice(8));

    const playerResult = evaluateHand(newPlayerHand);
    const botResult = evaluateHand(newBotHand);
    const result = getWinner(playerResult, botResult);
    setWinner(result.winner);
    setWinningHand(result.winningHand);
  };

  useEffect(() => {
    dealCards();
  }, []);

  return (
    <div className="relative p-4 flex flex-col items-center z-10">
      <h2 className="text-lg font-bold mb-2 z-10">Adversaire</h2>
      <Hand cards={botHand} />
      <div className="flex justify-between w-full mt-4 z-10">
        <h2 className="text-lg font-bold text-center flex-1">Moi</h2>
      </div>
      <Hand cards={playerHand} />
      <div className="mt-4 text-center">
        {winner === "Égalité" ? (
          <h2>{winner}!</h2>
        ) : (
          <h2>
            {winner} gagne avec {winningHand}!
          </h2>
        )}
      </div>
    </div>
  );

  function Hand({ cards }) {
    return (
      <div className="flex gap-2 mt-2">
        {cards.map((card, index) => (
          <div
            key={index}
            className="w-16 h-24 border-2 border-black rounded-lg flex items-center justify-center bg-white shadow-lg relative z-20"
            data-value={card.value}
            data-suit={card.suit}
          >
            <span className="absolute top-1 left-1 text-sm">{card.value}</span>
            <span className="absolute bottom-1 right-1 text-sm">
              {card.suit}
            </span>
          </div>
        ))}
      </div>
    );
  }
}
