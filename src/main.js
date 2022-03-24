import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/styles/main.css";
import 'animate.css'
import router from "@/router/common";
createApp(App).use(router).mount('#app')
