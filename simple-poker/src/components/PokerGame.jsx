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
  const [winningHand, setWinningHand] = useState(null); // État pour la main gagnante

  const dealCards = () => {
    const shuffledDeck = shuffleDeck(createDeck());
    const newPlayerHand = shuffledDeck.slice(0, 4); // 4 cartes pour le joueur
    const newBotHand = shuffledDeck.slice(4, 8); // 4 cartes pour l'adversaire
    setPlayerHand(newPlayerHand);
    setBotHand(newBotHand);
    setDeck(shuffledDeck.slice(8));

    // Évaluer les mains et déterminer le gagnant
    const playerResult = evaluateHand(newPlayerHand); // Évaluer la main du joueur
    const botResult = evaluateHand(newBotHand); // Évaluer la main de l'adversaire
    const result = getWinner(playerResult, botResult); // Obtenir le gagnant et la main
    setWinner(result.winner);
    setWinningHand(result.winningHand); // Stocke le nom de la main gagnante
  };

  useEffect(() => {
    dealCards(); // Distribue les cartes au chargement
  }, []);

  return (
    <div>
      <h1>Poker Game</h1>
      <div className="">
        <h2>Adversaire</h2>
        <Hand cards={botHand} />
      </div>
      <div className="">
        <h2>Moi</h2>
        <div className="flex-row-reverse">
          <Hand cards={playerHand} />
        </div>
      </div>
      {winner === "Égalité" ? (
        <h2>{winner}!</h2>
      ) : (
        <h2>
          {winner} gagne avec {winningHand}!
        </h2>
      )}
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
