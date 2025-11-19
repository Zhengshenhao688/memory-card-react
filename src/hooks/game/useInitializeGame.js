import { shuffleArray } from "../../utils/shuffle";
import { createCardList } from "../../utils/createCardList";

/**
 * 负责初始化 / 重置整局游戏的逻辑。
 * 会被 useGameLogic 调用，用来生成一套完整的新卡片、并重置所有状态。
 *
 * @param {Array} cardValues - 卡片的 value 列表（如 [1,1,2,2,3,3]）
 * @param {Object} state - 从 useGameState 传入的所有状态与 setter
 */
export const useInitializeGame = (cardValues, state) => {
  const {
    setCards,
    setFlippedCards,
    setMatchedCards,
    setMoves,
    setScore,
    setIsLocked,
  } = state;

  /**
   * 初始化游戏：
   * 1. 洗牌 cardValues
   * 2. 创建最终的卡片对象列表（含 id、value、isFlipped、isMatched）
   * 3. 重置所有游戏状态（分数、步数、锁定、翻开列表等）
   */
  const initializeGame = () => {
    // ① 洗牌
    const shuffled = shuffleArray(cardValues);

    // ② 生成最终卡片结构
    const finalCards = createCardList(shuffled);

    // ③ 设置初始状态
    setCards(finalCards);
    setIsLocked(false);
    setMoves(0);
    setScore(0);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  return initializeGame;
};