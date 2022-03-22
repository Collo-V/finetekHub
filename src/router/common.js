import { createRouter, createWebHistory } from 'vue-router'




const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        props: true
    },
    {

]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    mode:'history',
    scrollBehavior (to, from, savedPosition) {
        const position = {}
        if (to.hash) {
            Navigation(to.hash)
        }
    }
})

export default router