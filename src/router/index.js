import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomeScreen.vue'
import Shop from '../pages/ShopScreen.vue'
import ProductDetail from '../pages/ProductDetail.vue'
import Checkout from '../pages/CheckoutScreen.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/shop', component: Shop },
  { path: '/product/:id', component: ProductDetail },
  { path: '/checkout', component: Checkout },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
