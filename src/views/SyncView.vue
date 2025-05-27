
<script setup lang="ts">
import { useWordStore } from '@/store/words'
const store = useWordStore()

// Download JSON
const downloadJSON = (): void => {
    const data = store.exportData()
    const json = JSON.stringify(data, null, 2)

    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'words.json'
    link.click()

    URL.revokeObjectURL(url)
}

// Upload JSON
const uploadJSON = (event: Event): void => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
        try {
            const parsed = JSON.parse(reader.result as string)
            store.importData(parsed)
            alert('Success!')
        } catch (err) {
            alert('Error while read json')
        }
    }
    reader.readAsText(file)
}
</script>

<template>
    <div class="sync">
        <h1>Import и export words</h1>

        <div class="buttons">
            <button @click="downloadJSON">Download word (JSON)</button>
            <input type="file" @change="uploadJSON" accept=".json" placeholder="" />
            <input
                type="file"
                placeholder="placeholder"
            />
        </div>
    </div>
</template>

<style scoped>
    .sync {
        padding: 2rem;
        text-align: center;
    }

    .buttons {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
    }

    button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
    }

    @media (max-width: 600px) {
        button {
            width: 80%;
        }
    }
</style>
