<template>
  <div class="space-y-16">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-600 p-12 sm:p-16 text-white">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div
          class="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animation-delay-2000">
        </div>
      </div>

      <div class="relative z-10 max-w-3xl">
        <h1 class="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
          Discover Your <span class="text-yellow-300">Perfect</span> Products
        </h1>
        <p class="text-xl text-indigo-100 mb-8 max-w-2xl">
          Shop the latest trends with exclusive deals, free shipping, and premium quality. Your satisfaction is our
          priority.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <button
            class="bg-white text-indigo-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl">
            Explore Now
          </button>
          <button
            class="border-2 border-white text-white hover:bg-white hover:text-indigo-600 font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Watch Demo
          </button>
        </div>
      </div>
    </section>

    <!-- Section Title -->
    <div class="space-y-4">
      <div class="flex items-center space-x-4">
        <div class="flex-1 h-1 bg-gradient-to-r from-indigo-600 to-transparent"></div>
        <h2 class="section-title text-center flex-1">🌟 Trending Products</h2>
        <div class="flex-1 h-1 bg-gradient-to-l from-pink-600 to-transparent"></div>
      </div>
      <p class="text-center text-slate-600 text-lg">Handpicked collection of bestsellers and customer favorites</p>
    </div>

    <!-- Products Grid - 4 Columns -->
    <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <transition-group name="fade-in" tag="div" class="contents">
        <div v-for="(p, index) in products" :key="p.id" class="transform transition-all duration-300"
          :style="{ transitionDelay: `${index * 50}ms` }">
          <ProductCard :product="p" />
        </div>
      </transition-group>
    </div>

    <!-- Loading State -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="bg-slate-200 rounded-xl h-96 animate-pulse"></div>
    </div>

    <!-- Newsletter Section -->
    <section class="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white">
      <div class="max-w-2xl mx-auto text-center">
        <h3 class="text-3xl font-bold mb-4">Get Exclusive Offers</h3>
        <p class="text-slate-300 mb-6">Subscribe to our newsletter and get 20% off your first purchase</p>
        <form @submit.prevent="subscribe" class="flex gap-3">
          <input type="email" placeholder="Enter your email"
            class="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            required />
          <button type="submit"
            class="bg-gradient-to-r from-indigo-600 to-pink-600 hover:from-indigo-700 hover:to-pink-700 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getProduct } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'

const products = ref([])

onMounted(async () => {
  const tempProducts = []
  for (let i = 0; i < 8; i++) {
    const { data } = await getProduct(i + 1)
    tempProducts.push(data)
  }
  products.value = tempProducts
})

const subscribe = () => {
  alert('Thanks for subscribing! Check your email for the 20% discount code.')
}
</script>

<style scoped>
.fade-in-enter-active,
.fade-in-leave-active {
  transition: all 0.5s ease;
}

.fade-in-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-in-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
