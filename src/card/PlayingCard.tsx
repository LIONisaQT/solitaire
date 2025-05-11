import React from "react";
import "./PlayingCard.css";
import { getSuitColor, getSuitEmoji, type Card } from "../logic/card";

interface CardProps {
  card: Card;
  origin: Card[];
  onClick: (card: Card, origin: Card[]) => void;
  zIndex?: number;
}

const PlayingCard: React.FC<CardProps> = ({
  card: { rank, suit, isFaceDown },
  origin,
  onClick,
  zIndex,
}) => {
  return (
    <div
      className={`playing-card ${isFaceDown ? "face-down" : "face-up"}`}
      style={{ zIndex: zIndex ?? 0 }}
      onClick={() => {
        onClick({ rank, suit, isFaceDown }, origin);
      }}
    >
      {!isFaceDown && (
        <div className="card-inner" style={{ color: getSuitColor(suit) }}>
          <div className="card-rank">{rank[0]}</div>
          <div className="card-suit">{getSuitEmoji(suit)}</div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
