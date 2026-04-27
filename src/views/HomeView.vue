<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRestaurants } from '@/composables/useRestaurants.js'
import CategoryFilter from '@/components/CategoryFilter.vue'
import RestaurantCard from '@/components/RestaurantCard.vue'

const route = useRoute()
const { getCategories, getRestaurants, getFeatured, searchRestaurants } = useRestaurants()

const selectedCategory = ref('all')
const searchQuery = ref(route.query.q || '')

const categories = getCategories()
const featured = getFeatured(3)

const filteredRestaurants = computed(() => {
  if (searchQuery.value) {
    return searchRestaurants(searchQuery.value)
  }
  return getRestaurants(selectedCategory.value)
})

watch(() => route.query.q, (q) => {
  searchQuery.value = q || ''
  if (q) selectedCategory.value = 'all'
})

function clearSearch() {
  searchQuery.value = ''
}
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 pb-16">

    <!-- Hero Banner -->
    <section class="relative mt-6 rounded-3xl overflow-hidden bg-gradient-to-br from-dark-800 via-dark-700 to-brand-900 min-h-[200px] sm:min-h-[260px] flex items-center">
      <!-- Background pattern -->
      <div class="absolute inset-0 bg-noise opacity-30"></div>
      <div class="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-center opacity-20">
        <span class="text-[180px] leading-none select-none">🍔</span>
      </div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-dark-800/90 via-dark-800/60 to-transparent"></div>

      <div class="relative z-10 px-8 py-10 sm:py-12 max-w-lg">
        <div class="inline-flex items-center gap-2 bg-brand-500/20 border border-brand-400/30 text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          🔥 +200 restaurantes disponibles
        </div>
        <h1 class="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-3">
          ¿Qué vas a<br/>
          <span class="text-gradient">pedir hoy?</span>
        </h1>
        <p class="text-gray-400 text-sm sm:text-base leading-relaxed">
          Los mejores restaurantes de la ciudad, directo a tu puerta en minutos.
        </p>

        <!-- Quick stats -->
        <div class="flex gap-5 mt-5">
          <div class="text-center">
            <p class="font-display font-bold text-white text-xl">15 min</p>
            <p class="text-gray-500 text-xs">Entrega mín.</p>
          </div>
          <div class="w-px bg-white/10"></div>
          <div class="text-center">
            <p class="font-display font-bold text-white text-xl">4.8 ★</p>
            <p class="text-gray-500 text-xs">Rating promedio</p>
          </div>
          <div class="w-px bg-white/10"></div>
          <div class="text-center">
            <p class="font-display font-bold text-white text-xl">Gratis</p>
            <p class="text-gray-500 text-xs">Primer envío</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants (top strip) -->
    <section class="mt-10">
      <div class="flex items-center justify-between mb-4">
        <h2 class="section-title">⭐ Destacados</h2>
        <span class="text-sm text-brand-500 font-semibold cursor-pointer hover:underline" @click="selectedCategory = 'all'">Ver todos</span>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <RestaurantCard
          v-for="r in featured"
          :key="r.id"
          :restaurant="r"
        />
      </div>
    </section>

    <!-- Categories + All Restaurants -->
    <section class="mt-10">
      <h2 class="section-title mb-4">🍽️ Todos los Restaurantes</h2>

      <!-- Search active state -->
      <div v-if="searchQuery" class="mb-4 flex items-center gap-2">
        <span class="text-sm text-gray-600">
          Resultados para: <strong class="text-dark-800">"{{ searchQuery }}"</strong>
        </span>
        <button
          @click="clearSearch"
          class="text-xs text-brand-500 hover:underline font-semibold"
        >
          Limpiar
        </button>
      </div>

      <!-- Category filter -->
      <div v-else class="mb-5">
        <CategoryFilter
          v-model="selectedCategory"
          :categories="categories"
        />
      </div>

      <!-- Restaurant grid -->
      <div v-if="filteredRestaurants.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <RestaurantCard
          v-for="r in filteredRestaurants"
          :key="r.id"
          :restaurant="r"
        />
      </div>

      <!-- Empty state -->
      <div v-else class="py-20 text-center">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="font-display font-bold text-xl text-dark-700 mb-2">Sin resultados</h3>
        <p class="text-gray-500 text-sm">
          No encontramos restaurantes para
          <strong>"{{ searchQuery || selectedCategory }}"</strong>
        </p>
        <button @click="clearSearch(); selectedCategory = 'all'" class="btn-primary mt-5">
          Ver todos los restaurantes
        </button>
      </div>
    </section>

    <!-- Promo banner -->
    <section class="mt-12">
      <div class="rounded-3xl bg-gradient-to-r from-brand-500 to-brand-600 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div class="absolute right-4 top-1/2 -translate-y-1/2 text-9xl opacity-10 select-none">🚴</div>
        <div>
          <p class="text-brand-100 text-sm font-semibold mb-1">Oferta limitada</p>
          <h3 class="font-display font-extrabold text-white text-2xl sm:text-3xl mb-2">
            Envío GRATIS<br/>en tu primer pedido
          </h3>
          <p class="text-brand-100 text-sm">Usa el código <strong class="text-white bg-brand-700/40 px-2 py-0.5 rounded-md">FIRST2024</strong> al checkout</p>
        </div>
        <div class="flex gap-3 shrink-0">
          <button class="px-6 py-3 bg-white text-brand-600 font-bold rounded-2xl hover:bg-brand-50 active:scale-95 transition-all shadow-lg">
            Pedir ahora
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
