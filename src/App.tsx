import { useEffect, useState } from "react";
import "./App.css";
import { Card, Deck } from "./card/card";
import TableauPile from "./tableau/TableauPile";
import Stock from "./stock/Stock";

const NUM_PILES = 7;

function App() {
  const [deck, setDeck] = useState<Deck>();
  const [tableau, setTableau] = useState<Card[][]>();

  useEffect(() => {
    const newDeck = new Deck();
    newDeck.shuffle();
    setDeck(newDeck);
  }, []);

  useEffect(() => {
    if (!deck) return;

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

  return (
    <div className="play-area">
      <div className="top-area">
        <div className="foundations">foundation</div>
        <div className="stock-and-waste">
          <div className="waste">waste</div>
          <div className="stock">
            <Stock cards={deck?.getCards() || []} />
          </div>
        </div>
      </div>
      <div className="tableau">
        {tableau?.map((pile, index) => (
          <TableauPile key={`tableau-${index}`} cards={pile} />
        ))}
      </div>
    </div>
  );
}

export default App;
