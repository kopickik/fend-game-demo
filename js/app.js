let cards = [].slice.call(document.getElementsByClassName("card"));

const deck = document.getElementsByClassName("deck")[0];

let numberOfMoves = 0;

let openCards = [];

document.body.onload = loadGame();

function loadGame() {
    console.log('loadGame');
    cards = shuffle(cards);

    // Reset the number of moves
    numberOfMoves = 0;

    deck.innerHTML = "";

    for (var i = 0; i < cards.length; i++) {
        [].forEach.call(cards, (card) => {
            deck.appendChild(card)
        })
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
}

// Shuffle function from https://css-tricks.com/snippets/javascript/shuffle-array/ technique #2
function shuffle(array) {
    return array.sort(() => 0.5 - Math.random())
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
for (card of cards) {
    card.addEventListener("click", cardClicked);
}

function cardClicked (e) {
    toggleCard(e.target)
    addCardToOpenCards(e.target)

}

function addCardToOpenCards (card) {
    if (openCards.indexOf(card.firstElementChild.classList.value) !== -1) return;
    openCards.push(card.firstElementChild.classList.value);
    console.log(openCards)
}


// function toggleCard which toggles the open and show class of the card
function toggleCard(card) {
    card.classList.toggle("open")
    card.classList.toggle("show")
};

// function cardOpen which increments the counter and maintains the stack of opened card
function cardOpen() {
    this.open = true;
    // Increment the counter whenever a card is opened
    incrementCounter();
    // add the opened card into the openedCards array
    openCards.push(this);
};

function cardClose() {
    this.open = false;
    this.classList.remove("open").add("")
}

function incrementCounter() {
    numberOfMoves++;
}
