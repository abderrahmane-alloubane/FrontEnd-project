<template>
  <div class="container">
    <h2 class="m-3 text-center">Votre panier</h2>
    <div class="row gap-2">
      <CartItem v-for="p in products" :key="p.id" :product="p" class="col-6 col-md-4 col-lg-3"
        @quantity-changed="updateTotalPrice" @product-removed="updateTotalPrice" />
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row align-items-center justify-content-between w-100 m-2 p-3 bg-light rounded shadow-sm">
    <div class="d-flex align-items-center mb-2 mb-md-0">
      <strong class="me-2">Total :</strong>
      <span class="fs-5 fw-bold badge text-black" aria-live="polite">{{ totalprice.toFixed(2) }} €</span>
    </div>

    <div class="d-flex">
      <button class="btn btn-success" type="button" @click="showCheckout = true">Checkout</button>
    </div>
  </div>

  <CheckoutModal :show="showCheckout" @close="showCheckout = false" />

</template>

<script setup>
import CheckoutModal from '@/Modals/CheckoutModal.vue'
const showCheckout = ref(false)
import { ref, onMounted, computed } from 'vue'
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
