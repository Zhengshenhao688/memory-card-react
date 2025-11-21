/**
 * 处理用户点击卡片的逻辑。
 * 负责：
 *  - 翻开卡片
 *  - 判定第一张 / 第二张
 *  - 匹配成功逻辑
 *  - 匹配失败翻回逻辑
 *  - 分数、步数更新
 *  - 锁定点击防止快速触发
 */

import type { CardType } from "../../types/card";

type GameState = {
  cards: CardType[];
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;

  flippedCards: number[];
  setFlippedCards: React.Dispatch<React.SetStateAction<number[]>>;

  setMatchedCards: React.Dispatch<React.SetStateAction<number[]>>;

  setScore: React.Dispatch<React.SetStateAction<number>>;
  setMoves: React.Dispatch<React.SetStateAction<number>>;

  isLocked: boolean;
  setIsLocked: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useCardClickLogic = (state: GameState) => {
  const {
    cards, setCards,
    flippedCards, setFlippedCards,
    /*matchedCards,*/ setMatchedCards,
    /*score,*/ setScore,
    /*moves,*/ setMoves,
    isLocked, setIsLocked,
  } = state;


  const handleCardClick = (card: CardType) => {
    if (
      card.isFlipped ||          
      card.isMatched ||          
      isLocked ||                
      flippedCards.length === 2  
    ) {
      return;
    }

    // ——翻开当前卡片——
    const newCards = cards.map((currentCard) => {
      if (currentCard.id === card.id) {
        return { ...currentCard, isFlipped: true };
      }
      return currentCard;
    });

    setCards(newCards);

    // ——加入 flippedCards 列表——
    const newFlipped = [...flippedCards, card.id];
    setFlippedCards(newFlipped);

    // ——如果这是此次翻开的第一张——
    if (newFlipped.length === 1) {
      return;
    }

    // ——第二张翻开：锁定界面点击——
    setIsLocked(true);

    const firstCard: CardType = cards[newFlipped[0]!]!;

    // ————————————————————————————————————
    // 匹配成功
    // ————————————————————————————————————
    if (firstCard.value === card.value) {
      setTimeout(() => {
        // 添加到 matchedCards
        setMatchedCards((prev) => [...prev, firstCard.id, card.id]);

        setScore((prev) => prev + 1);

        // 标记卡片状态为匹配成功
        setCards((prev) =>
          prev.map((cardItem) => {
            if (cardItem.id === firstCard.id || cardItem.id === card.id) {
              return { ...cardItem, isMatched: true };
            }
            return cardItem;
          })
        );

        setFlippedCards([]);
        setIsLocked(false);
      }, 500);

    } else {
      // ————————————————————————————————————
      // 匹配失败 → 翻回两张卡
      // ————————————————————————————————————
      setTimeout(() => {
        const flippedBackCards = newCards.map((cardItem) => {
          if (newFlipped.includes(cardItem.id)) {
            return { ...cardItem, isFlipped: false };
          }
          return cardItem;
        });

        setCards(flippedBackCards);
        setFlippedCards([]);
        setIsLocked(false);
      }, 1000);
    }

    // ——增加步数（每两张算一步）——
    setMoves((prev) => prev + 1);
  };

  return handleCardClick;
};