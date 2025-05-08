import { useEffect, useState } from "react";
import type { Card, Deck } from "../card/card";
import PlayingCard from "../card/PlayingCard";

interface StockProps {
  cards: Card[];
}

const Stock: React.FC<StockProps> = ({ cards }) => {
  const [stockCard, setStockCard] = useState<Card | null>(null);
  const [stockCards, setStockCards] = useState<Card[]>([]);
  const [wasteCards, setWasteCards] = useState<Card[]>([]);

  useEffect(() => {
    setStockCards(cards);
  }, [cards]);

  const stockClicked = () => {
    if (stockCards.length === 0 && wasteCards.length === 0) {
      console.log("No more cards in stock or waste");
      return;
    }

    if (stockCards.length === 0 && wasteCards.length > 0) {
      setStockCards(wasteCards.reverse());
      setWasteCards([]);
      setStockCard(null);
      return;
    }

    const drawnCard = stockCards.pop();
    setStockCard(drawnCard!);
    setWasteCards([...wasteCards, drawnCard!]);
  };

  return (
    <div>
      <p>{stockCards.length}</p>
      <PlayingCard
        rank="stock"
        suit="stock"
        isFaceDown={true}
        onClick={stockClicked}
      />
      {stockCard && (
        <PlayingCard
          rank={stockCard.rank}
          suit={stockCard.suit}
          isFaceDown={false}
          onClick={() => {}}
        />
      )}
    </div>
  );
};

export default Stock;
