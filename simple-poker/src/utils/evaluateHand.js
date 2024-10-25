const cardValueToNumber = (value) => {
  const valueOrder = ["7", "8", "9", "10", "J", "Q", "K", "A"];
  valueOrder.indexOf(value);
};

export function evaluateHand(hand) {
  // Vérification si la main est un tableau
  if (!Array.isArray(hand) || hand.length !== 4) {
    console.error("La main n'est pas un tableau de 4 cartes :", hand);
    return { name: "Erreur", strength: -1 }; // Valeur pour indiquer une erreur
  }

  // Compter la fréquence de chaque valeur
  const valueCounts = {};
  hand.forEach((card) => {
    const val = card.value;
    valueCounts[val] = (valueCounts[val] || 0) + 1;
  });

  // Récupérer les fréquences des valeurs dans un tableau
  const counts = Object.values(valueCounts);
  counts.sort((a, b) => b - a); // Tri pour détecter plus facilement les combinaisons fortes

  // Détection des combinaisons
  if (counts[0] === 4) {
    return { name: "Carré", strength: 4 }; // Carré : 4 cartes de même valeur
  } else if (counts[0] === 3) {
    return { name: "Brelan", strength: 3 }; // Brelan : 3 cartes de même valeur
  } else if (counts[0] === 2) {
    if (counts[1] === 2) {
      return { name: "Double Paire", strength: 2 }; // Double paire : deux paires
    }
    return { name: "Paire", strength: 1 }; // Paire : 2 cartes de même valeur
  }

  // Si aucune combinaison n'est trouvée
  return { name: "Carte Haute", strength: 0 };
}

export function getWinner(playerResult, botResult) {
  if (playerResult.strength > botResult.strength) {
    return { winner: "Joueur 1", winningHand: playerResult.name }; // Joueur 1 gagne
  } else if (playerResult.strength < botResult.strength) {
    return { winner: "Joueur 2", winningHand: botResult.name }; // Joueur 2 gagne
  } else {
    return { winner: "Égalité", winningHand: null }; // En cas d'égalité
  }
}
