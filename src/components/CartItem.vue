<template>
  <div class="card mb-2 shadow-sm w-100" style="max-width: 900px; margin: 0 auto">
    <div class="row align-items-center" style="min-height: 120px">
      <div class="col-auto fl p-3">
        <img
          :src="product.image"
          alt="product image"
          class="img-fluid rounded"
          style="width: 100px; height: 100px; object-fit: contain"
        />
      </div>
      <div class="col px-3">
        <div class="justify-content-between align-items-center h-100">
          <div class="text-truncate" style="max-width: 500px">
            <h5 class="card-title mb-1">{{ product.title }}</h5>
            <p class="card-text fw-bold text-success mb-0">{{ product.price }} €</p>
          </div>
          
        
          
          <div class="d-flex justify-content-end w-100">
            
            <button class="btn btn-outline-secondary" @click="decreaseQty">-</button>
            <input disabled="disabled" type="number" class="form-control text-center mx-2" v-model="quantity" min="1" style="width: 70px;" />
            <button class="btn btn-outline-secondary" @click="increaseQty">+</button>

            <button class="btn btn-danger btn-sm mx-2" @click="removeitem">
              Supprimer
          </button>
          
        </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script setup>
import { removeProduct, setCartProduct } from '@/services/cart';
import { ref } from 'vue';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['quantity-changed', 'product-removed']);

const quantity = ref(props.product?.qte ?? 1);

function removeitem() {
  removeProduct(props.product);
  emit('product-removed');
}

function increaseQty() {
  quantity.value++;
  setCartProduct(props.product, quantity.value);
  emit('quantity-changed');
}

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value--;
    setCartProduct(props.product, quantity.value);
    emit('quantity-changed');
  } else {
    if (confirm('Remove item?')) {
      removeProduct(props.product);
      emit('product-removed');
    }
  }
}
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>