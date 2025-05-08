import type React from "react";
import PlayingCard from "../card/PlayingCard";
import type { Card } from "../card/card";
import "./TableauPile.css";

interface TableauPileProps {
  cards: Card[];
}

const TableauPile: React.FC<TableauPileProps> = ({ cards }) => {
  const onClick = (card: Card, isFaceDown: boolean) => {
    if (isFaceDown) return;

    console.log(card.rank, card.suit, isFaceDown);
  };

  return (
    <div className="tableau-pile">
      {cards.map((card, index) => (
        <PlayingCard
          key={`${card.rank}-${card.suit}`}
          rank={card.rank}
          suit={card.suit}
          isFaceDown={index !== cards.length - 1}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default TableauPile;
