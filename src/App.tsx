import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./logic/card";
import TableauPile from "./tableau/TableauPile";
import Stock from "./stock/Stock";
import { Solitaire } from "./logic/solitaire";

function App() {
  const [game, setGame] = useState<Solitaire>();
  const [, setTableau] = useState<Card[][]>([]);
  const [, setStock] = useState<Card[]>([]);
  const [, setWaste] = useState<Card[]>([]);

  useEffect(() => {
    setGame(new Solitaire());
  }, []);

  const tableauCardClicked = (card: Card, origin: Card[]) => {
    if (!game) return;

    game.cardClicked(card, origin);
    setTableau([...game.tableau]);
  };

  const stockClicked = () => {
    if (!game) return;

    game.stockClicked();
    setStock([...game.stock]);
  };

  const wasteClicked = (card: Card, origin: Card[]) => {
    if (!game) return;

    game.cardClicked(card, origin);
    setWaste([...game.waste]);
  };

  return (
    <div className="play-area">
      <div className="top-area">
        <div className="foundations">foundation</div>
        <div className="stock-and-waste">
          <div className="waste">waste</div>
          <div className="stock">
            <Stock
              game={game}
              stockClicked={stockClicked}
              wasteClicked={wasteClicked}
            />
          </div>
        </div>
      </div>
      <div className="tableau">
        {game?.tableau.map((pile, index) => (
          <TableauPile
            key={`tableau-${index}`}
            cards={pile}
            onClick={tableauCardClicked}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
