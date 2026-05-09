/* Dependencies */
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

/* Views */
import { AboutView, ColorView } from '../../pages'

/* Routes */
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: ColorView
    },
    {
        path: '/about',
        component: AboutView
    },
    {
        path: '/:pathMatch(.*)*',
        component: ColorView
    }
]

/* Router */
export const router = createRouter({
    history: createWebHashHistory(),
    routes
})