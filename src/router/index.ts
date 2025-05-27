import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import SyncView from '@/views/SyncView.vue'
import CardForm from '@/views/AddCardView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/sync', component: SyncView },
    { path: '/add', component: CardForm },
]

export const router = createRouter({
    history: createWebHistory('/english-cards/'),
    routes
})
