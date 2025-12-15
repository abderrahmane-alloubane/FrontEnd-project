<template>
  <div class="mt-20">
    <CartManager @total-changed="handleTotalChanged" />

    <div class="flex justify-between p-4">
      <div>
        <strong class="me-2">Total :</strong>
        <span class="fs-5 fw-bold badge text-black" aria-live="polite">{{ totalprice.toFixed(2) }} €</span>
      </div>

      <button
        class="bg-green-500 px-4 py-2 border border-green-500 rounded-lg text-white hover:text-green-500 hover:bg-white hover:border hover:border-dashed hover:border-green-500 transition duration-300"
        type="button" @click="showCheckout = true">Checkout</button>
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