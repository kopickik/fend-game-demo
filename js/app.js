/*
 * Create a list that holds all of your cards
 */
let cardElement = document.getElementsByClassName("card");
let cards = [...cardElement];
// console.log(`cards ${cards}`);

// deck of all cards in game
const deck = document.getElementById("card-deck");
const deckClass = document.getElementsByClassName("deck");
// console.log(`deck ${deck}`);
// console.log(`deckClass ${deckClass}`);

// variables for number of moves
let numberOfMoves = 0;
let counterForMoves = document.querySelector(".moves");

// variable to hold the number of open cards
var openCards = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 // onload function which is called everytime a page loads up
 document.body.onload = loadGame();

// function to load the Game onloading of the page
 function loadGame() {
 	console.log('startGame');
 	cards = shuffle(cards);

 	// Reset the number of moves
 	numberOfMoves = 0;
	counterForMoves.innerHTML = numberOfMoves;

	// Iterate through the cards array and append it to the deck
	// And remove the attributes
	for (let card of cards){
		deck.append(card);
		card.classList.remove("show", "open", "match", "disabled");
    }
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	console.log('shuffle')
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
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
for(card of cards){
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", toggleCard);
}

// function toggleCard which toggles the open and show class of the card
function toggleCard() {
	console.log('classList: '+this.type);
	this.classList.toggle("open");
	this.classList.toggle("show");
};

// function cardOpen which increments the counter and maintains the stack of opened card
function cardOpen() {

	// Increment the counter whenever a card is opened
	incrementCounter();
	console.log(`total moves ${numberOfMoves}`);

	// add the opened card into the openedCards array
	openCards.push(this);
	console.log(`openCards ${openCards}`);
};

function incrementCounter(){
	numberOfMoves++;
	counterForMoves.innerHTML = numberOfMoves;
}