<script setup lang="ts">
import { ref } from 'vue'
import { useWordStore } from '@/store/words'

const word = ref('')
const translation = ref('')
const selectedCategory = ref<'verbs' | 'nouns' | 'adjectives' | 'ielts'>('verbs')

const store = useWordStore()

const addCard = (): void => {
    if (!word.value || !translation.value) return

    store[selectedCategory.value].push({
        word: word.value,
        translation: translation.value
    })

    word.value = ''
    translation.value = ''
}
</script>

<template>
    <form @submit.prevent="addCard">
        <select v-model="selectedCategory">
            <option value="verbs">Verbs</option>
            <option value="nouns">Nouns</option>
            <option value="adjectives">Adjectives</option>
            <option value="ielts">IELTS Words</option>
        </select>

        <input
            v-model="word"
            placeholder="Enter English word"
            required
        />
        <input
            v-model="translation"
            placeholder="Enter translation"
            required
        />
        <button type="submit">Add card</button>
    </form>

    <ul v-if="store[selectedCategory].length > 0">
        <li v-for="(card, index) in store[selectedCategory]" :key="index">
            <strong>{{ card.word }}</strong> — {{ card.translation }}
        </li>
    </ul>
</template>

<style scoped>
    form {
        display: flex;
        margin-left: auto;
        margin-right: auto;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
    }

    @media (max-width: 600px) {
        form {
            max-width: none;
            width: 90%;
        }
    }
</style>
