import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/styles/tailwind.css";
import "@/assets/styles/view.css";
import store from  './store'
import 'vue-cropper/dist/index.css'
import 'animate.css'
import router from "@/router";
import {VueCropper} from "vue-cropper";

//FROALA

createApp(App).use(router).use(store).use(VueCropper)
    .mount('#app')

