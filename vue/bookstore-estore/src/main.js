import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import BookBasket from "@/views/BookBasket";
import BookStore from "@/views/BookStore";
import {createRouter, createWebHistory} from "vue-router";
import BookOrders from "@/views/BookOrders";
import {createStore} from "vuex";
import BasketModule from "@/modules/basket-module";
import PurchaseModule from "@/modules/purchase-module";
import EstoreModule from "@/modules/estore-module";

const routes = [
    {path: "/", component: BookStore},
    {path: "/basket", component: BookBasket},
    {path: "/orders", component: BookOrders}
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const store = createStore({
   modules: {
       basket: BasketModule,
       purchase: PurchaseModule,
       estore: EstoreModule
   }
});

createApp(App).use(router).use(store).mount('#app')
