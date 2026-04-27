<script setup>
import AppHeader from '@/components/AppHeader.vue'
import CartDrawer from '@/components/CartDrawer.vue'
</script>

<template>
  <div class="min-h-screen bg-[#f8f7f4]">
    <AppHeader />

    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <CartDrawer />
  </div>
</template>
