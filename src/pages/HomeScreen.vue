<template>
  <div class="space-y-16 mt-24">
    <!-- Hero Section -->
    <section
      class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-700 via-purple-700 to-teal-700 p-12 sm:p-16 text-white shadow-2xl">
      <div class="absolute inset-0 opacity-25">
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full mix-blend-soft-light filter blur-3xl animate-pulse">
        </div>
        <div
          class="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600 rounded-full mix-blend-soft-light filter blur-3xl animation-delay-2000 animate-pulse">
        </div>
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-600 rounded-full mix-blend-soft-light filter blur-3xl opacity-50">
        </div>
      </div>

      <div class="relative z-10 max-w-3xl">
        <h1 class="text-5xl sm:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          Discover Your <span class="text-amber-300 drop-shadow-md">Perfect</span> Products
        </h1>
        <p class="text-xl text-orange-50 mb-8 max-w-2xl drop-shadow-md">
          Shop the latest trends with exclusive deals, free shipping, and premium quality. Your satisfaction is our
          priority.
        </p>
        <div class="flex flex-col sm:flex-row gap-4">
          <a href="#products"
            class="bg-white text-slate-900 hover:bg-slate-100 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform shadow-xl hover:shadow-2xl">
            Explore Now
          </a>
          <RouterLink to="/shop"
            class="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm font-bold py-3 px-8 rounded-lg transition-all duration-300">
            Shop now
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Section Title -->
    <div class="space-y-4" id="products">
      <div class="flex items-center space-x-4">
        <div class="flex-1 h-1 bg-gradient-to-r from-primary to-transparent"></div>
        <h2
          class="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent text-center flex-1">
          🌟 Trending Products</h2>
        <div class="flex-1 h-1 bg-gradient-to-l from-secondary to-transparent"></div>
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
