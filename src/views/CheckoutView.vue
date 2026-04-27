<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart.js'

const router = useRouter()
const cart = useCartStore()

// Form state
const form = ref({
  name: '',
  phone: '',
  address: '',
  apartment: '',
  notes: '',
  paymentMethod: 'card',
})

const cardForm = ref({
  number: '',
  expiry: '',
  cvv: '',
  holder: '',
})

const step = ref(1) // 1: address, 2: payment, 3: confirm
const isSubmitting = ref(false)
const orderPlaced = ref(false)
const orderId = computed(() => `FD-${Math.floor(100000 + Math.random() * 900000)}`)

const paymentMethods = [
  { id: 'card',  label: 'Tarjeta de crédito/débito', icon: '💳' },
  { id: 'cash',  label: 'Efectivo al recibir',        icon: '💵' },
  { id: 'mp',    label: 'Mercado Pago',                icon: '💙' },
]

function formatCardNumber(val) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}
function formatExpiry(val) {
  return val.replace(/\D/g, '').slice(0, 4).replace(/^(\d{2})(\d)/, '$1/$2')
}

function nextStep() {
  if (step.value < 3) step.value++
}
function prevStep() {
  if (step.value > 1) step.value--
}

async function placeOrder() {
  isSubmitting.value = true
  // Simulate API call
  await new Promise(r => setTimeout(r, 1800))
  isSubmitting.value = false
  orderPlaced.value = true
  cart.clearCart()
}

function goHome() {
  router.push({ name: 'Home' })
}

const isStep1Valid = computed(() =>
  form.value.name.trim() && form.value.phone.trim() && form.value.address.trim()
)
</script>

