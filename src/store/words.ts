import { defineStore } from 'pinia'

export interface WordItem {
    word: string
    translation: string
}

export interface WordCategories {
    verbs: WordItem[]
    nouns: WordItem[]
    adjectives: WordItem[]
    ielts: WordItem[]
}

export const useWordStore = defineStore('words', {
    state: (): WordCategories => ({
        verbs: [],
        nouns: [],
        adjectives: [],
        ielts: []
    }),

    actions: {
        importData(data: WordCategories) {
            this.verbs = data.verbs || []
            this.nouns = data.nouns || []
            this.adjectives = data.adjectives || []
            this.ielts = data.ielts || []
        },

        exportData(): WordCategories {
            return {
                verbs: this.verbs,
                nouns: this.nouns,
                adjectives: this.adjectives,
                ielts: this.ielts
            }
        }
    }
})
