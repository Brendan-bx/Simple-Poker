const cardValueToNumber = (value) => {
  const valueOrder = ["7", "8", "9", "10", "J", "Q", "K", "A"];
  const index = valueOrder.indexOf(value);
  console.log(`Valeur: ${value}, Index numérique: ${index}`);
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

  console.log("Value Counts:", valueCounts);

  const counts = Object.values(valueCounts).sort((a, b) => b - a);
  console.log("Counts après tri (décroissant):", counts);

  const uniqueValues = Object.keys(valueCounts)
    .map(cardValueToNumber)
    .sort((a, b) => b - a);

  console.log("Unique Values triés (décroissant) :", uniqueValues);

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
  console.log("Résultat Joueur:", playerResult);
  console.log("Résultat Adversaire:", botResult);

  if (playerResult.strength > botResult.strength) {
    return { winner: "Joueur 1", winningHand: playerResult.name };
  } else if (playerResult.strength < botResult.strength) {
    return { winner: "Adversaire", winningHand: botResult.name };
  } else {
    if (["Paire", "Double Paire", "Brelan"].includes(playerResult.name)) {
      const playerComboValue = playerResult.highCards[0];
      const botComboValue = botResult.highCards[0];

      console.log(
        `Comparaison des combinaisons - Joueur: ${playerComboValue}, Adversaire: ${botComboValue}`
      );

      if (playerComboValue > botComboValue) {
        return { winner: "Joueur 1", winningHand: playerResult.name };
      } else if (playerComboValue < botComboValue) {
        return { winner: "Adversaire", winningHand: botResult.name };
      }
      return { winner: "Égalité", winningHand: null };
    } else if (playerResult.name === "Carte Haute") {
      const playerHighCardValues = playerResult.highCards;
      const botHighCardValues = botResult.highCards;

      for (let i = 0; i < playerHighCardValues.length; i++) {
        const playerCard = playerHighCardValues[i] || -1;
        const botCard = botHighCardValues[i] || -1;

        console.log(
          `Comparaison cartes hautes - Joueur: ${playerCard}, Adversaire: ${botCard}`
        );

        if (playerCard > botCard) {
          return { winner: "Joueur 1", winningHand: playerResult.name };
        } else if (playerCard < botCard) {
          return { winner: "Adversaire", winningHand: botResult.name };
        }
      }
      return { winner: "Égalité", winningHand: null };
    } else {
      return { winner: "Égalité", winningHand: null };
    }
  }
}
