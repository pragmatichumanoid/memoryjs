


let game = {
  techs: ['bootstrap', 'css',
    'electron', 'firebase',
    'html', 'javascript',
    'jquery', 'mongo',
    'node', 'react'],

  cards: null,

  lockMode: false,
  firstCard: null,
  secondCard: null,
  setCard: function (id) {
    let card = this.cards.filter(card => card.id === id)[0];
    if (card.flipped || this.lockMode) {
      return false;
    }
    if (!this.firstCard) {
      this.firstCard = card;
      this.firstCard.flipped = true;
      return true;
    } else {
      this.secondCard = card;
      this.lockMode = true;
      this.secondCard.flipped = true;
      return true;
    }
  },

  checkMatch: function () {
    console.log("oi", this.firstCard)
    console.log("oi", this.secondCard)
    if (!this.firstCard.icon|| !this.secondCard.icon) {
      return false;
    }
    return this.firstCard.icon === this.secondCard.icon;
  },

  clearCards: function () {
    this.firstCard = null;
    this.secondCard = null;
    this.lockMode = false;
  },
  unflippedCards: function(){
    this.firstCard.flipped = false;
    this.secondCard.flipped = false;
    this.clearCards();
  },
  checkGamOver: function () {
    console.log("ei", this.cards.filter(card => !card.flipped).length == 0)
    return this.cards.filter(card => !card.flipped).length == 0 //o filter irá retornar um array e se o tamanho for zero é porque teve game over
   
 
  },

  createCardsFromTechs: function () {
    this.cards = [];

    this.techs.forEach((tech) => {

      this.cards.push(this.createPairsFromTechs(tech)); //coloca cada tech no array cards p cada tech é necessario criar um par, pra isso criamos uma function
    })

    this.cards = this.cards.flatMap(pairs => pairs)//o flatmap é usado para desmembrar o array em 20 elementos, pois o cards retorna 10 pares, e o que queremos é que sejam 20
    this.shuffleCards();
    return this.cards;
  },

  createPairsFromTechs: function (tech) { //essa func retonar um array com o par
    return [{
      id: this.createIdWithTechs(tech), //uma func será criada para gerar um id com valor aleatório que vai ser concatenado com a technologia
      icon: tech,
      flipped: false,  //o flip informa se a carta está virada(true) ou não(false)
    }, {
      id: this.createIdWithTechs(tech), //o id do segundo obj vai ser diferente
      icon: tech,
      flipped: false,
    }]
  },

  createIdWithTechs: function (tech) {
    return tech + parseInt(Math.random() * 1000)
  },
  shuffleCards: function (cards) { //funçao de embaralhar as cartas
    let currIndex = this.cards.length;

    let randomIn = 0; //quando o loop se iniciar, randomIn vai ganhando novos valores

    while (currIndex !== 0) {
      randomIn = Math.floor(Math.random() * currIndex);//isso diz ao js que so podes pegar cartas que ainda nao tenham sido embaralhadas

      currIndex--;

      [this.cards[currIndex], this.cards[randomIn]] = [this.cards[randomIn], this.cards[currIndex]] //no js, se declarado que [a,b] = [b,a] quando a= 20, b= 9, entar b passa a valer 20 e a valer 9, logo isso inverterar os lugares dos cards

    }
  }


}