<template>
  <div>
    <h2>Produits populaires</h2>
    <div class="row g-3">
      <div v-for="p in products" :key="p.id" class="col-6 col-md-4 col-lg-3">
        <ProductCard :product="p" />
      </div>
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
</script>

<style scoped>
/* Layout now uses Bootstrap row/col utilities; keep this file minimal. */
</style>
