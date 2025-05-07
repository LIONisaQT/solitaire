export class Card {
  public suit: string;
  public rank: string;

  constructor(suit: string, rank: string) {
    this.suit = suit;
    this.rank = rank;
  }
}

export class Deck {
  private suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  private ranks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  private cards: Card[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck() {
    for (const suit of this.suits) {
      for (const rank of this.ranks) {
        this.cards.push(new Card(suit, rank));
      }
    }
  }

  public shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public drawCard(): Card | undefined {
    return this.cards.pop();
  }

  public getCards(): Card[] {
    return this.cards;
  }
}
