<template>
<div class="container max-w-5xl mx-auto">
  <div class="mb-8 text-center">
    <h2 class="text-3xl font-bold text-slate-800">
      Votre panier
    </h2>
    <p class="text-sm text-slate-500 mt-1">
      Vérifiez vos articles avant le paiement
    </p>
  </div>

  <div class="flex flex-col gap-4">
    <CartItem
      v-for="p in products"
      :key="p.id"
      :product="p"
      @quantity-changed="handleQuantityChange"
      @product-removed="handleProductRemoved"
    />
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