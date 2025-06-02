<template>
    <input
        v-model="word"
        type="text"
        autocorrect="off"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        placeholder="Напиши слово"
    />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const word = ref('')
</script>
