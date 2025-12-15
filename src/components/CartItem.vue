<template>
  <div
    class="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100">
    <div class="flex flex-col sm:flex-row items-center p-6 gap-6">
      <!-- Product Image -->
      <div class="flex-shrink-0">
        <div
          class="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          <img :src="product.image" :alt="product.title" class="w-full h-full object-contain p-2" />
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1 min-w-0">
        <h4 class="text-lg font-bold text-slate-900 truncate mb-2">{{ product.title }}</h4>
        <div class="flex items-baseline gap-2 mb-2">
          <span class="text-2xl font-bold text-indigo-600">{{ product.price }} €</span>
          <span class="text-sm text-slate-500">Per item</span>
        </div>
        <p class="text-sm text-slate-600">Subtotal: <span class="font-bold text-indigo-600">{{ (product.price *
          quantity).toFixed(2) }} €</span></p>
      </div>

      <!-- Quantity Controls -->
      <div class="flex items-center gap-4">
        <div class="flex items-center border-2 border-slate-200 rounded-lg bg-slate-50">
          <button @click="decreaseQty"
            class="w-10 h-10 flex items-center justify-center hover:bg-orange-600 hover:text-white border-r-2 border-black/10 transition-colors text-orange-600 font-bold text-lg rounded-l-md">
            −
          </button>
          <input disabled="disabled" type="number" v-model.number="quantity"
            class="w-12 text-center border-0 bg-transparent font-bold text-slate-900 focus:outline-none" />
          <button @click="increaseQty"
            class="w-10 h-10 flex items-center justify-center hover:bg-orange-600 hover:text-white border-l-2 border-black/10 transition-colors text-orange-600 font-bold text-lg rounded-r-md">
            +
          </button>
        </div>

        <!-- Remove Button -->
        <button @click="removeitem"
          class="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors hover:text-red-700"
          title="Remove from cart">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { removeProduct, setCartProduct } from '@/services/cart'
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['quantity-changed', 'product-removed'])

const quantity = ref(props.product?.qte ?? 1)

function removeitem() {
  removeProduct(props.product)
  emit('product-removed')
}

function increaseQty() {
  quantity.value++
  setCartProduct(props.product, quantity.value)
  emit('quantity-changed')
}

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--
    setCartProduct(props.product, quantity.value)
    emit('quantity-changed')
  } else {
    if (confirm('Remove item?')) {
      removeProduct(props.product)
      emit('product-removed')
    }
  }
}
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
