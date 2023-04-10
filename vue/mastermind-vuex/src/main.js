import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import GameModule from "@/modules/GameModule";
import StatisticsModule from "@/modules/StatisticsModule";
import {createStore} from "vuex";
import router from "@/router";

const store = createStore({
    modules: {
        game: GameModule,
        statistics: StatisticsModule
    }
});

createApp(App).use(store).use(router).mount('#app')
