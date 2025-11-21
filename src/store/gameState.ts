import { create } from "zustand";
import type { CardType } from "../types/card";

interface GameState {
  cards: CardType[];
  flippedCards: number[];
  matchedCards: number[];
  score: number;
  moves: number;
  isLocked: boolean;

  setCards: (cards: CardType[]) => void;
  setFlippedCards: (ids: number[]) => void;
  setMatchedCards: (ids: number[]) => void;
  setScore: (score: number) => void;
  setMoves: (moves: number) => void;
  setIsLocked: (locked: boolean) => void;
}

export const useGameState = create<GameState>((set) => ({
  cards: [],
  flippedCards: [],
  matchedCards: [],
  score: 0,
  moves: 0,
  isLocked: false,

  setCards: (cards) => set({ cards }),
  setFlippedCards: (ids) => set({ flippedCards: ids }),
  setMatchedCards: (ids) => set({ matchedCards: ids }),
  setScore: (score) => set({ score }),
  setMoves: (moves) => set({ moves }),
  setIsLocked: (locked) => set({ isLocked: locked }),
}));