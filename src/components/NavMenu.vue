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
  <div ref="menuRef">
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
        class="fixed inset-0 z-50 flex h-screen w-screen"
        style="backdrop-filter: blur(6px);"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabindex="-1"
      >
        <!-- Fondo semitransparente, cierra al hacer click -->
        <div class="absolute inset-0 h-full w-full bg-black/40" @click="isOpen = false"></div>
        <!-- Drawer -->
        <div
          class="relative ml-auto w-full max-w-xs h-full bg-neutral-800/95 backdrop-blur-xl shadow-xl ring-1 ring-white/10 focus:outline-none flex flex-col"
        >
          <button
            @click="isOpen = false"
            class="absolute top-4 right-4 text-neutral-300 hover:text-white p-2 rounded-full bg-neutral-700/60 hover:bg-neutral-700 transition"
            aria-label="Cerrar menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <div class="py-10 px-6 flex flex-col gap-2 mt-10">
            <a
              href="/dosis"
              class="flex items-center gap-3 px-4 py-3 text-lg text-neutral-200 transition-colors duration-200 hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
              tabindex="-1"
            >
              <span>Dosis</span>
            </a>
            <a
              href="/dosificacion"
              class="flex items-center gap-3 px-4 py-3 text-lg text-neutral-200 transition-colors duration-200 hover:bg-neutral-700 hover:text-white rounded-lg"
              role="menuitem"
              tabindex="-1"
            >
              <span>Dosificación</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template> 