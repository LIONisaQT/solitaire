import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Card, Deck } from "./card/card";
import PlayingCard from "./card/PlayingCard";

function App() {
  const [deck, setDeck] = useState(new Deck());
  const [currentCard, setCurrentCard] = useState<Card>();

  const reset = useCallback(() => {
    deck.shuffle();
    setDeck(deck);
    console.log("Deck shuffled:", deck.getCards());
    setCurrentCard(deck.drawCard());
  }, [deck]);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="playArea">
      <div className="topArea">
        <div className="foundations">foundation</div>
        <div className="stockAndWaste">
          <div className="waste">waste</div>
          <div className="stock">stock</div>
        </div>
      </div>
      <div className="tableau">
        <PlayingCard rank={currentCard?.rank} suit={currentCard?.suit} />
      </div>
    </div>
  );
}

export default App;
