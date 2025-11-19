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

export const useCardClickLogic = (state) => {
  const {
    cards, setCards,
    flippedCards, setFlippedCards,
    /*matchedCards,*/ setMatchedCards,
    /*score,*/ setScore,
    /*moves,*/ setMoves,
    isLocked, setIsLocked,
  } = state;


  const handleCardClick = (card) => {
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

    const firstCard = cards[newFlipped[0]];

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
          prev.map((c) => {
            if (c.id === firstCard.id || c.id === card.id) {
              return { ...c, isMatched: true };
            }
            return c;
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
        const flippedBackCards = newCards.map((c) => {
          if (newFlipped.includes(c.id)) {
            return { ...c, isFlipped: false };
          }
          return c;
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