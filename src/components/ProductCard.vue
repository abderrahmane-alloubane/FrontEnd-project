<template>
  <div class="card-product flex flex-col justify-between h-142 z-50 bg-white/50 p-6 rounded-2xl shadow-sm">
    <!-- Product Image Container -->
    <div class="card-product-image flex items-center justify-center">
      <img :src="product.image" :alt="product.title" class="h-42" />
    </div>

    <!-- Product Info -->
    <div class="flex flex-col gap-4">
      <!-- Title -->
      <h3 class="font-bold text-lg text-slate-900 line-clamp-2 group-hover:text-primary transition-colors">
        {{ product.title }}
      </h3>

      <!-- Rating -->
      <div class="flex items-center">
        <div class="flex text-yellow-400">
          <span v-for="i in 5" :key="i" class="text-sm">★</span>
        </div>
        <span class="text-xs text-slate-500 ml-2">({{ Math.floor(Math.random() * 100) + 50 }} reviews)</span>
      </div>

      <!-- Description Preview -->
      <p class="text-sm text-slate-600 line-clamp-2">
        {{ product.description || 'Premium quality product with excellent features' }}
      </p>

      <!-- Price Section -->
      <div class="flex items-baseline space-x-2">
        <span class="text-2xl font-bold text-primary">{{ product.price }} €</span>
        <span class="text-sm text-slate-400 line-through">{{ (product.price * 1.2).toFixed(2) }} €</span>
        <span class="text-xs font-bold text-red-500">-20%</span>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <button @click="addToCart"
          class="flex-1 bg-orange-600 hover:text-orange-600 hover:bg-white text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-square-plus-icon lucide-square-plus">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M8 12h8" />
            <path d="M12 8v8" />
          </svg>
          <span>Add</span>
        </button>
        <RouterLink :to="'/product/' + product.id"
          class="flex-1 border border-primary text-primary hover:bg-orange-600 hover:scale-105 hover:text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 text-center">
          Details
        </RouterLink>
      </div>

      <!-- Stock Info -->
      <div class="text-xs text-slate-500 flex items-center space-x-1">
        <svg class="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
        <span>In Stock - Free Shipping</span>
      </div>

      <!-- Confirmation Message -->
      <div v-if="showMessage" class="text-green-600 font-semibold border border-green-600 rounded-lg p-2 text-center">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { setCartProduct } from '@/services/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const message = ref('Product added to cart!')
const showMessage = ref(false)

function addToCart() {
  setCartProduct(props.product, 1)
  showMessage.value = true
  setTimeout(() => {
    showMessage.value = false
  }, 1500)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
