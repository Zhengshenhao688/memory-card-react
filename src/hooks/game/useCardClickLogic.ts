import type { CardType } from "../../types/card";
import { useGameState } from "../../store/gameState";

export const useCardClickLogic = () => {
  const {
    cards,
    setCards,
    flippedCards,
    setFlippedCards,
    matchedCards,
    setMatchedCards,
    score,
    setScore,
    moves,
    setMoves,
    isLocked,
    setIsLocked,
  } = useGameState();

  const handleCardClick = (card: CardType) => {
    // ① 如果牌已经匹配 或 当前被锁住（等待翻回），禁止点
    if (card.isMatched || card.isFlipped || isLocked) return;

    // ② 翻开当前牌
    setFlippedCards([...flippedCards, card.id]);

    // 同步更新卡片为翻开状态
    setCards(
      cards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      )
    );

    // 如果这是第一张牌 → 不需要检查匹配
    if (flippedCards.length === 0) return;

    // ③ 第二张牌 → 锁定，避免用户快速乱点
    setIsLocked(true);

    const firstCardId = flippedCards[0];
    const firstCard = cards.find((c) => c.id === firstCardId)!;
    const secondCard = card;

    // ④ 如果匹配成功
    if (firstCard.value === secondCard.value) {
      setTimeout(() => {
        // 更新匹配的列表
        setMatchedCards([...matchedCards, firstCard.id, secondCard.id]);

        // UI 上标记 matched
        setCards(
          cards.map((c) =>
            c.id === firstCard.id || c.id === secondCard.id
              ? { ...c, isMatched: true }
              : c
          )
        );

        // 分数 +1
        setScore(score + 1);

        // 重置 flippedCards
        setFlippedCards([]);

        // 步数 +1
        setMoves(moves + 1);

        // 解锁
        setIsLocked(false);
      }, 300);

      return;
    }

    // ⑤ 如果配对失败 → 翻回两张牌
    setTimeout(() => {
      // 翻回 UI
      setCards(
        cards.map((c) =>
          c.id === firstCard.id || c.id === secondCard.id
            ? { ...c, isFlipped: false }
            : c
        )
      );

      // 重置 flippedCards
      setFlippedCards([]);

      // 步数 +1
      setMoves(moves + 1);

      // 解锁
      setIsLocked(false);
    }, 800);
  };

  return handleCardClick;
};