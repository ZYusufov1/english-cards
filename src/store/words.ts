import { defineStore } from 'pinia'
import addUnique from '@/utils'

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
            addUnique(this.verbs, data.verbs || [])
            addUnique(this.nouns, data.nouns || [])
            addUnique(this.adjectives, data.adjectives || [])
            addUnique(this.ielts, data.ielts || [])
        },

        exportData(): WordCategories {
            return {
                verbs: this.verbs,
                nouns: this.nouns,
                adjectives: this.adjectives,
                ielts: this.ielts
            }
        },

        initFromStorage() {
            const data = localStorage.getItem('wordStore')
            if (!data) return

            try {
                const parsed: WordCategories = JSON.parse(data)
                this.verbs = parsed.verbs || []
                this.nouns = parsed.nouns || []
                this.adjectives = parsed.adjectives || []
                this.ielts = parsed.ielts || []
            } catch (e) {
                console.error('Ошибка при разборе localStorage:', e)
            }
        }
    }
})
