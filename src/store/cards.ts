import { defineStore } from 'pinia'

export const useCardStore = defineStore('cards', {
	state: () => ({
		cards: [] as { word: string; translation: string }[]
	}),
	actions: {
		addCard(card: { word: string; translation: string }) {
			this.cards.push(card)
			localStorage.setItem('cards', JSON.stringify(this.cards))
		}
	}
})
