let front = 'card_front';
let back = 'card_back';




startGame();

function startGame() {
  startCards(game.createCardsFromTechs()) //function que pega o modelo das cartas e transforma em algo visual

}


function startCards(cards) {
  let gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = '';

  game.cards.forEach(card => {
    let cardElement = document.createElement('div') //isso add o elemento em cada carta
    cardElement.id = card.id;

    cardElement.classList.add('card'); //isso add a classe em cada elemento da carta
    cardElement.dataset.icon = card.icon;//p verificar se duas cartas sao iguais é necessario comparar os icons
    console.log(cardElement)
    createCardContent(card, cardElement);
    cardElement.addEventListener('click', flipCard);
    gameBoard.appendChild(cardElement);
  })
}

function createCardContent(card, cardElement) { //function qe cria o front e o back
  createCardFace(front, card, cardElement);
  createCardFace(back, card, cardElement);
}

function createCardFace(face, card, element) {
  let cardElementFace = document.createElement('div');
  cardElementFace.classList.add(face);
  if (face === front) {
    let iconElement = document.createElement('img');
    iconElement.classList.add('icon');
    iconElement.src = "./imagens/" + card.icon + ".png"
    cardElementFace.appendChild(iconElement);

  } else {
    cardElementFace.innerHTML = "?"
  }
  element.appendChild(cardElementFace);
}




function flipCard() {
  if (game.setCard(this.id)) {

    this.classList.add("flip");

    if (game.secondCard) {
       console.log('check', game.checkMatch())
      if (game.checkMatch()) {
        game.clearCards();
        if(game.checkGamOver()){
          let gameOverlay = document.getElementById("gameOver");
          gameOverlay.style.display = 'flex';
        }

      } else {
        setTimeout(() => {
          let firstCardView = document.getElementById(game.firstCard.id);
          let secondCardView = document.getElementById(game.secondCard.id);
          firstCardView.classList.remove('flip');
          secondCardView.classList.remove('flip');
          game.unflippedCards();
        }, 1000)

      }
    }
  }
}
function restart() {
  game.clearCards();
  startGame()
  let gameOverlay = document.getElementById("gameOver");
  gameOverlay.style.display = 'none';
}

