<template>
  <div class="container">
    <h2 class="m-3 text-center">Votre panier</h2>
    <div class="row gap-2">
      <CartItem v-for="p in products" :key="p.id" :product="p" class="col-6 col-md-4 col-lg-3"
        @quantity-changed="handleQuantityChange" @product-removed="handleProductRemoved" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import CartItem from './CartItem.vue';
import { getCartProducts, savetotalprice } from '@/services/cart';

const emit = defineEmits(['total-changed'])

const products = ref([])
const totalprice = computed(() => {
  let total = products.value.reduce((sum, product) => {
    return sum + (Number(product.price) * Number(product.qte) || 0);
  }, 0);
  savetotalprice(total)
  emit('total-changed', total) // Emit the total when it changes
  return total
});

function handleQuantityChange() {
  products.value = getCartProducts();
}

function handleProductRemoved() {
  products.value = getCartProducts();
}

onMounted(() => {
  products.value = getCartProducts();
})

// Watch for changes in products and emit total
watch(products, () => {
  emit('total-changed', totalprice.value)
}, { deep: true })
</script>