<template>
    <div class="container">
      <CartManager @total-changed="handleTotalChanged" />
      
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
    </div>
</template>

<script setup>
import { ref } from 'vue';
import CartManager from '@/components/CartManager.vue';
import CheckoutModal from '@/Modals/CheckoutModal.vue';

const showCheckout = ref(false);
const totalprice = ref(0);

function handleTotalChanged(newTotal) {
  totalprice.value = newTotal;
}
</script>