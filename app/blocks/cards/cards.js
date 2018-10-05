'use strict';

const cards = document.querySelectorAll('.cards__card');
const weights = document.querySelectorAll('.cards__weight');
const links = document.querySelectorAll('.cards__link');
let lastClickedCard;

function handler() {
	lastClickedCard.className = 'cards__card cards__card_active';
	lastClickedCard.removeEventListener('mouseleave', handler);
}

const changeCardState = function (card, index) {
	if (!card.classList.contains('cards__card_disabled')) {
		lastClickedCard = card;
		if (card.classList.contains('cards__card_active') ||
			card.classList.contains('cards__card_active-first')) {
			card.className = 'cards__card';
			weights[index].className = 'cards__weight';
			card.removeEventListener('mouseleave', handler);
		}else {
			card.classList.add('cards__card_active-first');
			weights[index].classList.add('cards__weight_active');
			card.addEventListener('mouseleave', handler);
		}
	}
};

const changeCardStateFromLink = function (link) {
	cards[link.getAttribute('data-link') - 1].className = 'cards__card cards__card_active';
};

cards.forEach(function (card, index) {
	card.addEventListener('click', function () {
		changeCardState(card, index);
	});
	card.addEventListener('keydown', function (e) {
		if (document.activeElement === card && e.code === 'Enter') {
			changeCardState(card, index);
		}
	});
});

links.forEach(function (link) {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		changeCardStateFromLink(link);
	});
});
