import type React from "react";
import PlayingCard from "../card/PlayingCard";
import type { Card } from "../card/card";

interface TableauPileProps {
  cards: Card[];
}

const TableauPile: React.FC<TableauPileProps> = ({ cards }) => {
  return (
    <div className="tableau-pile">
      {cards.map((card) => (
        <PlayingCard rank={card.rank} suit={card.suit} isFlipped={true} />
      ))}
    </div>
  );
};

export default TableauPile;
