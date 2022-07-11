const Card = require('./Card');
const suits = ['spades', 'hearts', 'diamonds', 'clubs'];
const faces = ['Jack', 'Queen', 'King'];
const { shuffle } = require('../../utils/Utils');

// Deck class
module.exports = class Deck {
	constructor(options = {}) {
		this.deckCount = options.deckCount || 1;
		this.includeJokers = options.includeJokers || false;
		this.deck = [];
		this.makeCards(this.deckCount);
	}

	/**
	 * Make a deck of cards
	 *
	 * @param {*} deckCount the number of decks to make
	 * @returns {Array} an array of cards
	 */
	makeCards(deckCount) {
		const newDeck = [];
		for (let i = 0; i < deckCount; i++) {
			for (const suit of suits) {
				newDeck.push(new Card('Ace', suit));
				for (let j = 2; j <= 10; j++) newDeck.push(new Card(j, suit));
				for (const face of faces) newDeck.push(new Card(face, suit));
			}
			if (this.includeJokers) {
				newDeck.push(new Card('Joker', 'joker'));
				newDeck.push(new Card('Joker', 'joker'));
			}
		}
		this.deck = shuffle(newDeck);
		return this.deck;
	}

	/**
	 * Draw a new card from the deck
	 * 
	 * @param {*} amount the amount of cards to draw
	 * @returns {Array} an array of cards
	 */
	draw(amount = 1) {
		const cards = [];
		for (let i = 0; i < amount; i++) {
			const card = this.deck[0];
			this.deck.shift();
			cards.push(card);
		}
		return amount === 1 ? cards[0] : cards;
	}

	/**
	 * Reset the deck
	 * @returns {Array} an array of cards
	 */
	reset() {
		this.makeCards(this.deckCount);
		return this;
	}
};
