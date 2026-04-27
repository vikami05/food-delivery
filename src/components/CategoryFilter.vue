<script setup>
defineProps({
  categories: { type: Array, required: true },
  modelValue: { type: String, default: 'all' }
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex gap-2 overflow-x-auto scrollbar-hide py-1">
    <button
      v-for="cat in categories"
      :key="cat.id"
      @click="emit('update:modelValue', cat.id)"
      :class="[
        'tag whitespace-nowrap shrink-0 font-medium',
        modelValue === cat.id
          ? 'bg-brand-500 text-white shadow-brand'
          : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-300 hover:text-brand-600'
      ]"
    >
      <span class="mr-1">{{ cat.emoji }}</span>
      {{ cat.label }}
    </button>
  </div>
</template>
