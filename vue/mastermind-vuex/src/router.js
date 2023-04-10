import MasterMind from "@/views/MasterMind";
import PlayerWins from "@/views/PlayerWins";
import PlayerLoses from "@/views/PlayerLoses";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {path: "/", component: MasterMind},
    {path: "/wins", component: PlayerWins},
    {path: "/loses", component: PlayerLoses}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;