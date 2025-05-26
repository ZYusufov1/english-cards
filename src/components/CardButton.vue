<script setup lang="ts">
import { ref } from 'vue'
import {useRouter} from 'vue-router'

interface Props {
    word: string
    translation: string
    link: string
}

const router = useRouter()

const props = defineProps<Props>()

const isFlipped = ref(false)

const flipCard = (): void => {
    isFlipped.value = true
}

const unflipCard = (): void =>  {
    isFlipped.value = false
}
</script>

<template>
    <div
        class="card"
        @click="flipCard"
        @mouseleave="unflipCard"
    >
        <div class="card__inner" :class="{ 'card__inner--flipped': isFlipped }">
            <div class="card__face card__face--front">
                {{ word }}
            </div>
            <div class="card__face card__face--back" @click="router.push(link)">
                {{ translation }}
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card {
        width: 20%;
        height: 80svh;
        perspective: 1000px;
        cursor: pointer;
    }

    .card__inner {
        width: 100%;
        height: 100%;
        position: relative;
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
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        backface-visibility: hidden;
        border: none;
        font-size: 30px;
        text-align: center;
        white-space: pre-line;
    }

    .card__face--front {
        background-color: #cff2ee;
        color: #e9c46a;
    }

    .card__face--back {
        background-color: #e9c46a;
        color: #cff2ee;
        transform: rotateY(180deg);
    }

    @media (max-width: 600px) {
        .card {
            min-width: 45%;
            max-height: 35svh;
        }

        .card__face {
            font-size: 14px;
        }
    }
</style>
