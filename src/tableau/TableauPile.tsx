import type React from "react";
import PlayingCard from "../card/PlayingCard";
import type { Card } from "../card/card";
import "./TableauPile.css";

interface TableauPileProps {
  cards: Card[];
  onClick: (card: Card, isFaceDown: boolean, origin: Card[]) => void;
}

const TableauPile: React.FC<TableauPileProps> = ({ cards, onClick }) => {
  return (
    <div className="tableau-pile">
      {cards.length === 0 && (
        <div className="empty-pile">
          <p>Empty pile</p>
        </div>
      )}
      {cards.map((card, index) => (
        <PlayingCard
          key={`${card.rank}-${card.suit}`}
          rank={card.rank}
          suit={card.suit}
          isFaceDown={index !== cards.length - 1}
          origin={cards}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default TableauPile;
