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
      className={`playing-card ${isFlipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      {!isFlipped && (
        <div className="card-inner">
          <div className="card-rank">{rank}</div>
          <div className="card-suit">{suit}</div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
