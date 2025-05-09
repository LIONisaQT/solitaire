import React from "react";
import "./PlayingCard.css";
import type { Card } from "./card";

interface CardProps {
  rank: string;
  suit: string;
  isFaceDown: boolean;
  origin: Card[];
  onClick: (card: Card, isFacedown: boolean, origin: Card[]) => void;
}

const PlayingCard: React.FC<CardProps> = ({
  rank,
  suit,
  isFaceDown,
  origin,
  onClick,
}) => {
  return (
    <div
      className={`playing-card ${isFaceDown ? "flipped" : ""}`}
      onClick={() => {
        onClick({ rank, suit }, isFaceDown, origin);
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
