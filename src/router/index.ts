import {createRouter, createWebHistory, createWebHashHistory} from 'vue-router'
import testPage from "@/views/testPage.vue";

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/testPage',
            name: 'testPage',
            component: testPage
        }
    ]
})

export default router
