
class Card {
    constructor(cardElement, cardValue, backFace) {
      this.cardElement = cardElement;
      this.cardValue = cardValue;
      this.backFace = backFace;
      this.isFlipped = false;
    }
  
    flip() {
      if (this.isFlipped) return;
      this.cardElement.classList.add("flip");
      this.isFlipped = true;
      this.cardElement.querySelector(".front").style.display = "none";
      this.cardElement.querySelector(".back").style.display = "block";
    }
  
    unflip() {
      if (!this.isFlipped) return;
      this.cardElement.classList.remove("flip");
      this.isFlipped = false;
      this.cardElement.querySelector(".front").style.display = "block";
      this.cardElement.querySelector(".back").style.display = "none";
    }
  
    remove() {
      this.cardElement.classList.add("removed");
    }
  }
  
  
  class Game {
    constructor(gameElement, cards) {
      this.gameElement = gameElement;
      this.cards = cards;
      this.flippedCards = [];
      this.matches = 0;
      this.isDisabled = false;
      this.shuffleCards();
      this.renderCards();
      
    }
  
    shuffleCards() {
      for (let i = this.cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
      }
    }
  
    renderCards() {
      this.cards.forEach((card) => {
        this.gameElement.appendChild(card.cardElement);
        card.cardElement.addEventListener("click", () => {
          if (this.isDisabled || card.isFlipped || this.flippedCards.length === 2) return;
          card.flip();
          this.flippedCards.push(card);
          if (this.flippedCards.length === 2) {
            this.checkForMatch();
          }
        });
      });
    }
  
    checkForMatch() {
      const [card1, card2] = this.flippedCards;
      this.isDisabled = true;
      setTimeout(() => {
        if (card1.cardValue === card2.cardValue) {
          card1.remove();
          card2.remove();
          this.matches++;
          if (this.matches === this.cards.length / 2) {
            alert("Cestitamo, pobijedili ste!");
          }
        } else {
          card1.unflip();
          card2.unflip();
        }
        this.flippedCards = [];
        this.isDisabled = false;
      }, 1000);
    }

    resetGame() {
        this.cards.forEach((card) => {
          card.reset();
        });
        this.matches = 0;
        this.flippedCards = [];
        this.isDisabled = false;
        this.shuffleCards();
      }
  }
  
  
  const gameElement = document.querySelector(".game");
  const cardElements = document.querySelectorAll(".card");
  const cards = [];
  
  cardElements.forEach((cardElement) => {
    const cardValue = cardElement.getAttribute("data-card-value");
    const backFace = cardElement.querySelector(".back img").getAttribute("src");
    const card = new Card(cardElement, cardValue, backFace);
    cards.push(card);
  });
  
  const game = new Game(gameElement, cards);
  

  function reload(){
    window.location.reload();
  }