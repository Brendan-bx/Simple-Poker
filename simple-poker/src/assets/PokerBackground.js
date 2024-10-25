import React from "react";
import PokerGame from "../components/PokerGame.jsx";

const PokerBackground = () => {
  return (
    <div className="bg-green-800 h-screen flex items-center justify-center relative">
      <h1 className="absolute top-5 left-5 text-5xl font-poker z-10">
        Poker Game 🃏
      </h1>

      <div className="relative w-full max-w-4xl mx-auto p-10 bg-green-700 rounded-lg shadow-lg border-4 border-yellow-500 z-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-green-600 rounded-full shadow-xl border-4 border-yellow-300"></div>
        </div>
        <PokerGame />
      </div>
    </div>
  );
};

export default PokerBackground;
