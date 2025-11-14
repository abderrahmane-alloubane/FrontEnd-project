<template>
  <div>
    <header class="d-flex justify-content-between align-items-center p-3 border border-dashed">
      <RouterLink to="/" class="logo fw-bold fs-4 text-decoration-none text-secondary"
        >42Street</RouterLink
      >
      <nav class="d-flex align-items-center">
        <RouterLink to="/" class="nav-link px-2 text-secondary">Accueil</RouterLink>
        <RouterLink to="/shop" class="nav-link px-2 text-secondary">Boutique</RouterLink>
        <RouterLink to="/checkout" class="nav-link px-2 text-secondary">Panier</RouterLink>
      </nav>
    </header>

    <main class="container">
      <RouterView />
    </main>
  </div>
</template>
