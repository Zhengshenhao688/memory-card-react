import type { CardType } from "../hooks/game/useGameState";

interface CardProps {
  card: CardType;
  onCardClick: (card: CardType) => void;
}

export const Card = ({ card, onCardClick }: CardProps) => {
  return (
    <div
      className={`card ${card.isFlipped ? "flipped" : ""} ${
        card.isMatched ? "matched" : ""
      }`}
      onClick={() => onCardClick(card)}
    >
      <div className="card-front">?</div>
      <div className="card-back">{card.value}</div>
    </div>
  );
};
