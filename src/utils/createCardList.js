/**
 * 根据打乱后的卡片值生成完整卡片对象：
 * 每张卡都有 id / value / isFlipped / isMatched
 */
export const createCardList = (shuffledValues) => {
  return shuffledValues.map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false,
  }));
};