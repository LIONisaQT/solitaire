import React, { useState } from "react";
import "./PlayingCard.css";
import type { Card } from "./card";

interface CardProps {
  rank: string;
  suit: string;
  isFaceDown: boolean;
  onClick: (card: Card, isFlipped: boolean) => void;
}

const PlayingCard: React.FC<CardProps> = ({
  rank,
  suit,
  isFaceDown,
  onClick,
}) => {
  const [faceDown] = useState(isFaceDown);

  return (
    <div
      className={`playing-card ${isFaceDown ? "flipped" : ""}`}
      onClick={() => {
        onClick({ rank, suit }, isFaceDown);
      }}
    >
      {!faceDown && (
        <div className="card-inner">
          <div className="card-rank">{rank}</div>
          <div className="card-suit">{suit}</div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
