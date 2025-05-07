import React, { useState } from "react";
import "./PlayingCard.css";

interface CardProps {
  rank: React.ReactNode;
  suit: React.ReactNode;
  isFlipped: boolean;
}

const PlayingCard: React.FC<CardProps> = ({ rank, suit, isFlipped }) => {
  const [flipped, setFlipped] = useState(isFlipped);

  const handleFlip = () => {
    setFlipped(!flipped);
    console.log(rank, suit);
  };

  return (
    <div
      className={`playing-card ${flipped ? "flipped" : ""}`}
      onClick={handleFlip}
    >
      {!flipped && (
        <div className="card-inner">
          <div className="card-rank">{rank}</div>
          <div className="card-suit">{suit}</div>
        </div>
      )}
    </div>
  );
};

export default PlayingCard;
