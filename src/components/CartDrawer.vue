<script setup>
import { useCartStore } from '@/stores/cart.js'
import { useRouter } from 'vue-router'

const cart = useCartStore()
const router = useRouter()

function goToCheckout() {
  cart.closeDrawer()
  router.push({ name: 'Checkout' })
}
</script>

<template>
  <teleport to="body">
    <!-- Overlay -->
    <transition name="fade-overlay">
      <div
        v-if="cart.isDrawerOpen"
        class="drawer-overlay"
        @click="cart.closeDrawer()"
        aria-hidden="true"
      />
    </transition>

    <!-- Drawer panel -->
    <transition name="slide-drawer">
      <aside
        v-if="cart.isDrawerOpen"
        class="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 class="font-display font-bold text-xl text-dark-800">Tu Carrito</h2>
            <p v-if="cart.restaurantName" class="text-xs text-gray-500 mt-0.5">
              {{ cart.restaurantName }}
            </p>
          </div>
          <button
            @click="cart.closeDrawer()"
            class="w-9 h-9 rounded-xl hover:bg-gray-100 active:scale-90 flex items-center justify-center text-gray-500 transition-all"
            aria-label="Cerrar carrito"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="cart.isEmpty" class="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div class="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center text-5xl mb-4">
            🛒
          </div>
          <h3 class="font-display font-bold text-lg text-dark-700 mb-2">Tu carrito está vacío</h3>
          <p class="text-sm text-gray-500 mb-6">
            Agrega productos de un restaurante para comenzar tu pedido
          </p>
          <button
            @click="cart.closeDrawer()"
            class="btn-primary"
          >
            Explorar restaurantes
          </button>
        </div>

        <!-- Items list -->
        <div v-else class="flex-1 overflow-y-auto drawer-scroll">
          <div class="p-4 space-y-3">
            <transition-group name="cart-item" tag="div" class="space-y-3">
              <div
                v-for="item in cart.items"
                :key="item.id"
                class="flex gap-3 p-3 rounded-2xl bg-gray-50 group"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-16 h-16 object-cover rounded-xl shrink-0"
                  @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=60'"
                />
                <div class="flex-1 min-w-0">
                  <div class="flex items-start justify-between gap-1">
                    <h4 class="text-sm font-semibold text-dark-800 leading-tight line-clamp-1">
                      {{ item.name }}
                    </h4>
                    <button
                      @click="cart.removeItem(item.id)"
                      class="shrink-0 w-5 h-5 text-gray-300 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                      aria-label="Eliminar item"
                    >
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                  <p class="text-sm font-bold text-brand-500 mt-1">
                    ${{ (item.price * item.quantity).toFixed(2) }}
                  </p>

                  <!-- Quantity control -->
                  <div class="flex items-center gap-2 mt-2">
                    <button
                      @click="cart.decreaseItem(item.id)"
                      class="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:border-brand-300 active:scale-90 flex items-center justify-center transition-all"
                    >
                      <svg class="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M20 12H4"/>
                      </svg>
                    </button>
                    <span class="w-5 text-center text-sm font-bold text-dark-800">{{ item.quantity }}</span>
                    <button
                      @click="cart.increaseItem(item.id)"
                      class="w-7 h-7 rounded-lg bg-brand-500 hover:bg-brand-600 active:scale-90 flex items-center justify-center transition-all"
                    >
                      <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
        </div>

        <!-- Footer summary + checkout -->
        <div v-if="!cart.isEmpty" class="border-t border-gray-100 p-5 space-y-3">
          <!-- Add special instructions -->
          <div class="p-3 rounded-xl bg-gray-50 flex items-center gap-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
            Agregar instrucciones especiales
          </div>

          <!-- Totals -->
          <div class="space-y-2 text-sm">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span class="font-semibold">${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Envío</span>
              <span :class="cart.deliveryFee === 0 ? 'text-emerald-600 font-semibold' : 'font-semibold'">
                {{ cart.deliveryFee === 0 ? 'Gratis 🎉' : `$${cart.deliveryFee.toFixed(2)}` }}
              </span>
            </div>
            <div class="flex justify-between font-bold text-base text-dark-800 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span class="text-brand-500">${{ cart.total.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Checkout button -->
          <button
            @click="goToCheckout"
            class="w-full btn-primary justify-center text-base py-3.5"
          >
            Confirmar pedido · ${{ cart.total.toFixed(2) }}
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </aside>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-overlay-enter-active, .fade-overlay-leave-active { transition: opacity 0.3s ease; }
.fade-overlay-enter-from, .fade-overlay-leave-to { opacity: 0; }

.slide-drawer-enter-active { animation: slideInRight 0.35s cubic-bezier(0.16,1,0.3,1); }
.slide-drawer-leave-active { animation: slideInRight 0.25s ease reverse; }
@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

.cart-item-enter-active { animation: fadeSlideIn 0.3s ease; }
.cart-item-leave-active { animation: fadeSlideIn 0.2s ease reverse; }
.cart-item-move        { transition: transform 0.3s ease; }
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>
