<script setup lang="ts">

import CardButton from '@/components/CardButton.vue'
</script>

<template>
    <div class="block">
        <CardButton word="testing" translation="lets play"  link="/test"/>
        <CardButton word="vocabulary" translation="lets see" link="/vocabulary"/>
        <CardButton word="adding" translation="lets add new word" link="/add"/>
        <CardButton word="synchronization" translation="lets download / upload file" link="/sync"/>
    </div>
</template>

<style scoped>
    .block {
        margin: auto 30px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    @media (max-width: 600px) {
        .block {
            margin: auto;
            width: 90%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            gap: 20px;
        }
    }
</style>
