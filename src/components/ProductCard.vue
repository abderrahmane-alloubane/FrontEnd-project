<template>
  <div class="card mb-3 shadow-sm w-100" style="max-width: 900px; margin: 0 auto">
    <div class="row g-0 align-items-center" style="min-height: 120px">
      <div class="col-auto p-3">
        <img
          :src="product.image"
          alt="product image"
          class="img-fluid rounded"
          style="width: 100px; height: 100px; object-fit: contain"
        />
      </div>
      <div class="col px-3">
        <div class="d-flex justify-content-between align-items-center h-100">
          <div class="text-truncate" style="max-width: 500px">
            <h5 class="card-title mb-1">{{ product.title }}</h5>
            <p class="card-text fw-bold text-success mb-0">{{ product.price }} €</p>
          </div>
          <RouterLink :to="'/product/' + product.id">
            <button class="btn btn-primary btn-sm">Voir</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
}
)

</script>
