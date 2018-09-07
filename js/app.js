/*
 * Create a list that holds all of your cards
 */
let cardElement = document.getElementsByClassName("card");
let allCards = [...cardElement];

// deck of all cards in game
const deckOfCards = document.getElementById("card-deck");

// variables for number of moves
let numberOfMoves = 0;
let counterForMoves = document.querySelector(".moves");

// variable to hold the number of open cards
var openCards = [];

// variable which holds matchedCards
let matchedCard = document.getElementsByClassName("match");

// Variables for the timer
var second = 0, minute = 0; hour = 0;
var timerClock = document.querySelector(".timer");
var interval;
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
 	allCards = shuffle(allCards);

 	// Reset the number of moves
 	numberOfMoves = 0;
	counterForMoves.innerHTML = numberOfMoves;

	openCards = [];
	// Iterate through the cards array and append it to the deck
	// And remove the attributes
	for (let card of allCards){
		deckOfCards.append(card);
		card.classList.remove("show", "open", "match", "disabled");
    }

    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    // var timer = document.querySelector(".timer");
    timerClock.innerHTML = "00:00:00";
    clearInterval(interval);
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
for(card of allCards){
	card.addEventListener("click", cardOpen);
	card.addEventListener("click", toggleCard);
	card.addEventListener("click", congratulationsPopup);
}

// function toggleCard which toggles the open and show class of the card
function toggleCard() {
	this.classList.toggle("open");
	this.classList.toggle("show");
};

// function cardOpen which increments the counter and maintains the stack of opened card
function cardOpen() {
	// Increment the counter whenever a card is opened
	incrementCounter();

	// add the opened card into the openedCards array
	openCards.push(this);
	console.log(`openCards ${openCards}`);
	disableCard(this);
	handleOpenCards();
};

function incrementCounter(){
	numberOfMoves++;
	console.log(`total moves ${numberOfMoves}`);
	counterForMoves.innerHTML = numberOfMoves;
	if(numberOfMoves == 1){
		startTimer();
	}
}

function handleOpenCards(){
	var numberOfCards = openCards.length;
	    if(numberOfCards === 2){
	        if(openCards[0].type === openCards[1].type){
	            cardsMatched();
	        } else {
	            notMatched();
	        }
	    }
}

// Function to add matched and disabled and removing the show,
// open and no-event to the matched card, when the cards are matched.
function cardsMatched(){
    openCards[0].classList.add("match", "disabled");
    openCards[1].classList.add("match", "disabled");
    openCards[0].classList.remove("show", "open", "no-event");
    openCards[1].classList.remove("show", "open", "no-event");
    openCards = [];
}

// Function to add unmatched and removing the show,
// open, unmatched and no-event to the matched card, when the cards are not matched.
function notMatched(){
    openCards[0].classList.add("unmatched");
    openCards[1].classList.add("unmatched");
    disableCard();
    hideCards();
}

// Function to remove the cards attribute and empty the opened card list.
function hideCards(){
	setTimeout(function(){
        openCards[0].classList.remove("show", "open", "no-event","unmatched");
        openCards[1].classList.remove("show", "open", "no-event","unmatched");
        enableCard();
        openCards = [];
    },500);
}

// Function to disable cards temporarily so that it can't be clicked.
function disableCard(){
    Array.prototype.filter.call(allCards, function(cardElement){
        cardElement.classList.add("disabled");
    });
}

// Function to enable cards and disable matched cards.
function enableCard(){
    Array.prototype.filter.call(allCards, function(cardElement){
        cardElement.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}

// Function to set the sec, min and hour time in the timer clock using setInterval
function startTimer(){
	console.log("startTimer")
    interval = setInterval(function(){
        second++;
        if(second == 60){
            minute++;
            second = 0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
        timerClock.innerHTML = formatTime(hour) + ":" + formatTime(minute) + ":" + formatTime(second);
    },1000);
}

function formatTime(time) {
    if (time < 10) {
      time = '0' + time
    }
    return time;
}

// function congratulationsPopup which displays a congratulations popup
function congratulationsPopup(){
	finalTime = timerClock.innerHTML;
	console.log(`finalTime ${finalTime}`);
	//Displaying the total moves, star rating and total time taken
    document.getElementById("total-moves").innerHTML = numberOfMoves;
    document.getElementById("star-rating").innerHTML = starRating;
    document.getElementById("total-time").innerHTML = finalTime;
}

