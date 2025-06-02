<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import { useWordStore } from '@/store/words'

const store = useWordStore()

const shuffled = ref(
    [...store.verbs, ...store.nouns, ...store.adjectives, ...store.ielts]
        .sort(() => Math.random() - 0.5)
)

const index = ref(0)
const currentCard = ref(shuffled.value[index.value])
const userInput = ref('')
const feedback = ref<'correct' | 'wrong' | null>(null)
const isFlipped = ref(false)
const isFinished = ref(false)
const isTransitioning = ref(false)
const canPressEnter = ref(false)

const checkAnswer = (): void => {
    if (isFinished.value || isTransitioning.value) return

    const isCorrect = userInput.value.trim().toLowerCase() === currentCard.value.word.toLowerCase()
    feedback.value = isCorrect ? 'correct' : 'wrong'
    isFlipped.value = true

    const isLast = index.value >= shuffled.value.length - 1

    if (isCorrect) {
        isTransitioning.value = true
        setTimeout(() => {
            if (isLast) {
                isFinished.value = true
                isFlipped.value = false
                isTransitioning.value = false
            } else {
                // change card before animation
                index.value++
                currentCard.value = shuffled.value[index.value]
                userInput.value = ''
                feedback.value = null
                isFlipped.value = false
                isTransitioning.value = false
            }
        }, 1800)
    }
}

const nextCard = (): void => {
    if (isTransitioning.value || isFinished.value) return
    isTransitioning.value = true
    canPressEnter.value = false

    const isLast = index.value >= shuffled.value.length - 1

    if (isLast) {
        isFinished.value = true
        isFlipped.value = false
        isTransitioning.value = false
    } else {
        index.value++
        currentCard.value = shuffled.value[index.value]
        userInput.value = ''
        feedback.value = null
        isFlipped.value = false

        setTimeout(() => {
            isTransitioning.value = false
        }, 600)
    }
}

const handleKey = (event: KeyboardEvent): void => {
    if (feedback.value === 'wrong' && event.key === 'Enter' && canPressEnter.value && !isFinished.value) {
        nextCard()
    }
}

watch(isFlipped, (flipped) => {
    if (flipped && feedback.value === 'wrong' && !isFinished.value) {
        setTimeout(() => {
            canPressEnter.value = true
            window.addEventListener('keydown', handleKey)
        }, 600)
    } else {
        canPressEnter.value = false
        window.removeEventListener('keydown', handleKey)
    }
})

onUnmounted(() => {
    window.removeEventListener('keydown', handleKey)
})
</script>

<template>
    <div class="card" v-if="currentCard || isFinished">
        <div class="card__inner" :class="{ 'card__inner--flipped': isFlipped }">
            <div class="card__face card__face--front">
                <template v-if="!isFinished">
                    <p><strong>Перевод:</strong> {{ currentCard.translation }}</p>
                    <input
                        v-model="userInput"
                        @keyup.enter="checkAnswer"
                        :class="{ 'hide-caret': isFlipped }"
                        placeholder="Введите английское слово"
                        class="word-input"
                    />
                    <button class="check-btn" @click="checkAnswer">Проверить</button>
                </template>
                <template v-else>
                    <p class="finished">🎉 Слова закончились!</p>
                </template>
            </div>

            <div class="card__face card__face--back">
                <template v-if="feedback === 'correct'">
                    <p class="correct">✅ Верно!</p>
                </template>
                <template v-else-if="feedback === 'wrong'">
                    <p class="wrong">❌ Неверно. Правильно: <strong>{{ currentCard.word }}</strong></p>
                    <button class="next-btn" @click="nextCard">Следующее</button>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 80%;
    max-width: 400px;
    height: 300px;
    margin: 50px auto;
    perspective: 1000px;
}

.card__inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
    transform-style: preserve-3d;
}

.card__inner--flipped {
    transform: rotateY(180deg);
}

.card__face {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    padding: 20px;
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
}

.card__face--front {
    background-color: #d0f0c0;
    color: #333;
}

.card__face--back {
    background-color: #ffe4b5;
    color: #333;
    transform: rotateY(180deg);
}

.word-input {
    padding: 10px;
    font-size: 16px;
    width: 80%;
    margin: 10px 0;
    border: 1px solid #aaa;
    border-radius: 6px;
}

.check-btn,
.next-btn {
    padding: 8px 16px;
    font-size: 16px;
    background-color: #48bb78;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
}

.check-btn:hover,
.next-btn:hover {
    background-color: #38a169;
}

.correct {
    color: green;
    font-size: 20px;
}

.wrong {
    color: red;
    font-size: 18px;
    margin-bottom: 12px;
}

.finished {
    font-size: 22px;
    text-align: center;
    color: #444;
}

.hide-caret {
    caret-color: transparent;
}
</style>
