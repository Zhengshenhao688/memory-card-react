import { useState } from "react";

export interface CardType {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const useGameState = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [score, setScore] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  return {
    cards, setCards,
    flippedCards, setFlippedCards,
    matchedCards, setMatchedCards,
    score, setScore,
    moves, setMoves,
    isLocked, setIsLocked,
  };
};