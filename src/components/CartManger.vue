<template>
  <div class="container">
    <h2 class="m-3 text-center">Votre panier</h2>
    <div class="row gap-2">
      <CartItem v-for="p in products" :key="p.id" :product="p" class="col-6 col-md-4 col-lg-3" 
        @quantity-changed="updateTotalPrice"
        @product-removed="updateTotalPrice"/>
    </div>
    <p id="total">{{ totalprice}}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, computed} from 'vue'
import CartItem from './CartItem.vue';
import { getCartProducts, savetotalprice } from '@/services/cart';

const products = ref([])
const totalprice = computed(() => {
  let total = products.value.reduce((sum, product) => {
    return sum + (Number(product.price) * Number(product.qte) || 0);
  }, 0);
  savetotalprice(total)
  return total
});

function updateTotalPrice() {
  products.value = getCartProducts();
}


onMounted(() => {
  products.value = getCartProducts();
})
</script>
