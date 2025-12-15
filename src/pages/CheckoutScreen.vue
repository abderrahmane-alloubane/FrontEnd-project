<template>
<div class="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 mt-24 p-4 rounded-2xl shadow-lg">
  <CartManager @total-changed="handleTotalChanged" />

  <div class="max-w-5xl mx-auto px-4 mt-8">
    <div class="bg-white rounded-2xl shadow-md p-6 border border-indigo-100">
      <div class="mb-6 text-center">
        <p class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Total à payer : {{ totalprice.toFixed(2) }} €
        </p>
      </div>

            <!-- Confirm Button -->
        <button v-if="totalprice > 0" 
          @click="showCheckout = true"
          class="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
          Confirmer le paiement
        </button>
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