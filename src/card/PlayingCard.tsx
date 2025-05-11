import React, { useState } from "react";
import "./PlayingCard.css";
import {
  getRankAsString,
  getSuitColor,
  getSuitEmoji,
  type Card,
} from "../logic/card";

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
  const [animationActive, setAnimationActive] = useState(false);

  const onAnimationEnd = () => {
    setAnimationActive(false);
  };

  const handleClick = () => {
    setAnimationActive(true);
    onClick({ rank, suit, isFaceDown }, origin);
  };

  return (
    <div
      className={`playing-card ${isFaceDown ? "face-down" : "face-up"} ${
        animationActive ? "animate" : ""
      }`}
      onAnimationEnd={onAnimationEnd}
      style={{ zIndex: zIndex ?? 0 }}
      onClick={handleClick}
    >
      {!isFaceDown && (
        <div className="card-inner" style={{ color: getSuitColor(suit) }}>
          <div className="card-rank">{getRankAsString(rank)}</div>
          <div className="card-suit">{getSuitEmoji(suit)}</div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
