import { useState } from "react";

export const useGameState = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  return {
    cards, setCards,
    flippedCards, setFlippedCards,
    matchedCards, setMatchedCards,
    score, setScore,
    moves, setMoves,
    isLocked, setIsLocked,
  };
};