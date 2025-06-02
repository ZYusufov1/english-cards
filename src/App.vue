<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useWordStore } from '@/store/words'

const store = useWordStore()

onMounted(() => {
    store.initFromStorage()
})

watch(
    () => store.$state,
    (newState) => {
        localStorage.setItem('wordStore', JSON.stringify(newState))
    },
    { deep: true }
)
</script>

<template>
    <main>
        <router-view />
    </main>
</template>

<style scoped>
    main {
        margin: auto;
        height: 100svh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
</style>
