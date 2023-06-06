import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'


import Team from "@/views/Team";
import Blogs from "@/views/Blogs";
import Login from "@/views/Login";
import ClientMessages from "@/views/ClientMessages";
import Chats from "@/views/Chats";
import Settings from "@/views/Settings";
import Welcome from "@/views/Welcome";
import NavBar from '@/components/Nav'
import Projects from "@/views/Projects";
import MyTasks from "@/components/tasks/MyTasks";

const routes = [
    {
        path: '/team',
        name: 'team',
        components: {
            default: Team,
            NavBar
        },
        props: true
    },
    {
        path: '/blogs',
        name: 'blogs',
        components: {
            default:Blogs,
            NavBar
        },
    },
    {
            path: '/blogs/:id',
            name: 'blog',
            components: {
                default:Blogs,
                NavBar
            },
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
        components: {
            default:ClientMessages,
            NavBar
        },
        props: true
    },
    {
        path: '/chats',
        name: 'chats',
        components: {
            default:Chats,
            NavBar
        },
        props: true
    },
    {
        path: '/settings',
        name: 'settings',
        components: {
            default:Settings,
            NavBar
        },
        props: true
    },
    {
        path: '/projects',
        name: 'projects',
        components: {
            default:Projects,
            NavBar
        },
        props: true
    },
    {
        path: '/my-tasks',
        name: 'my-tasks',
        components: {
            default:MyTasks,
            NavBar
        },
    },
    {
        path: '/welcome',
        name: 'welcome',
        component: Welcome,
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
    // history: createWebHistory(process.env.BASE_URL),
    history: process.env.IS_ELECTRON ? createWebHashHistory() : createWebHistory(),
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
