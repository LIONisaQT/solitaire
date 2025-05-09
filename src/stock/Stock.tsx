import { useEffect, useState } from "react";
import type { Card } from "../card/card";
import PlayingCard from "../card/PlayingCard";

interface StockProps {
  cards: Card[];
  stockCardClicked: (card: Card, isFlipped: boolean, origin: Card[]) => void;
}

const Stock: React.FC<StockProps> = ({ cards, stockCardClicked }) => {
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
        origin={stockCards}
        onClick={stockClicked}
      />
      {stockCard && (
        <PlayingCard
          rank={stockCard.rank}
          suit={stockCard.suit}
          isFaceDown={false}
          origin={wasteCards}
          onClick={stockCardClicked}
        />
      )}
    </div>
  );
};

export default Stock;
