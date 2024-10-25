const cardValueToNumber = (value) => {
  const valueOrder = ["7", "8", "9", "10", "J", "Q", "K", "A"];
  const index = valueOrder.indexOf(value);
  return index;
};

export function evaluateHand(hand) {
  if (!Array.isArray(hand) || hand.length !== 4) {
    console.error("La main n'est pas un tableau de 4 cartes :", hand);
    return { name: "Erreur", strength: -1, highCards: [] };
  }

  const valueCounts = {};
  hand.forEach((card) => {
    const val = card.value;
    valueCounts[val] = (valueCounts[val] || 0) + 1;
  });

  const counts = Object.values(valueCounts).sort((a, b) => b - a);

  const uniqueValues = Object.keys(valueCounts)
    .map(cardValueToNumber)
    .sort((a, b) => b - a);

  if (counts[0] === 4) {
    return { name: "Carré", strength: 4, highCards: [uniqueValues[0]] };
  } else if (counts[0] === 3) {
    return { name: "Brelan", strength: 3, highCards: [uniqueValues[0]] };
  } else if (counts[0] === 2) {
    if (counts[1] === 2) {
      return {
        name: "Double Paire",
        strength: 2,
        highCards: [uniqueValues[0], uniqueValues[1]],
      };
    }
    return { name: "Paire", strength: 1, highCards: [uniqueValues[0]] };
  }

  return { name: "Carte Haute", strength: 0, highCards: uniqueValues };
}

export function getWinner(playerResult, botResult) {
  if (playerResult.strength > botResult.strength) {
    return { winner: "Joueur 1", winningHand: playerResult.name };
  } else if (playerResult.strength < botResult.strength) {
    return { winner: "Adversaire", winningHand: botResult.name };
  } else {
    if (
      ["Carré", "Brelan", "Double Paire", "Paire"].includes(playerResult.name)
    ) {
      const playerComboValue = playerResult.highCards[0];
      const botComboValue = botResult.highCards[0];

      if (playerComboValue > botComboValue) {
        return { winner: "Joueur 1", winningHand: playerResult.name };
      } else if (playerComboValue < botComboValue) {
        return { winner: "Adversaire", winningHand: botResult.name };
      }
      return { winner: "Égalité", winningHand: null };
    } else {
      const playerHighCard = playerResult.highCards[0];
      const botHighCard = botResult.highCards[0];

      if (playerHighCard > botHighCard) {
        return { winner: "Joueur 1", winningHand: "Carte Forte" };
      } else if (playerHighCard < botHighCard) {
        return { winner: "Adversaire", winningHand: "Carte Forte" };
      }

      return { winner: "Égalité", winningHand: null };
    }
  }
}
