import { shuffleArray } from "../../utils/shuffle";
import { createCardList } from "../../utils/createCardList";
import type { CardType } from "../../types/card";
import { useGameState } from "../../store/gameState";

/**
 * 初始化整局游戏的逻辑：洗牌 & 重置所有状态
 */
export const useInitializeGame = (cardValues: readonly string[]) => {
  const {
    setCards,
    setFlippedCards,
    setMatchedCards,
    setMoves,
    setScore,
    setIsLocked,
  } = useGameState();

  const initializeGame = () => {
    // ① 洗牌
    const shuffled = shuffleArray([...cardValues]);

    // ② 创建卡片对象
    const finalCards = createCardList(shuffled);

    // ③ 重置全部状态
    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  return initializeGame;
};