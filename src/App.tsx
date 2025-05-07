import { useEffect, useState } from "react";
import "./App.css";
import { Deck } from "./card/card";

function App() {
  const [deck, setDeck] = useState(new Deck());

  // Shuffle deck on mount
  useEffect(() => {
    deck.shuffle();
    setDeck(deck);
    console.log("Deck shuffled:", deck.getCards());
  }, [deck]);

  return (
    <div className="playArea">
      <div className="topArea">
        <div className="foundations">foundation</div>
        <div className="stockAndWaste">
          <div className="waste">waste</div>
          <div className="stock">stock</div>
        </div>
      </div>
      <div className="tableau">Tableau</div>
    </div>
  );
}

export default App;
