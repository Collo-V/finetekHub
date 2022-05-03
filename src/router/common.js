import { createRouter, createWebHistory } from 'vue-router'


import Team from "@/views/Team";
import Blogs from "@/views/Blogs";
import Login from "@/views/Login";

const routes = [
    {
        path: '/',
        name: 'home',
        component: Login,
        props: true
    },
    {
        path: '/team',
        name: 'team',
        component: Team,
        props: true
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: Blogs,
        props: true
    },

    {
        path: '/auth/login',
        name: 'login',
        component: Login,
        props: true
    },


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