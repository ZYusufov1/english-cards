<script setup lang="ts">
import { ref } from 'vue'
import { useCardStore } from '@/store/cards'

const word = ref('')
const translation = ref('')

const store = useCardStore()

const addCard = () :void => {
    if (!word.value || !translation.value) return

    store.addCard({
        word: word.value,
        translation: translation.value
    })

    word.value = ''
    translation.value = ''
}
</script>

<template>
    <form @submit.prevent="addCard">
        <input
            v-model="word"
            placeholder="Enter english word"
            required
        />
        <input
            v-model="translation"
            placeholder="Enter translate"
            required
        />
        <button type="submit">Add card</button>
    </form>

    <ul v-if="store.cards.length > 0">
        <li v-for="(card, index) in store.cards" :key="index">
            <strong>{{ card.word }}</strong> — {{ card.translation }}
        </li>
    </ul>
</template>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-width: 400px;
    }
</style>
