// stores/cart.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  const isDrawerOpen = ref(false)
  const lastAdded = ref(null) // for feedback animations

  // ── Getters ──────────────────────────────────────────────
  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const subtotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const deliveryFee = computed(() => {
    if (items.value.length === 0) return 0
    // Use the fee from the first restaurant in cart
    return items.value[0]?.restaurantDeliveryFee ?? 0
  })

  const total = computed(() => subtotal.value + deliveryFee.value)

  const isEmpty = computed(() => items.value.length === 0)

  const restaurantId = computed(() =>
    items.value.length > 0 ? items.value[0].restaurantId : null
  )

  const restaurantName = computed(() =>
    items.value.length > 0 ? items.value[0].restaurantName : null
  )

  // ── Actions ──────────────────────────────────────────────
  function addItem(product, restaurant) {
    const existing = items.value.find(i => i.id === product.id)

    if (existing) {
      existing.quantity++
    } else {
      // If cart has items from a DIFFERENT restaurant, clear first
      if (items.value.length > 0 && items.value[0].restaurantId !== restaurant.id) {
        items.value = []
      }
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        restaurantDeliveryFee: restaurant.deliveryFee,
      })
    }

    lastAdded.value = product.id
    setTimeout(() => { lastAdded.value = null }, 600)
  }

  function removeItem(productId) {
    items.value = items.value.filter(i => i.id !== productId)
  }

  function decreaseItem(productId) {
    const item = items.value.find(i => i.id === productId)
    if (!item) return
    if (item.quantity <= 1) {
      removeItem(productId)
    } else {
      item.quantity--
    }
  }

  function increaseItem(productId) {
    const item = items.value.find(i => i.id === productId)
    if (item) item.quantity++
  }

  function clearCart() {
    items.value = []
  }

  function openDrawer() {
    isDrawerOpen.value = true
  }

  function closeDrawer() {
    isDrawerOpen.value = false
  }

  function toggleDrawer() {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  function getItemQuantity(productId) {
    return items.value.find(i => i.id === productId)?.quantity ?? 0
  }

  return {
    items,
    isDrawerOpen,
    lastAdded,
    // getters
    totalItems,
    subtotal,
    deliveryFee,
    total,
    isEmpty,
    restaurantId,
    restaurantName,
    // actions
    addItem,
    removeItem,
    decreaseItem,
    increaseItem,
    clearCart,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    getItemQuantity,
  }
})
