<template>
  <div>
    <h2>Tous les produits</h2>
    <div class="catSelector mb-3 d-flex gap-2 align-items-center">
      <select name="category" id="category" class="form-select w-auto"></select>
      <button @click="placeholderfunc" class="btn btn-outline-secondary">Categories</button>
    </div>
    <div class="row g-3">
      <div v-for="p in products" :key="p.id" class="col-6 col-md-4 col-lg-3">
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllProducts } from '@/services/api'
import ProductCard from '@/components/ProductCard.vue'

const products = ref([])

onMounted(async () => {
  const { data } = await getAllProducts()
  products.value = data
})
</script>

<style scoped>
/* Using Bootstrap grid and utilities instead of local grid CSS. */
</style>
