class Card {
  constructor(suit, rank, score) {
    this.suit = suit
    this.rank = rank
    this.score = score
  }
}

class Deck {
  constructor() {
    this.cards = []
    this.createDeck()
  }
  createDeck() {
    let suits = ["Heart", "Spade", "Club", "Diamond"];
    let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], j + 2))
      }
    }
    return this.cards;
  }
  shuffle() {
    let currentIndex = this.cards.length, randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex], this.cards[currentIndex]];
    }
    return this.cards;
  }
}

class GameOfWar {
  constructor() {
    this.playerOne = []
    this.playerTwo = []
    this.drawnPile = []
    this.round = 0
  }
  gameSetup() {
    const deck = new Deck()
    let playDeck = deck
    playDeck.shuffle() //shuffles gameplay deck
    //split deck into two
    this.playerOne.push(...playDeck.cards.splice(0, playDeck.cards.length / 2))
    this.playerTwo.push(...playDeck.cards.splice(0, playDeck.cards.length))
  }
  war() {
    this.round++
    console.log(`Round: ${this.round }\n WAR!`)
    console.log(`Player One's hand: ${this.drawnPile[0].rank} of ${this.drawnPile[0].suit}\n Player Two's hand: ${this.drawnPile[1].rank} of ${this.drawnPile[1].suit}`)
    let playerOneWar = (this.playerOne.splice(0,4))
    console.log(`Player One war hand:`)
    console.log(playerOneWar)
    let playerTwoWar = (this.playerTwo.splice(0,4))
    console.log(`Player Two war hand:`)
    console.log(playerTwoWar)
    this.drawnPile.push(...playerOneWar)
    this.drawnPile.push(...playerTwoWar)
    if (this.drawnPile[this.drawnPile.length - 5].score > this.drawnPile[this.drawnPile.length - 1].score) {    
      console.log(`Round: ${this.round}\n Player One's hand: ${this.drawnPile[this.drawnPile.length - 5].rank} of ${this.drawnPile[this.drawnPile.length - 5].suit}player has ${this.playerOne.length} cards left\n Player Two's hand: ${this.drawnPile[this.drawnPile.length - 1].rank} of ${this.drawnPile[this.drawnPile.length - 1].suit} player has ${this.playerTwo.length} cards left\n Player ONE WINS WAR!`)
      this.playerOne.push(...this.drawnPile)
      this.drawnPile = [];
    } else if (this.drawnPile[this.drawnPile.length - 5].score < this.drawnPile[this.drawnPile.length - 1].score) {  
      console.log(`Round: ${this.round}\n Player One's hand: ${this.drawnPile[this.drawnPile.length - 5].rank} of ${this.drawnPile[this.drawnPile.length - 5].suit}player has ${this.playerOne.length} cards left\n Player Two's hand: ${this.drawnPile[this.drawnPile.length - 1].rank} of ${this.drawnPile[this.drawnPile.length - 1].suit} player has ${this.playerTwo.length} cards left\n Player TWO WINS WAR!`)
      this.playerTwo.push(...this.drawnPile)
      this.drawnPile = [];
    } else {
      this.war();
    }
  }

  gamePlay() {
    console.log(`Game Start!\n Player One has ${this.playerOne.length} cards\n Player Two has ${this.playerTwo.length} cards`)
    while (this.playerOne.length !== 0 && this.playerTwo.length !== 0) {
      this.drawnPile.push(this.playerOne.pop())
      this.drawnPile.push(this.playerTwo.pop())
      if (this.drawnPile[0].score === this.drawnPile[1].score) {
        this.war();
      }
      else if (this.drawnPile[0].score > this.drawnPile[1].score) {
        this.round++
        console.log(`Round: ${this.round}\n Player One's hand: ${this.drawnPile[0].rank} of ${this.drawnPile[0].suit} player has ${this.playerOne.length} cards left\n Player Two's hand: ${this.drawnPile[1].rank} of ${this.drawnPile[1].suit} player has ${this.playerTwo.length} cards left\n Player One wins`)
        this.playerOne.push(...this.drawnPile)
        this.drawnPile = [];
      }
      else if (this.drawnPile[0].score < this.drawnPile[1].score) {
        this.round++
        console.log(`Round: ${this.round}\n Player One's hand: ${this.drawnPile[0].rank} of ${this.drawnPile[0].suit} player has ${this.playerOne.length} cards left\n Player Two's hand: ${this.drawnPile[1].rank} of ${this.drawnPile[1].suit} player has ${this.playerTwo.length} cards left\n Player Two wins`)
      this.playerTwo.push(...this.drawnPile)
      this.drawnPile = [];
    }
  }
  if(this.playerOne.length === 52) {
  console.log(`Player One is the ULTIMATE winner with ${this.playerOne.length} cards on round ${this.round} `)
} 
        else if (this.playerTwo.length === 52) {
  console.log(`Player Two is the ULTIMATE winner with ${this.playerTwo.length} cards on round ${this.round}`)
} 
      } 
}
let gameOne = new GameOfWar()
gameOne.gameSetup()
gameOne.gamePlay()