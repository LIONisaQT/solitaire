import type React from "react";
import PlayingCard from "../card/PlayingCard";
import type { Card } from "../card/card";
import "./TableauPile.css";

interface TableauPileProps {
  cards: Card[];
}

const TableauPile: React.FC<TableauPileProps> = ({ cards }) => {
  return (
    <div className="tableau-pile">
      {cards.map((card, index) => (
        <PlayingCard
          key={`${card.rank}-${card.suit}`}
          rank={card.rank}
          suit={card.suit}
          isFlipped={index !== cards.length - 1}
        />
      ))}
    </div>
  );
};

export default TableauPile;
