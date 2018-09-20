/* global Timer */
// (function () {
let cards = [].slice.call(document.getElementsByClassName("card"));
const deck = document.getElementsByClassName("deck")[0];
const restarter = document.getElementsByClassName("fa-repeat")[0]
let numberOfMoves = 0;
let totalMovesDOM = document.getElementsByClassName("moves")[0]
let totalMoves = Number(document.getElementsByClassName("moves")[0].textContent);
let openCards = [];
let matches = 0;
let timerInstance = new Timer();
let timerDOM = document.getElementById("timer")
let popupCongrats = document.getElementById("popup-congrats")
let playAgain = [].slice.call(document.getElementsByClassName("play-again"))
let stars = [].slice.call(document.getElementsByClassName("fa-star"))
document.body.onload = loadGame()

function loadGame() {
    stars.map((star) => star.style.color = "")
    timerInstance.reset()
    timerInstance.stop()
    timerDOM.innerHTML = timerInstance.getTimeValues().toString()
    popupCongrats.classList = "modal"
    matches = 0
    cards = shuffle(cards)
    numberOfMoves = 0
    deck.innerHTML = "";
    cards.map((card, i) => {
        deck.appendChild(card)
        cards[i].classList.remove("show", "open", "match", "disabled")
        cards[i].removeAttribute("disabled")
    })
    timerInstance.addEventListener('secondsUpdated', () => {
        timerDOM.innerHTML = timerInstance.getTimeValues().toString()
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
for (let card of cards) {
    card.addEventListener("click", cardClicked);
}

function cardClicked(e) {
    if (!timerInstance.isRunning()) {
        timerInstance.start()
    }
    let card
    let cardClass
    switch (e.target.nodeName) {
        case 'LI': // li itself
            card = e.target
            cardClass = e.target.firstElementChild.classList.value
            break;
        case 'I': // icon itself
            card = e.target.parentElement
            cardClass = e.target.classList.value
            break;
    }
    if (card.getAttribute("disabled") === "true") { // getAttribute returns a string, not bool
        return e.preventDefault()
    }
    addCardToOpenCards(cardClass, card);
    if (numberOfMoves === 2) {
        compareCardsInOpenCards()
    }
}

function addCardToOpenCards(cardClass, card) {
    toggleCard(card)
    cardOpen(cardClass)
}

function toggleCard(card) {
    card.classList.toggle("open")
    card.classList.toggle("show")
    card.setAttribute("disabled", true)
}

function cardOpen(cardClass) {
    incrementCounter()
    contained(cardClass) ? openCards.push(cardClass) : null
}

function incrementCounter() {
    numberOfMoves++
    totalMoves++
    totalMovesDOM.innerHTML = totalMoves
}

function compareCardsInOpenCards() {
    if (openCards.length === 1) {
        lockMatchedCards()
    } else {
        closeAllCards()
    }
    resetNumberOfMoves()
    resetOpenCards()
}

function lockMatchedCards() {
    matches++
    cards.map((item) => {
        if (item.classList.contains("show")) {
            item.classList.add("match")
        }
    })
    if (matches === 8) {
        showVictoryModal()
    }
}

function showVictoryModal() {
    popupCongrats.className += ' show fade modal-open'
    timerInstance.pause()
    showFinalScore()
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
    }, 500)
}

const resetNumberOfMoves = () => numberOfMoves = 0
const resetOpenCards = () => openCards = []
const colorStars = (score) => decorateStars("gold", score)
const decorateStars = (color, numberToColor) => {
    for (let i = 0; i < numberToColor; i++) {
        stars[i].style.color = color
    }
    return stars.map((star) => star.outerHTML).join("")
}

const restartGame = () => {
    document.getElementsByClassName("moves")[0].textContent = 0
    totalMoves = Number(document.getElementsByClassName("moves")[0].textContent);
    popupCongrats.classList = ""
    loadGame()
}

restarter.addEventListener("click", () => restartGame())
playAgain.map((btn) => btn.addEventListener("click", () => restartGame()))

const showFinalScore = () => {
    document.getElementById("total-moves").innerHTML = Number(totalMoves)
    document.getElementById("total-time").innerHTML = timerInstance.getTimeValues().toString()
    document.getElementById("total-rating").innerHTML = calculateScore()
}

const calculateScore = () => {
    if (totalMoves < 31) {
        return colorStars(5)
    } else if (totalMoves < 36) {
        return colorStars(4)
    } else if (totalMoves < 41) {
        return colorStars(3)
    } else if (totalMoves < 46) {
        return colorStars(2)
    } else if (totalMoves < 51) {
        return colorStars(1)
    } else if (totalMoves >= 51) {
        return "You did not receive any stars.  Complete the game in fewer moves for a higher star rating!"
    }
}

// })()
