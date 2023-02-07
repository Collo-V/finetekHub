import { createRouter, createWebHistory } from 'vue-router'


import Team from "@/views/Team";
import Blogs from "@/views/Blogs";
import Login from "@/views/Login";
import ClientMessages from "@/views/ClientMessages";
import Chats from "@/views/Chats";
import Settings from "@/views/Settings";

const routes = [
    {
        path: '/team',
        name: 'team',
        component: Team,
        props: true
    },
    {
        path: '/blogs/:title?',
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
    {
        path: '/client-messages',
        name: 'messages',
        component: ClientMessages,
        props: true
    },
    {
        path: '/chats',
        name: 'chats',
        component: Chats,
        props: true
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        props: true
    },
    {
        path: '/',
        redirect:'/chats',
        name: 'home',
        // component: Login,
        // props: true
    },


]



const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    mode:'history',
    // scrollBehavior (to, from, savedPosition) {
    //     const position = {}
    //     if (to.hash) {
    //         Navigation(to.hash)
    //     }
    // }
})

export default router
