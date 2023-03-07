// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import Order from "@/views/Order.vue";
import Personnel from "@/views/Personnel.vue";

const routes = [
  { path: '/', component: Home, },
  { path: '/order', component: Order, },
  { path: '/personnel', component: Personnel}
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
