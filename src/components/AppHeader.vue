<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'

const router = useRouter()
const cart = useCartStore()

const searchQuery = ref('')

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'Home', query: { q: searchQuery.value.trim() } })
  }
}

const cartCount = computed(() => cart.totalItems)
</script>

<template>
  <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 shrink-0">
        <div class="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center text-lg shadow-brand">
          🍔
        </div>
        <span class="font-display font-bold text-xl text-dark-800 hidden sm:block">
          Food<span class="text-brand-500">Dash</span>
        </span>
      </router-link>

      <!-- Search -->
      <div class="flex-1 max-w-md mx-auto">
        <form @submit.prevent="handleSearch" class="relative">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Buscar restaurantes..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent transition-all duration-200"
          />
        </form>
      </div>

      <!-- Location pill -->
      <div class="hidden md:flex items-center gap-1.5 text-sm text-gray-600 shrink-0">
        <svg class="w-4 h-4 text-brand-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span class="font-medium">Buenos Aires</span>
      </div>

      <!-- Cart button -->
      <button
        @click="cart.openDrawer()"
        class="relative flex items-center gap-2 btn-primary py-2.5 px-4 shrink-0"
        aria-label="Abrir carrito"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 16H4L5 9z"/>
        </svg>
        <span class="hidden sm:block text-sm font-semibold">Carrito</span>
        <transition name="pop">
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 w-5 h-5 bg-dark-800 text-white text-xs font-bold rounded-full flex items-center justify-center"
            :key="cartCount"
          >
            {{ cartCount }}
          </span>
        </transition>
      </button>
    </div>
  </header>
</template>

<style scoped>
.pop-enter-active { animation: pop 0.35s cubic-bezier(0.34,1.56,0.64,1); }
.pop-leave-active { animation: pop 0.2s ease reverse; }
@keyframes pop {
  from { transform: scale(0.5); opacity: 0; }
  to   { transform: scale(1);   opacity: 1; }
}
</style>
