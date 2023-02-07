import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/styles/tailwind.css";
import "@/assets/styles/view.css";
import store from  './store'
import 'animate.css'
import router from "@/router";

//FROALA

createApp(App).use(router).use(store)
    .mount('#app')

