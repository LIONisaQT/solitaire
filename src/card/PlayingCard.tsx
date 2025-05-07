import React, { useState } from "react";
import "./PlayingCard.css";

interface CardProps {
  rank: React.ReactNode;
  suit: React.ReactNode;
}

const PlayingCard: React.FC<CardProps> = ({ rank, suit }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={`playingCard ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      <div className="cardInner">
        <div className="cardRank">{rank}</div>
        <div className="cardSuit">{suit}</div>
      </div>
    </div>
  );
};

export default PlayingCard;
