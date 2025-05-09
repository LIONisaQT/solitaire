import React from "react";
import "./PlayingCard.css";
import type { Card } from "../logic/card";

interface CardProps {
  card: Card;
  origin: Card[];
  onClick: (card: Card, origin: Card[]) => void;
}

const PlayingCard: React.FC<CardProps> = ({
  card: { rank, suit, isFaceDown },
  origin,
  onClick,
}) => {
  return (
    <div
      className={`playing-card ${isFaceDown ? "flipped" : ""}`}
      onClick={() => {
        onClick({ rank, suit, isFaceDown }, origin);
      }}
    >
      {!isFaceDown && (
        <div className="card-inner">
          <div className="card-rank">{rank}</div>
          <div className="card-suit">{suit}</div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
