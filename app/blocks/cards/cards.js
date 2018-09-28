'use strict';

const cards = document.querySelectorAll('.card');
const weights = document.querySelectorAll('.card__weight');
const links = document.querySelectorAll('.link');

// ie11 foreach polyfill
if ('NodeList' in window && !NodeList.prototype.forEach) {
	console.info('polyfill for IE11');
	NodeList.prototype.forEach = function (callback, thisArg) {
		thisArg = thisArg || window;
		for (let i = 0; i < this.length; i++) {
			callback.call(thisArg, this[i], i, this);
		}
	};
}

cards.forEach(function (card, index) {
	// отключенные карточки не участвуют
	if (!card.classList.contains('card--disabled')) {
		// изменить класс по клику
		card.addEventListener('click', function () {
			// убрать класс активности
			if (card.classList.contains('card--active') ||
				card.classList.contains('card--active-first')) {
				card.className = 'card';
				weights[index].className = 'card__weight';
				// добавить класс активности
			}else {
				// добавляем псевдо-активный класс
				card.classList.add('card--active-first');
				weights[index].classList.add('card__weight--active');
				// когда мышь уйдет, вешаем настоящий активный класс
				card.addEventListener('mouseleave', function handler() {
					card.className = 'card card--active';
					card.removeEventListener('mouseleave', handler);
				});
			}
		});
	}
});

links.forEach(function (link) {
	link.addEventListener('click', function (e) {
		e.preventDefault();
		cards[link.getAttribute('data-link') - 1].className = 'card card--active';
	});
});
