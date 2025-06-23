<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const handleClickOutside = (event: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div class="relative" ref="menuRef">
    <button
      @click="toggleMenu"
      type="button"
      class="flex items-center gap-2 p-2 rounded-lg transition-colors duration-200"
      :class="{
        'bg-neutral-700 text-white': isOpen,
        'text-neutral-400 hover:bg-neutral-800 hover:text-white': !isOpen
      }"
    >
      <slot name="icon" />
      <span class="text-sm font-medium">Menú</span>
    </button>

    <Transition
      enter-active-class="transition-transform transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0 translate-x-8"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-transform transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 translate-x-8"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-neutral-800/90 backdrop-blur-md shadow-lg ring-1 ring-white/10 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <div class="py-2" role="none">
          <a
            href="/dosis"
            class="flex items-center gap-3 px-4 py-3 text-sm text-neutral-300 transition-colors duration-200 hover:bg-neutral-700 hover:text-white"
            role="menuitem"
            tabindex="-1"
          >
            <span>Dosis</span>
          </a>
          <a
            href="/dosificacion"
            class="flex items-center gap-3 px-4 py-3 text-sm text-neutral-300 transition-colors duration-200 hover:bg-neutral-700 hover:text-white"
            role="menuitem"
            tabindex="-1"
          >
            <span>Dosificación</span>
          </a>
        </div>
      </div>
    </Transition>
  </div>
</template> 