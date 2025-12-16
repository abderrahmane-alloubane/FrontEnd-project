<template>
  <div class="min-h-screen relative w-full bg-gradient-to-b from-slate-200 to-slate-300">
    <!-- Header -->
    <header class="top-0 z-50  relative flex justify-center px-6 backdrop-blur-md ">
      <div
        class="max-w-7xl mx-auto absolute rounded-full px-4 w-full  mt-6 sm:px-6 lg:px-8 bg-white border-b border-slate-200/50 shadow-2xl">
        <div class="flex justify-between items-center py-2">
          <!-- Logo -->
          <RouterLink to="/" class="flex items-center group">
            <div class="relative">

              <img src="/favicon.ico" alt="Logo" class="relative w-20 rounded-lg" />
            </div>
          </RouterLink>

          <!-- Navigation -->
          <nav class="flex items-center space-x-1 sm:space-x-2">
            <RouterLink to="/"
              class="nav-link group relative px-3 py-2 text-slate-700 hover:text-primary font-medium transition-colors">
              <span class="relative">
                Accueil
                <span
                  class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </span>
            </RouterLink>
            <RouterLink to="/shop"
              class="nav-link group relative px-3 py-2 text-slate-700 hover:text-primary font-medium transition-colors">
              <span class="relative">
                Boutique
                <span
                  class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
              </span>
            </RouterLink>

            <!-- Cart Button with Badge -->
            <RouterLink to="/checkout" class="relative group px-3 py-2">
              <div class="text-slate-700 hover:text-primary font-medium transition-colors flex items-center space-x-1">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Panier</span>
              </div>
            </RouterLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 text-slate-300 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-white font-bold text-lg mb-4">42 Street</h3>
            <p class="text-sm">Your ultimate destination for premium products and amazing deals.</p>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Quick Links</h4>
            <ul class="space-y-2 text-sm">
              <li>
                <RouterLink to="/" class="hover:text-primary transition-colors">Home</RouterLink>
              </li>
              <li>
                <RouterLink to="/shop" class="hover:text-primary transition-colors">Shop</RouterLink>
              </li>
              <li>
                <RouterLink to="/checkout" class="hover:text-primary transition-colors">Cart</RouterLink>
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-bold mb-4">Contact</h4>
            <p class="text-sm">Email: hello@42Street.com</p>
            <p class="text-sm">Phone: +33 (0) 1 23 45 67 89</p>
          </div>
        </div>
        <div class="border-t border-slate-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 42Street. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
