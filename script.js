let cardArray = [
	{
		name: 'fries',
		img: 'images/fries.png'
	},
	{
		name: 'fries',
		img: 'images/fries.png'
	},
	{
		name: 'cheeseburger',
		img: 'images/cheeseburger.png'
	},
	{
		name: 'cheeseburger',
		img: 'images/cheeseburger.png'
	},
	{
		name: 'hotdog',
		img: 'images/hotdog.png'
	},
	{
		name: 'hotdog',
		img: 'images/hotdog.png'
	},
	{
		name: 'ice-cream',
		img: 'images/ice-cream.png'
	},
	{
		name: 'ice-cream',
		img: 'images/ice-cream.png'
	},
	{
		name: 'milkshake',
		img: 'images/milkshake.png'
	},
	{
		name: 'milkshake',
		img: 'images/milkshake.png'
	},
	{
		name: 'pizza',
		img: 'images/pizza.png'
	},
	{
		name: 'pizza',
		img: 'images/pizza.png'
	}
];


const grid = document.querySelector('.grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenId = [];
let clickedId = [];
let cardsWon = [];

function createBoard() {
	cardArray.sort(() => 0.5 - Math.random());
	for (let i = 0; i < cardArray.length; i++) {
		const card = document.createElement('img');
		card.setAttribute('data-id', i);
		card.setAttribute('src', cardArray[i].img)
		card.addEventListener('click', flipcard);
		grid.appendChild(card);
	}
	setTimeout(startGame,2000);
}
createBoard();
const cards = document.querySelectorAll('img');
function startGame() {
	for (let i = 0; i < cardArray.length; i++) {
		cards[i].setAttribute('src', 'images/blank.png');
	}
}

function checkForMatch() {

	let optionOneId = cardsChosenId[0];
	let optionTwoId = cardsChosenId[1];
	if(cardsChosen[0] === cardsChosen[1]) {
		cards[optionOneId].setAttribute('src', 'images/white.png');
		cards[optionTwoId].setAttribute('src', 'images/white.png');
		cardsWon.push(cardsChosen);
		clickedId.push(cardsChosenId[0], cardsChosenId[1]);
	}	else {
		cards[optionOneId].setAttribute('src', 'images/blank.png');
		cards[optionTwoId].setAttribute('src', 'images/blank.png');
	}
	if(clickedId.length === 0) {
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.pointerEvents = 'auto';
		}
	}
	for (let i = 0; i < cards.length; i++) {
		for (let j = 0; j < clickedId.length; j++) {
			if(i != parseInt(clickedId[j], 10)) {
				cards[i].style.pointerEvents = 'auto';
			} else {
				cards[i].style.pointerEvents = 'none';
				break;
			}
		}
	}
	cardsChosen = [];
	cardsChosenId = [];
	resultDisplay.textContent = cardsWon.length;
	if(cardsWon.length === cardArray.length / 2) {
		resultDisplay.textContent = 'Congratulations! You found them all!';
		setTimeout(() => {
			location.reload();
			return false;
		}, 1000);
	};
};

function flipcard() {

	const cardId = this.getAttribute('data-id');
	cardsChosen.push(cardArray[cardId].name);
	cardsChosenId.push(cardId);
	this.style.pointerEvents = 'none';
	this.setAttribute('src', cardArray[cardId].img);
	if(cardsChosen.length === 2) {
		for (let i = 0; i < cards.length; i++) {
			cards[i].style.pointerEvents = 'none';
		}
		setTimeout(checkForMatch, 500);
	};
};
