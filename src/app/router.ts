/* Dependencies */
import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'

/* Views */
import ColorView from '../pages/ColorView.vue'

/* Routes */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: ColorView
    },
    {
        path: '/pathMatch(.*)*',
        component: ColorView
    }
]

/* Router */
export const router = createRouter({
    history: createMemoryHistory(),
    routes
})