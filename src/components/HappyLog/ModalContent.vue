<script setup>
import { defineEmits } from 'vue'

defineProps({
  show: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['close'])

const handleClose = () => {
  emit('close')
}
</script>

<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/50 p-4"
    >
      <div class="relative w-full max-w-sm max-h-full">
        <!-- Modal content -->
        <div class="relative rounded-lg shadow-sm bg-neutral-800 border border-neutral-600">
          <!-- Modal header -->
          <div class="flex items-center justify-between px-4 py-2 border-b border-neutral-600 rounded-t">
            <h3 class="text-lg font-semibold text-white">
              <slot name="header" />
            </h3>
            <button
              @click="handleClose"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-neutral-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
            >
              <svg class="w-3 h-3" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span class="sr-only">Close modal</span>
            </button>
          </div>
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <slot name="body" />
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
