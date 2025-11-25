<template>
  <div class="container mt-4">
    <div class="row g-3">
      <div class="col-md-6">
        <img :src="product.image" class="img-fluid" alt="Product Image" />
      </div>

      <div class="col-md-6">
        <h2 class="bold">{{ product.title }}</h2>

        <p class="bold">{{ product.description }}</p>

        <h4 class="text-success">{{ product.price }} €</h4>

        <div class="d-flex align-items-center my-3">
          <button class="btn btn-outline-secondary" @click="decreaseQty">-</button>
          <input disabled="disabled" type="number" class="form-control text-center mx-2" v-model="quantity" min="1" style="width: 70px;" />
          <button class="btn btn-outline-secondary" @click="increaseQty">+</button>
        </div>

        <button class="btn btn-success" @click="achterproduct">Ajouter au panier</button>

        <!-- Replace <b-alert> with a standard Bootstrap alert -->
        <div v-if="showDismissibleAlert" class="alert alert-success alert-dismissible fade show mt-3" role="alert">
          Produit ajouté au panier
          <button type="button" class="btn-close" aria-label="Close" @click="showDismissibleAlert = false"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getProduct } from '@/services/api';
import { setCartProduct } from '@/services/cart';

const route = useRoute();
const product = ref({
  title: '',
  description: '',
  price: 0,
  image: ''
});
const quantity = ref(1);
const showDismissibleAlert = ref(false);

onMounted(async () => {
  const productId = route.params.id;
  const resp = await getProduct(productId);
  product.value = resp.data;
  console.log(product);
});

function increaseQty() {
  quantity.value++;
}
function decreaseQty() {
  if (quantity.value > 1) quantity.value--;
}

function achterproduct() {
  setCartProduct(product.value, quantity.value);
  showDismissibleAlert.value = true;
  setTimeout(() => {
    showDismissibleAlert.value = false;
  }, 3000);
}
</script>

<style>
.bold {
  font-weight: bold;
}
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