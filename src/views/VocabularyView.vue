<script setup lang="ts">
import { computed } from 'vue'
import { useWordStore } from '@/store/words'

const store = useWordStore()

const allWords = computed(() => {
    return [
        ...store.verbs.map(word => ({ ...word, category: 'verbs' })),
        ...store.nouns.map(word => ({ ...word, category: 'nouns' })),
        ...store.adjectives.map(word => ({ ...word, category: 'adjectives' })),
        ...store.ielts.map(word => ({ ...word, category: 'ielts' }))
    ]
})
</script>

<template>
    <ul v-if="allWords.length > 0" class="list">
        <li v-for="(card, index) in allWords" :key="index">
            <strong>{{ card.word }}</strong> — {{ card.translation }}
            <small style="opacity: 0.6">[{{ card.category }}]</small>
        </li>
    </ul>
    <p v-else>Слов пока нет.</p>
</template>

<style scoped>
    .list {
        margin: auto;
    }
</style>
