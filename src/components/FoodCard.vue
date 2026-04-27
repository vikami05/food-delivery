<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart.js'

const props = defineProps({
  item: { type: Object, required: true },
  restaurant: { type: Object, required: true }
})

const cart = useCartStore()

const quantity = computed(() => cart.getItemQuantity(props.item.id))
const isJustAdded = computed(() => cart.lastAdded === props.item.id)

function addToCart() {
  cart.addItem(props.item, props.restaurant)
}

function increase() {
  cart.increaseItem(props.item.id)
}

function decrease() {
  cart.decreaseItem(props.item.id)
}
</script>

<template>
  <div
    :class="[
      'card p-4 flex gap-4 transition-all duration-300',
      isJustAdded ? 'ring-2 ring-brand-400 ring-offset-1' : ''
    ]"
  >
    <!-- Image -->
    <div class="relative shrink-0">
      <img
        :src="item.image"
        :alt="item.name"
        loading="lazy"
        class="w-24 h-24 object-cover rounded-xl bg-gray-100"
        @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&q=60'"
      />
      <!-- Badge -->
      <span
        v-if="item.badge"
        class="absolute -top-1.5 -left-1.5 badge text-white text-[10px]"
        :class="{
          'bg-brand-500': item.badge === 'Best Seller' || item.badge === 'Favorito',
          'bg-emerald-500': item.badge === 'Vegan',
          'bg-rose-500': item.badge === '🌶️ Hot' || item.badge === 'Viral' || item.badge === '🔥 Trending',
          'bg-purple-500': item.badge === 'Premium' || item.badge === 'Chef Special',
          'bg-sky-500': item.badge === 'Nuevo',
          'bg-amber-500': item.badge === 'Must try' || item.badge === 'Clásico' || item.badge === 'Clásica',
        }"
      >
        {{ item.badge }}
      </span>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0 flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between gap-2">
          <h4 class="font-display font-semibold text-dark-800 text-sm leading-snug">
            {{ item.name }}
          </h4>
          <span v-if="item.popular" class="shrink-0 text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">
            ⭐ Popular
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
          {{ item.description }}
        </p>
        <p class="text-xs text-gray-400 mt-1">
          {{ item.calories }} kcal
        </p>
      </div>

      <!-- Price + Add button -->
      <div class="flex items-center justify-between mt-3">
        <span class="font-display font-bold text-dark-800">
          ${{ item.price.toFixed(2) }}
        </span>

        <!-- Quantity control (shown when item is in cart) -->
        <div v-if="quantity > 0" class="flex items-center gap-2">
          <button
            @click="decrease"
            class="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 active:scale-90 flex items-center justify-center text-dark-700 font-bold transition-all"
            aria-label="Disminuir cantidad"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4"/>
            </svg>
          </button>
          <span class="w-6 text-center font-bold text-dark-800 text-sm">{{ quantity }}</span>
          <button
            @click="increase"
            class="w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-600 active:scale-90 flex items-center justify-center text-white transition-all shadow-sm"
            aria-label="Aumentar cantidad"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
            </svg>
          </button>
        </div>

        <!-- Add button (shown when not in cart) -->
        <button
          v-else
          @click="addToCart"
          class="flex items-center gap-1.5 px-3 py-2 bg-brand-500 hover:bg-brand-600 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-brand"
          aria-label="Agregar al carrito"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
          </svg>
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>
