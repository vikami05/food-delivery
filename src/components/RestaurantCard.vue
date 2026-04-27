<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  restaurant: { type: Object, required: true }
})

const router = useRouter()

function goToRestaurant() {
  router.push({ name: 'Restaurant', params: { id: props.restaurant.id } })
}
</script>

<template>
  <article
    @click="goToRestaurant"
    class="card cursor-pointer overflow-hidden group animate-fade-in"
    role="button"
    :aria-label="`Ver menú de ${restaurant.name}`"
  >
    <!-- Cover image / hero -->
    <div
      class="relative h-44 flex items-center justify-center overflow-hidden"
      :style="{ background: `linear-gradient(135deg, ${restaurant.heroColor}, ${restaurant.heroColor}cc)` }"
    >
      <!-- Pattern overlay -->
      <div class="absolute inset-0 opacity-10 bg-noise"></div>

      <!-- Big emoji -->
      <span class="text-7xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">
        {{ restaurant.coverEmoji }}
      </span>

      <!-- Delivery fee badge -->
      <div class="absolute top-3 right-3">
        <span
          :class="[
            'badge font-bold text-xs',
            restaurant.deliveryFee === 0
              ? 'bg-emerald-500 text-white'
              : 'bg-white/90 text-dark-700'
          ]"
        >
          {{ restaurant.deliveryFee === 0 ? '🎉 Envío gratis' : `$ ${restaurant.deliveryFee.toFixed(2)} envío` }}
        </span>
      </div>

      <!-- Time badge -->
      <div class="absolute bottom-3 left-3">
        <span class="badge bg-black/60 text-white backdrop-blur-sm">
          ⏱ {{ restaurant.deliveryTime }} min
        </span>
      </div>
    </div>

    <!-- Info -->
    <div class="p-4">
      <div class="flex items-start justify-between gap-2 mb-1.5">
        <h3 class="font-display font-bold text-lg text-dark-800 leading-tight group-hover:text-brand-600 transition-colors">
          {{ restaurant.name }}
        </h3>
        <div class="flex items-center gap-1 shrink-0 bg-amber-50 px-2 py-1 rounded-lg">
          <svg class="w-3.5 h-3.5 text-amber-400 fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span class="text-xs font-bold text-amber-700">{{ restaurant.rating }}</span>
          <span class="text-xs text-amber-500">({{ (restaurant.reviews / 1000).toFixed(1) }}k)</span>
        </div>
      </div>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 mt-2">
        <span
          v-for="tag in restaurant.tags.slice(0, 3)"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
        >
          {{ tag }}
        </span>
      </div>

      <!-- CTA row -->
      <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span class="text-xs text-gray-500">
          Mín. ${{ restaurant.minOrder.toFixed(2) }}
        </span>
        <span class="text-xs font-semibold text-brand-500 group-hover:underline flex items-center gap-1">
          Ver menú
          <svg class="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/>
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>
