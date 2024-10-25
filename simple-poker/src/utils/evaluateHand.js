const cardValueToNumber = (value) => {
  const valueOrder = ["7", "8", "9", "10", "J", "Q", "K", "A"];
  return valueOrder.indexOf(value);
};

export function evaluateHand(hand) {
  if (!Array.isArray(hand) || hand.length !== 4) {
    console.error("La main n'est pas un tableau de 4 cartes :", hand);
    return { name: "Erreur", strength: -1 };
  }

  const valueCounts = {};
  hand.forEach((card) => {
    const val = card.value;
    valueCounts[val] = (valueCounts[val] || 0) + 1;
  });

  const counts = Object.values(valueCounts);
  counts.sort((a, b) => b - a);

  const uniqueValues = Object.keys(valueCounts)
    .map(cardValueToNumber)
    .sort((a, b) => b - a);

  if (counts[0] === 4) {
    return { name: "Carré", strength: 4, highCard: uniqueValues[0] };
  } else if (counts[0] === 3) {
    return { name: "Brelan", strength: 3, highCard: uniqueValues[0] };
  } else if (counts[0] === 2) {
    if (counts[1] === 2) {
      return { name: "Double Paire", strength: 2, highCard: uniqueValues[0] };
    }
    return { name: "Paire", strength: 1, highCard: uniqueValues[0] };
  }

  return { name: "Carte Haute", strength: 0, highCard: uniqueValues[0] };
}

export function getWinner(playerResult, botResult) {
  if (playerResult.strength > botResult.strength) {
    return { winner: "Joueur 1", winningHand: playerResult.name };
  } else if (playerResult.strength < botResult.strength) {
    return { winner: "Adversaire", winningHand: botResult.name };
  } else {
    if (playerResult.highCard > botResult.highCard) {
      return { winner: "Joueur 1", winningHand: playerResult.name };
    } else if (playerResult.highCard < botResult.highCard) {
      return { winner: "Adversaire", winningHand: botResult.name };
    }
    return { winner: "Égalité", winningHand: null };
  }
}
