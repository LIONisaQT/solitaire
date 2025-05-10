import {
  Card,
  convertSuitToIndex,
  Deck,
  isSequentialRank,
  isSimilarSuit,
} from "./card";

export class Solitaire {
  public deck: Deck;
  public tableau: Card[][] = [];
  readonly NUM_PILES = 7;

  public stock: Card[] = [];
  public waste: Card[] = [];

  // Spades, Hearts, Diamonds, Clubs
  public foundations: Card[][] = [[], [], [], []];

  constructor() {
    this.deck = new Deck();
    this.deck.shuffle();

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

    let moveMade = false;
    moveMade = this.doBestFoundationMove(card, origin);

    if (!moveMade) {
      moveMade = this.doBestTableauMove(card, origin);
    }

    if (!moveMade) {
      console.error(`No valid move for card ${card}`);
    }
  }

  private doBestFoundationMove(card: Card, origin: Card[]): boolean {
    const foundationIndex = convertSuitToIndex(card);
    const foundation = this.foundations[foundationIndex];
    const topFoundationCard = foundation[foundation.length - 1];

    if (!topFoundationCard) {
      if (card.rank === "Ace") {
        foundation.push(origin.pop()!);
        return true;
      }
    } else {
      if (isSequentialRank(card, topFoundationCard)) {
        foundation.push(origin.pop()!);
        return true;
      }
    }

    return false;
  }

  private doBestTableauMove(card: Card, origin: Card[]): boolean {
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
      return true;
    }

    return false;
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

    const drawnCard = this.stock.pop();
    drawnCard!.isFaceDown = false;
    this.waste.push(drawnCard!);
  }
}
