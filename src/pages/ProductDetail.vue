<template>
  <div class="container mt-24">
    <div class="flex g-3 max-sm:flex-col justify-between gap-10">
      <div class="col-md-6 flex aspect-square h-128">
        <img :src="product.image" class="img-fluid max-h-128" alt="Product Image" />
      </div>

      <div class="col-md-6 flex flex-col gap-4">
        <h2 class=" text-6xl">{{ product.title }}</h2>

        <p class="text-sm">{{ product.description }}</p>
        <div class=" flex justify-end">
          <h4 class=" text-green-500 p-2 text-2xl">{{ product.price }} €</h4>
        </div>


        <div class="flex items-center justify-between">
          <div class="bg-slate-50 border-2 border-black/30 rounded-lg">
            <button
              class="border-r border-black/20 rounded-l-md p-2 hover:bg-orange-600 hover:text-white transition duration-300"
              @click="decreaseQty">-</button>
            <input disabled="disabled" type="number" class="form-control text-center mx-2" v-model="quantity" min="1"
              style="width: 70px;" />
            <button
              class=" border-l border-black/20 rounded-r-md p-2 hover:bg-orange-600 hover:text-white transition duration-300"
              @click="increaseQty">+</button>
          </div>
          <div>
            <button
              class="bg-orange-600 flex items-center  hover:bg-white hover:border hover:border-orange-600 hover:text-orange-600 text-white to:scale-105 font-semibold py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto"
              @click="achterproduct">Ajouter au panier</button>

            <!-- Replace <b-alert> with a standard Bootstrap alert -->
            <div v-if="showDismissibleAlert" class="text-green-100" role="alert">
              Produit ajouté au panier
              <button type="button" class="btn-close" aria-label="Close" @click="showDismissibleAlert = false"></button>
            </div>
          </div>


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