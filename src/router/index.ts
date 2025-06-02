import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SyncView from '@/views/SyncView.vue'
import CardFormView from '@/views/AddCardView.vue'
import TestingView from '@/views/TestingView.vue'
import VocabularyView from '@/views/VocabularyView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/sync', component: SyncView },
    { path: '/add', component: CardFormView },
    { path: '/test', component: TestingView },
    { path: '/vocabulary', component: VocabularyView },
]

export const router = createRouter({
    history: createWebHistory('/english-cards/'),
    routes
})
