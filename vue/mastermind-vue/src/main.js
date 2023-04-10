import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import MasterMind from "@/components/MasterMind";
import {createRouter, createWebHistory} from "vue-router";
import PlayerWins from "@/views/PlayerWins";
import PlayerLoses from "@/views/PlayerLoses";

const routes = [
    {path: "/", component: MasterMind},
    {path: "/wins", component: PlayerWins},
    {path: "/loses", component: PlayerLoses}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

createApp(App).use(router).mount('#app')
