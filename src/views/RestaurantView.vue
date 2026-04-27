<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRestaurants } from '@/composables/useRestaurants.js'
import { useCartStore } from '@/stores/cart.js'
import FoodCard from '@/components/FoodCard.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const { getRestaurantById } = useRestaurants()

const restaurant = ref(null)
const activeSection = ref(0)
const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    restaurant.value = getRestaurantById(route.params.id)
    loading.value = false
    if (!restaurant.value) router.push({ name: 'Home' })
  }, 300)
})

function scrollToSection(index) {
  activeSection.value = index
  const el = document.getElementById(`section-${index}`)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 pb-20">

    <!-- Skeleton loader -->
    <div v-if="loading" class="animate-pulse">
      <div class="skeleton h-52 rounded-3xl mt-6"></div>
      <div class="mt-6 space-y-3">
        <div class="skeleton h-8 w-48 rounded-xl"></div>
        <div class="skeleton h-4 w-64 rounded-lg"></div>
        <div class="skeleton h-4 w-40 rounded-lg"></div>
      </div>
    </div>

    <template v-else-if="restaurant">
      <!-- Hero -->
      <div
        class="relative mt-6 rounded-3xl overflow-hidden h-48 sm:h-64 flex items-center justify-center"
        :style="{ background: `linear-gradient(135deg, ${restaurant.heroColor}ee, ${restaurant.heroColor}99)` }"
      >
        <div class="absolute inset-0 bg-noise opacity-20"></div>
        <span class="text-8xl sm:text-9xl drop-shadow-2xl z-10">{{ restaurant.coverEmoji }}</span>

        <!-- Back button -->
        <button
          @click="router.back()"
          class="absolute top-4 left-4 w-10 h-10 rounded-xl bg-black/30 hover:bg-black/50 backdrop-blur-sm flex items-center justify-center text-white transition-all active:scale-90"
          aria-label="Volver"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Info pills -->
        <div class="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          <span class="badge bg-black/50 text-white backdrop-blur-sm">⏱ {{ restaurant.deliveryTime }} min</span>
          <span class="badge bg-black/50 text-white backdrop-blur-sm">
            {{ restaurant.deliveryFee === 0 ? '🎉 Envío gratis' : `🛵 $${restaurant.deliveryFee.toFixed(2)} envío` }}
          </span>
          <span class="badge bg-amber-400/90 text-amber-900 backdrop-blur-sm">
            ★ {{ restaurant.rating }} ({{ restaurant.reviews.toLocaleString() }})
          </span>
        </div>
      </div>

      <!-- Restaurant info -->
      <div class="mt-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h1 class="font-display font-extrabold text-2xl sm:text-3xl text-dark-800 leading-tight">
              {{ restaurant.name }}
            </h1>
            <p class="text-gray-500 text-sm mt-2 leading-relaxed max-w-xl">
              {{ restaurant.description }}
            </p>
          </div>
        </div>

        <!-- Tags row -->
        <div class="flex flex-wrap gap-2 mt-4">
          <span
            v-for="tag in restaurant.tags"
            :key="tag"
            class="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium border border-gray-200"
          >
            {{ tag }}
          </span>
          <span class="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 font-medium border border-gray-200">
            Mín. ${{ restaurant.minOrder.toFixed(2) }}
          </span>
        </div>
      </div>

      <!-- Section nav tabs -->
      <div class="sticky top-16 z-20 bg-[#f8f7f4] pt-4 pb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 border-b border-gray-200 mt-6">
        <div class="flex gap-1 overflow-x-auto scrollbar-hide">
          <button
            v-for="(section, idx) in restaurant.menu"
            :key="idx"
            @click="scrollToSection(idx)"
            :class="[
              'whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 shrink-0',
              activeSection === idx
                ? 'bg-brand-500 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            ]"
          >
            {{ section.section }}
          </button>
        </div>
      </div>

      <!-- Menu sections -->
      <div class="mt-6 space-y-10">
        <div
          v-for="(section, idx) in restaurant.menu"
          :key="idx"
          :id="`section-${idx}`"
        >
          <h2 class="font-display font-bold text-lg text-dark-800 mb-4">
            {{ section.section }}
          </h2>
          <div class="space-y-3">
            <FoodCard
              v-for="item in section.items"
              :key="item.id"
              :item="item"
              :restaurant="restaurant"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Floating cart bar (shown when cart has items from this restaurant) -->
    <transition name="slide-up">
      <div
        v-if="!cart.isEmpty && cart.restaurantId === restaurant?.id"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-2rem)] max-w-sm"
      >
        <button
          @click="cart.openDrawer()"
          class="w-full btn-primary justify-between px-5 py-4 rounded-2xl shadow-brand text-base"
        >
          <span class="w-7 h-7 bg-brand-600 rounded-xl flex items-center justify-center font-bold text-sm">
            {{ cart.totalItems }}
          </span>
          <span class="font-bold">Ver carrito</span>
          <span class="font-bold">${{ cart.total.toFixed(2) }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-up-enter-active { animation: slideUp 0.4s cubic-bezier(0.16,1,0.3,1); }
.slide-up-leave-active { animation: slideUp 0.25s ease reverse; }
@keyframes slideUp {
  from { transform: translateX(-50%) translateY(80px); opacity: 0; }
  to   { transform: translateX(-50%) translateY(0);   opacity: 1; }
}
</style>
