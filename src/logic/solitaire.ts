import { Card, Deck, isSequentialRank, isSimilarSuit } from "./card";

export class Solitaire {
  public deck: Deck;
  public tableau: Card[][];
  readonly NUM_PILES = 7;

  public stock: Card[];
  public waste: Card[];

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();

    this.tableau = [];

    this.stock = [];
    this.waste = [];

    this.initializeTableau();
    this.initializeStock();
  }

  private initializeTableau() {
    for (let i = 1; i < this.NUM_PILES + 1; i++) {
      const pile: Card[] = [];
      for (let j = 0; j < i; j++) {
        const card = this.deck.drawCard();
        if (card) {
          card.isFaceDown = j < i - 1; // Only the last card is face up
          pile.push(card);
        } else console.error(`No more cards in deck!`);
      }
      this.tableau.push(pile);
    }
  }

  private initializeStock() {
    this.stock = this.deck.getCards();
  }

  public cardClicked(card: Card, origin: Card[]) {
    if (card.isFaceDown) return;

    let bestTableauIndex = -1;
    this.tableau.forEach((pile, index) => {
      const topCard = pile[pile.length - 1];
      if (
        topCard &&
        !isSimilarSuit(card, topCard) &&
        isSequentialRank(topCard, card)
      ) {
        bestTableauIndex = index;
      }
    });

    if (bestTableauIndex !== -1) {
      this.tableau[bestTableauIndex].push(origin.pop()!);
    }
  }

  public stockClicked() {
    if (this.stock.length === 0 && this.waste.length === 0) {
      console.error(`No more cards in stock or waste!`);
      return;
    }

    if (this.stock.length === 0 && this.waste.length > 0) {
      this.stock = this.waste.reverse();
      this.waste = [];
      return;
    }

    if (this.waste.length > 0) {
      this.waste[this.waste.length - 1].isFaceDown = true;
    }

    const drawnCard = this.stock.pop();
    drawnCard!.isFaceDown = false;
    this.waste.push(drawnCard!);
  }
}
