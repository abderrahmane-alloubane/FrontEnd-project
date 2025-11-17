<template>
  <div>
    
    <div class="nav align-items-center justify-content-between">
      <h2>Tous les produits</h2>
      <div class="d-flex">
        <select name="category" id="category" class="form-select w-auto" v-model="selectedCategory">
          <option value="" selected>Choisir une catégorie</option>
          <option v-for="c in categories" :key="c" :value="c">
            {{ c }}
          </option>
        </select>
        <button @click="Rechercher" class="btn btn-outline-secondary">Rechercher</button> 
      </div>
      
    </div>
    <div class="row g-3">
      <div v-for="p in products" :key="p.id" class="col-12">
        <ProductCard :product="p" />
      </div>
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

async function Rechercher(){
  try {
    let data  = await getAllProducts()
    let resp = data.data   // your full list of products

    // If no category selected, show all products
    if (!selectedCategory.value) {
      products.value = resp
      return
    }
    console.log("Selected category:", selectedCategory.value);
    console.log("All product categories:", resp.map(p => p.category));

    products.value = resp.filter(product => product.category == selectedCategory.value)
  } catch (error) {
    console.error("Failed to fetch or filter products:", error)
  }
}


</script>

