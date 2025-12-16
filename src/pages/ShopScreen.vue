<template>
  <div class="space-y-8 mt-20">
    <!-- Filter Section -->
    <div class="bg-white rounded-xl shadow-md p-6 top-20 z-40 backdrop-blur-sm">
      <label class="block text-sm font-bold text-slate-700 mb-2">Filter by Category</label>
      <div class="flex flex-col  sm:flex-row gap-4 items-center">
        <div class="flex-1 items-center">
          <select v-model="selectedCategory"
            class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-primary focus:outline-none transition-colors bg-slate-50 font-medium text-slate-900">
            <option value="">All Products</option>
            <option v-for="c in categories" :key="c" :value="c">
              {{ c }}
            </option>
          </select>
        </div>
        <button @click="Rechercher"
          class="bg-orange-600 flex items-center  hover:bg-white hover:border hover:text-orange-600 text-white to:scale-105 font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto">
          <svg class="w-5 h-5 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
          Search
        </button>
      </div>
      <div v-if="selectedCategory" class="mt-4 flex items-center gap-2">
        <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
          Category: {{ selectedCategory }}
        </span>
        <button @click="selectedCategory = ''; Rechercher()"
          class="text-sm text-slate-500 hover:text-slate-700 underline">
          Clear
        </button>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <transition-group name="fade-in" tag="div" class="contents">
        <div v-for="(p, index) in products" :key="p.id" class="transform transition-all duration-300"
          :style="{ transitionDelay: `${index * 50}ms` }">
          <ProductCard :product="p" />
        </div>
      </transition-group>
    </div>

    <!-- No Products State -->
    <div v-else class="text-center py-16">
      <svg class="w-24 h-24 mx-auto text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
      </svg>
      <h3 class="text-2xl font-bold text-slate-900 mb-2">No products found</h3>
      <p class="text-slate-600 mb-6">Try adjusting your filters or browse all products</p>
      <button @click="selectedCategory = ''; Rechercher()"
        class="bg-gradient-to-r from-primary to-orange-600 hover:from-orange-600 hover:to-primary text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
        View All Products
      </button>
    </div>

    <!-- Product Count -->
    <div class="flex justify-between items-center py-6 border-t border-slate-200">
      <p class="text-slate-600">
        Showing <span class="font-bold text-primary">{{ products.length }}</span> products
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllProducts, GetCategories } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'

const products = ref([])
const categories = ref([])
const selectedCategory = ref('')

onMounted(async () => {
  const { data } = await getAllProducts()
  products.value = data
  categories.value = await GetCategories()
})

async function Rechercher() {
  try {
    let data = await getAllProducts()
    let resp = data.data

    if (!selectedCategory.value) {
      products.value = resp
      return
    }

    products.value = resp.filter(product => {
      if (!selectedCategory.value) return true
      return product.category === selectedCategory.value
    })
  } catch (error) {
    console.error("Failed to fetch or filter products:", error)
  }
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
</style>
