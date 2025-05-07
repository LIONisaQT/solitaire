import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Card, Deck } from "./card/card";
import TableauPile from "./tableau/TableauPile";

const NUM_PILES = 7;

function App() {
  const [deck, setDeck] = useState(new Deck());
  const [tableau, setTableau] = useState<Card[][]>();

  const shuffleDeck = useCallback(() => {
    deck.shuffle();
    setDeck(deck);
    console.log("Deck shuffled:", deck.getCards());
  }, [deck]);

  const createTableau = useCallback(() => {
    const tableauPiles: Card[][] = [];
    for (let i = 1; i < NUM_PILES + 1; i++) {
      const pile: Card[] = [];
      for (let j = 0; j < i; j++) {
        const card = deck.drawCard();
        if (card) pile.push(card);
        else console.error(`No more cards in deck!`);
      }
      tableauPiles.push(pile);
    }
    setTableau(tableauPiles);
  }, [deck]);

  const reset = useCallback(() => {
    shuffleDeck();
    createTableau();
  }, [shuffleDeck, createTableau]);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="play-area">
      <div className="top-area">
        <div className="foundations">foundation</div>
        <div className="stock-and-waste">
          <div className="waste">waste</div>
          <div className="stock">stock</div>
        </div>
      </div>
      <div className="tableau">
        {tableau?.map((pile) => (
          <TableauPile cards={pile} />
        ))}
      </div>
    </div>
  );
}

export default App;