<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 pb-20 pt-6">

    <!-- Order placed success screen -->
    <div v-if="orderPlaced" class="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
      <div class="relative mb-6">
        <div class="w-28 h-28 rounded-full bg-emerald-50 flex items-center justify-center text-6xl animate-pop">
          🎉
        </div>
        <div class="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
      </div>

      <h1 class="font-display font-extrabold text-3xl text-dark-800 mb-2">¡Pedido confirmado!</h1>
      <p class="text-gray-500 mb-1">Tu pedido ha sido enviado al restaurante.</p>
      <p class="text-sm text-gray-400 mb-6">Número de orden: <strong class="text-dark-700">{{ orderId }}</strong></p>

      <!-- Tracking card -->
      <div class="card w-full p-6 mb-8 text-left">
        <h3 class="font-display font-bold text-lg text-dark-700 mb-4">Estado del pedido</h3>
        <div class="space-y-4">
          <div v-for="(s, i) in [
            { label: 'Pedido recibido', time: 'Ahora mismo', done: true },
            { label: 'Preparando tu pedido', time: '~5 min', done: true },
            { label: 'En camino', time: '~15 min', done: false },
            { label: 'Entregado', time: '~25 min', done: false },
          ]" :key="i" class="flex items-center gap-3">
            <div :class="[
              'w-8 h-8 rounded-full flex items-center justify-center shrink-0',
              s.done ? 'bg-brand-500' : 'bg-gray-100'
            ]">
              <svg v-if="s.done" class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
              </svg>
              <div v-else class="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
            <div class="flex-1">
              <p :class="['text-sm font-semibold', s.done ? 'text-dark-800' : 'text-gray-400']">{{ s.label }}</p>
            </div>
            <span :class="['text-xs', s.done ? 'text-brand-500 font-semibold' : 'text-gray-400']">{{ s.time }}</span>
          </div>
        </div>
      </div>

      <button @click="goHome" class="btn-primary px-10 py-3.5 text-base">
        Volver al inicio
      </button>
    </div>

    <!-- Checkout form -->
    <template v-else>
      <!-- Header -->
      <div class="flex items-center gap-3 mb-6">
        <button @click="router.back()" class="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>
        <div>
          <h1 class="font-display font-extrabold text-2xl text-dark-800">Checkout</h1>
          <p class="text-sm text-gray-500">{{ cart.restaurantName }}</p>
        </div>
      </div>

      <!-- Steps indicator -->
      <div class="flex items-center gap-2 mb-8">
        <div v-for="n in 3" :key="n" class="flex items-center gap-2">
          <div :class="[
            'w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-300',
            step > n  ? 'bg-emerald-500 text-white' :
            step === n ? 'bg-brand-500 text-white shadow-brand' :
                         'bg-gray-100 text-gray-400'
          ]">
            <svg v-if="step > n" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
            <span v-else>{{ n }}</span>
          </div>
          <span :class="['text-sm font-medium', step === n ? 'text-dark-700' : 'text-gray-400']">
            {{ ['Dirección', 'Pago', 'Confirmar'][n-1] }}
          </span>
          <div v-if="n < 3" class="flex-1 h-px bg-gray-200 min-w-[20px]"></div>
        </div>
      </div>

      <!-- Step 1: Delivery address -->
      <div v-if="step === 1" class="space-y-5 animate-fade-in">
        <div class="card p-6">
          <h2 class="font-display font-bold text-lg text-dark-800 mb-5">📍 Dirección de entrega</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Nombre completo *</label>
              <input v-model="form.name" type="text" placeholder="Juan García" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Teléfono *</label>
              <input v-model="form.phone" type="tel" placeholder="+54 11 1234-5678" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Dirección *</label>
              <input v-model="form.address" type="text" placeholder="Av. Corrientes 1234" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Piso / Depto</label>
              <input v-model="form.apartment" type="text" placeholder="3° B" class="input-field" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Instrucciones para el repartidor</label>
              <textarea
                v-model="form.notes"
                placeholder="Ej: Tocar el timbre, no llamar por teléfono..."
                rows="2"
                class="input-field resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Delivery info card -->
        <div class="card p-4 flex items-center gap-3 bg-brand-50 border border-brand-100">
          <div class="w-10 h-10 rounded-xl bg-brand-100 flex items-center justify-center text-xl shrink-0">🛵</div>
          <div>
            <p class="text-sm font-semibold text-brand-800">Entrega estimada: {{ cart.items[0] ? '25–35' : '--' }} min</p>
            <p class="text-xs text-brand-600">
              Envío: {{ cart.deliveryFee === 0 ? 'Gratis 🎉' : `$${cart.deliveryFee.toFixed(2)}` }}
            </p>
          </div>
        </div>

        <button
          @click="nextStep"
          :disabled="!isStep1Valid"
          :class="['w-full btn-primary py-4 text-base', !isStep1Valid ? 'opacity-50 cursor-not-allowed' : '']"
        >
          Continuar al pago
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>

      <!-- Step 2: Payment -->
      <div v-if="step === 2" class="space-y-5 animate-fade-in">
        <div class="card p-6">
          <h2 class="font-display font-bold text-lg text-dark-800 mb-5">💳 Método de pago</h2>

          <!-- Payment method selector -->
          <div class="space-y-3 mb-6">
            <label
              v-for="pm in paymentMethods"
              :key="pm.id"
              :class="[
                'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200',
                form.paymentMethod === pm.id
                  ? 'border-brand-400 bg-brand-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              ]"
            >
              <input type="radio" v-model="form.paymentMethod" :value="pm.id" class="sr-only" />
              <span class="text-2xl">{{ pm.icon }}</span>
              <span class="font-semibold text-dark-700">{{ pm.label }}</span>
              <div class="ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all"
                :class="form.paymentMethod === pm.id ? 'border-brand-500 bg-brand-500' : 'border-gray-300'">
                <div v-if="form.paymentMethod === pm.id" class="w-2 h-2 rounded-full bg-white"></div>
              </div>
            </label>
          </div>

          <!-- Card form (shown when card is selected) -->
          <div v-if="form.paymentMethod === 'card'" class="space-y-4 p-5 rounded-2xl bg-gray-50 border border-gray-200">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Número de tarjeta</label>
              <input
                v-model="cardForm.number"
                @input="cardForm.number = formatCardNumber($event.target.value)"
                type="text"
                placeholder="1234 5678 9012 3456"
                maxlength="19"
                class="input-field font-mono tracking-wider"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">Vencimiento</label>
                <input
                  v-model="cardForm.expiry"
                  @input="cardForm.expiry = formatExpiry($event.target.value)"
                  type="text"
                  placeholder="MM/AA"
                  maxlength="5"
                  class="input-field font-mono"
                />
              </div>
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-1.5">CVV</label>
                <input
                  v-model="cardForm.cvv"
                  type="text"
                  placeholder="123"
                  maxlength="4"
                  class="input-field font-mono"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-1.5">Titular</label>
              <input v-model="cardForm.holder" type="text" placeholder="JUAN GARCIA" class="input-field uppercase" />
            </div>
          </div>

          <!-- Cash info -->
          <div v-if="form.paymentMethod === 'cash'" class="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
            <span class="text-xl shrink-0">💡</span>
            <p class="text-sm text-amber-800">
              Prepará el monto exacto: <strong>${{ cart.total.toFixed(2) }}</strong>. El repartidor no siempre tiene cambio.
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="prevStep" class="btn-secondary flex-1 py-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>
          <button @click="nextStep" class="btn-primary flex-1 py-4">
            Revisar pedido
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Step 3: Confirm order -->
      <div v-if="step === 3" class="space-y-5 animate-fade-in">
        <!-- Order summary -->
        <div class="card p-6">
          <h2 class="font-display font-bold text-lg text-dark-800 mb-4">📋 Resumen del pedido</h2>
          <div class="space-y-3">
            <div v-for="item in cart.items" :key="item.id" class="flex items-center gap-3">
              <img :src="item.image" :alt="item.name" class="w-12 h-12 rounded-xl object-cover bg-gray-100"
                @error="(e) => e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&q=60'" />
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-dark-700 truncate">{{ item.name }}</p>
                <p class="text-xs text-gray-400">x{{ item.quantity }}</p>
              </div>
              <span class="text-sm font-bold text-dark-700">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>

          <div class="mt-5 pt-4 border-t border-gray-100 space-y-2">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>${{ cart.subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-sm text-gray-600">
              <span>Envío</span>
              <span :class="cart.deliveryFee === 0 ? 'text-emerald-600 font-semibold' : ''">
                {{ cart.deliveryFee === 0 ? 'Gratis' : `$${cart.deliveryFee.toFixed(2)}` }}
              </span>
            </div>
            <div class="flex justify-between font-bold text-base text-dark-800 pt-2 border-t border-gray-100">
              <span>Total</span>
              <span class="text-brand-500">${{ cart.total.toFixed(2) }}</span>
            </div>
          </div>
        </div>

        <!-- Delivery info summary -->
        <div class="card p-5">
          <h3 class="font-display font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">Entrega en</h3>
          <div class="flex items-start gap-2">
            <svg class="w-5 h-5 text-brand-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <p class="font-semibold text-dark-700">{{ form.address }} {{ form.apartment }}</p>
              <p class="text-sm text-gray-500">{{ form.name }} · {{ form.phone }}</p>
            </div>
          </div>
        </div>

        <!-- Payment summary -->
        <div class="card p-5">
          <h3 class="font-display font-bold text-sm text-gray-500 uppercase tracking-wider mb-3">Pago con</h3>
          <div class="flex items-center gap-2">
            <span class="text-2xl">{{ paymentMethods.find(p => p.id === form.paymentMethod)?.icon }}</span>
            <span class="font-semibold text-dark-700">
              {{ paymentMethods.find(p => p.id === form.paymentMethod)?.label }}
            </span>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="prevStep" class="btn-secondary flex-1 py-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>
          <button
            @click="placeOrder"
            :disabled="isSubmitting"
            class="btn-primary flex-1 py-4 text-base relative overflow-hidden"
          >
            <span v-if="!isSubmitting" class="flex items-center gap-2">
              Confirmar pedido
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
            </span>
            <span v-else class="flex items-center gap-2">
              <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Procesando...
            </span>
          </button>
        </div>
      </div>

      <!-- Empty cart redirect -->
      <div v-if="cart.isEmpty && !orderPlaced" class="flex flex-col items-center justify-center min-h-[40vh] text-center">
        <div class="text-6xl mb-4">🛒</div>
        <h3 class="font-display font-bold text-xl text-dark-700 mb-2">Tu carrito está vacío</h3>
        <p class="text-gray-500 text-sm mb-6">Agrega productos antes de hacer checkout</p>
        <button @click="router.push({ name: 'Home' })" class="btn-primary">
          Explorar restaurantes
        </button>
      </div>
    </template>
  </div>
</template>
