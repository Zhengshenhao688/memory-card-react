import { useEffect } from "react";
import { useGameState } from "./game/useGameState";
import { useInitializeGame } from "./game/useInitializeGame";
import { useCardClickLogic } from "./game/useCardClickLogic";

/**
 * useGameLogic：游戏核心控制器
 * 负责整合：
 *  - useGameState（所有状态）
 *  - useInitializeGame（初始化 / 重置）
 *  - useCardClickLogic（点击逻辑）
 *
 * 最终把 clean 的接口暴露给 App.jsx 使用。
 */
export const useGameLogic = (cardValues) => {
  // ——1. 获取所有游戏状态——
  const state = useGameState();

  // ——2. 初始化逻辑（传入 cardValues 和 state）——
  const initializeGame = useInitializeGame(cardValues, state);

  // ——3. 点击逻辑（传入 state）——
  const handleCardClick = useCardClickLogic(state);

  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ——5. 判断游戏是否结束——
  const isGameComplete =
    state.matchedCards.length === cardValues.length;

  // ——6. 向外暴露的 API（供 App.jsx 使用）——
  return {
    /** 所有卡片的当前状态 */
    cards: state.cards,
    /** 当前得分 */
    score: state.score,
    /** 当前步数 */
    moves: state.moves,
    /** 是否通关 */
    isGameComplete,
    /** 重置 / 开始游戏 */
    initializeGame,
    /** 处理点击事件 */
    handleCardClick,
  };
};