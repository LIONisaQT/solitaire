import {
  Card,
  convertSuitToIndex,
  Deck,
  isSameCard,
  isSequentialRank,
  isSimilarSuit,
} from "./card";

type PileLocation =
  | { type: "tableau"; index: number }
  | { type: "waste"; index: 0 }
  | { type: "foundation"; index: number };

interface FlipMove {
  type: "flip";
  fromIndex: number;
  fromPile: Card[];
}

interface TableauMove {
  type: "tableau";
  fromLocation: PileLocation;
  fromPile: Card[];
  toIndex: number;
  toPile: Card[];
}

interface FoundationMove {
  type: "foundation";
  fromLocation: PileLocation;
  fromPile: Card[];
  toIndex: number;
  toPile: Card[];
}

interface StockDrawMove {
  type: "stockDraw";
  stockSnapshot: Card[];
  wasteSnapshot: Card[];
}

interface StockResetMove {
  type: "stockReset";
  stockSnapshot: Card[];
  wasteSnapshot: Card[];
}

type Move =
  | FlipMove
  | TableauMove
  | FoundationMove
  | StockDrawMove
  | StockResetMove;

export class Solitaire {
  public deck: Deck;
  public tableau: Card[][] = [];
  readonly NUM_PILES = 7;

  public stock: Card[] = [];
  public waste: Card[] = [];

  // Spades, Hearts, Diamonds, Clubs
  public foundations: Card[][] = [[], [], [], []];

  private moveHistory: Move[] = [];

  constructor() {
    this.deck = new Deck();
    this.initializeGame();
  }

  private initializeGame() {
    this.deck.shuffle();

    this.tableau = [];
    this.stock = [];
    this.waste = [];
    this.foundations = [[], [], [], []];

    this.moveHistory = [];

    this.initializeTableau();
    this.initializeStock();
  }

  public restartGame() {
    this.deck.restartDeck();
    this.initializeGame();
  }

  private initializeTableau() {
    for (let i = 1; i < this.NUM_PILES + 1; i++) {
      const pile: Card[] = [];
      for (let j = 0; j < i; j++) {
        const card = this.deck.drawCard();
        if (card) {
          card.isFaceDown = j < i - 1;
          pile.push(card);
        } else console.error(`No more cards in deck!`);
      }
      this.tableau.push(pile);
    }
  }

  private initializeStock() {
    this.stock = this.deck.getCards();
  }

  private getPileLocation(pile: Card[]): PileLocation {
    const tableauIndex = this.tableau.findIndex((p) => p === pile);
    if (tableauIndex !== -1) return { type: "tableau", index: tableauIndex };

    if (pile === this.waste) return { type: "waste", index: 0 };

    const foundationIndex = this.foundations.findIndex((p) => p === pile);
    if (foundationIndex !== -1)
      return { type: "foundation", index: foundationIndex };

    throw new Error("Pile not found in game state");
  }

  private restorePile(location: PileLocation, pile: Card[]) {
    switch (location.type) {
      case "tableau":
        this.tableau[location.index] = pile;
        break;
      case "waste":
        this.waste = pile;
        break;
      case "foundation":
        this.foundations[location.index] = pile;
        break;
    }
  }

  public cardClicked(card: Card, origin: Card[]): string {
    if (card.isFaceDown && isSameCard(card, origin[origin.length - 1])) {
      this.flipTableauCard(card);
      return "flip";
    }

    if (this.doBestFoundationMove(card, origin)) {
      return "foundation";
    }

    if (this.doBestTableauMove(card, origin)) {
      return "tableau";
    }

    console.error(`No valid move for ${card.rank} of ${card.suit}`);
    return "nomove";
  }

  private flipTableauCard(card: Card) {
    const tableauIndex = this.tableau.findIndex((pile) =>
      pile.some((c) => isSameCard(c, card)),
    );
    const tableau = this.tableau[tableauIndex];
    const snapshot = [...tableau];

    const newCard = new Card(card.suit, card.rank, !card.isFaceDown);
    this.tableau[tableauIndex] = [...tableau.slice(0, -1), newCard];

    this.moveHistory.push({
      type: "flip",
      fromIndex: tableauIndex,
      fromPile: snapshot,
    });
  }

  private doBestFoundationMove(card: Card, origin: Card[]): boolean {
    if (!isSameCard(card, origin[origin.length - 1])) return false;

    const foundationIndex = convertSuitToIndex(card);
    const foundation = this.foundations[foundationIndex];
    const topFoundationCard = foundation[foundation.length - 1];

    const canMove = !topFoundationCard
      ? card.rank === "Ace"
      : isSequentialRank(card, topFoundationCard);

    if (canMove) {
      const fromLocation = this.getPileLocation(origin);
      const originSnapshot = [...origin];
      const foundationSnapshot = [...foundation];

      foundation.push(origin.pop()!);

      this.moveHistory.push({
        type: "foundation",
        fromLocation,
        fromPile: originSnapshot,
        toIndex: foundationIndex,
        toPile: foundationSnapshot,
      });
      return true;
    }

    return false;
  }

  private doBestTableauMove(card: Card, origin: Card[]): boolean {
    let bestTableauIndex = -1;

    switch (card.rank) {
      case "King":
        bestTableauIndex = this.getBestEmptyTableau();
        break;
      default:
        bestTableauIndex = this.getBestTableauWithCards(card);
        break;
    }

    if (bestTableauIndex !== -1) {
      const fromLocation = this.getPileLocation(origin);
      const originSnapshot = [...origin];
      const targetSnapshot = [...this.tableau[bestTableauIndex]];

      const cardIndex = origin.findIndex((c) => isSameCard(c, card));
      this.tableau[bestTableauIndex] = this.tableau[bestTableauIndex].concat(
        origin.splice(cardIndex),
      );

      this.moveHistory.push({
        type: "tableau",
        fromLocation,
        fromPile: originSnapshot,
        toIndex: bestTableauIndex,
        toPile: targetSnapshot,
      });
      return true;
    }

    return false;
  }

  private getBestTableauWithCards(card: Card): number {
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

    return bestTableauIndex;
  }

  private getBestEmptyTableau(): number {
    return this.tableau.findIndex((pile) => pile.length === 0);
  }

  public stockClicked() {
    if (this.stock.length === 0 && this.waste.length === 0) {
      console.error(`No more cards in stock or waste!`);
      return;
    }

    const stockSnapshot = [...this.stock];
    const wasteSnapshot = [...this.waste];

    if (this.stock.length === 0 && this.waste.length > 0) {
      this.stock = [...this.waste].reverse();
      this.waste = [];
      this.moveHistory.push({
        type: "stockReset",
        stockSnapshot,
        wasteSnapshot,
      });
      return;
    }

    const drawnCard = this.stock.pop()!;
    drawnCard.isFaceDown = false;
    this.waste.push(drawnCard);
    this.moveHistory.push({ type: "stockDraw", stockSnapshot, wasteSnapshot });
  }

  public undoClicked = (): void => {
    const move = this.moveHistory.pop();
    if (!move) return;

    switch (move.type) {
      case "flip":
        this.tableau[move.fromIndex] = move.fromPile;
        break;
      case "tableau":
        this.restorePile(move.fromLocation, move.fromPile);
        this.tableau[move.toIndex] = move.toPile;
        break;
      case "foundation":
        this.restorePile(move.fromLocation, move.fromPile);
        this.foundations[move.toIndex] = move.toPile;
        break;
      case "stockDraw":
      case "stockReset":
        this.stock = move.stockSnapshot;
        this.waste = move.wasteSnapshot;
        break;
    }
  };
}
