(function() {
let cards = [].slice.call(document.getElementsByClassName("card"));
const deck = document.getElementsByClassName("deck")[0];
let numberOfMoves = 0;
let totalMovesDOM = document.getElementsByClassName("moves")[0]
let totalMoves = Number(document.getElementsByClassName("moves")[0].textContent);
let openCards = [];

document.body.onload = loadGame();

function loadGame() {
    cards = shuffle(cards);
    numberOfMoves = 0;
    deck.innerHTML = "";
    cards.map((card, i) => {
        deck.appendChild(card)
        cards[i].classList.remove("show", "open", "match", "disabled");
    })
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
    let card
    let cardClass
    switch (e.target.nodeName) {
        case 'LI':// li itself
            card = e.target
            cardClass = e.target.firstElementChild.classList.value
            break;
        case 'I':// icon itself
            card = e.target.parentElement
            cardClass = e.target.classList.value
            break;
    }
    if (card.getAttribute("disabled") === "true") {
        return e.preventDefault();
    }
    addCardToOpenCards(cardClass, card);
    if (numberOfMoves === 2) {
        compareCardsInOpenCards();
    }
}

function addCardToOpenCards (cardClass, card) {
    toggleCard(card)
    cardOpen(cardClass)
}

function matchedCard (card) {
    card.classList.toggle("match")
}

// function toggleCard which toggles the open and show class of the card
function toggleCard(card) {
    card.classList.toggle("open")
    card.classList.toggle("show")
    card.setAttribute("disabled", true)
}

// function cardOpen which increments the counter and maintains the stack of opened card
function cardOpen(cardClass) {
    incrementCounter()
    contained(cardClass) ? openCards.push(cardClass) : null
}

function incrementCounter() {
    numberOfMoves++
    totalMoves++
    totalMovesDOM.innerHTML = totalMoves
}

function compareCardsInOpenCards () {
    if (openCards.length === 1) {
        console.log("matched!")
        lockMatchedCards()
    } else {
        console.log("no match.")
        closeAllCards()
    }
    resetNumberOfMoves()
    resetOpenCards()
}

function lockMatchedCards() {
    cards.map((item) => {
        if (item.classList.contains("show")) {
            item.classList.add("match")
        }
    })
}

// this will be true if it exists in openCards array
const contained = (c) => openCards.indexOf(c) === -1

const closeAllCards = () => {
    setTimeout(() => {
        cards.forEach((card) => {
            if (card.classList.value.indexOf("match") === -1) {
                card.classList = "card"
                card.removeAttribute("disabled")
            }
        })
    }, 400)
}

const resetNumberOfMoves = () => numberOfMoves = 0
const resetOpenCards = () => openCards = []

})()
