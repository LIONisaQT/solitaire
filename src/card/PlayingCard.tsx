import React, { useState } from "react";
import "./PlayingCard.css";

interface CardProps {
  front: React.ReactNode;
  back: React.ReactNode;
}

const PlayingCard: React.FC<CardProps> = ({ front, back }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`card ${isFlipped ? "flipped" : ""}`} onClick={handleFlip}>
      <div className="card-inner">
        <div className="card-front">{front}</div>
        <div className="card-back">{back}</div>
      </div>
    </div>
  );
};

export default PlayingCard;
