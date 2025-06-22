<script setup lang="ts">
import { onMounted, computed } from "vue"
import { storeToRefs } from "pinia"
import { useDateStore } from '../../stores'
import { addDay } from "@formkit/tempo"

import IconCaretleft from './icons/IconCaretleft.vue'
import IconCaretright from './icons/IconCaretright.vue'

const dateStore = useDateStore()
const { updateCurrentDate, initializeWithCurrentDate } = dateStore
const { currentDate, datePayload } = storeToRefs(dateStore)

const previousDate = () => {
  if (!currentDate.value) return

  const previousDate = addDay(currentDate.value, -1)
  updateCurrentDate(previousDate)
}

const nextDate = () => {
  if (!currentDate.value) return

  const nextDate = addDay(currentDate.value, 1)
  updateCurrentDate(nextDate)
}

const goToToday = () => {
  updateCurrentDate(new Date())
}

onMounted(() => {
  initializeWithCurrentDate()
})

const dateLongFormat = computed(() => {
  return datePayload.value?.longFormat || 'Fecha no disponible'
})

const isToday = computed(() => {
  if (!currentDate.value) return false
  
  const today = new Date()
  return currentDate.value.toDateString() === today.toDateString()
})
</script>

<template>
  <header class="flex items-center justify-between p-2 border-b border-neutral-200 dark:border-neutral-800">
    <button 
      type="button" 
      class="text-orange-500 p-2 rounded-xl cursor-pointer hover:bg-orange-500 hover:text-white transition-colors" 
      @click="previousDate"
      title="Día anterior"
    >
      <IconCaretleft class="size-6"/>
    </button>
    
    <div class="flex flex-col items-center">
      <p class="text-center text-white font-bold">{{ dateLongFormat }}</p>
      <button 
        v-if="!isToday"
        @click="goToToday"
        class="text-xs text-orange-400 hover:text-orange-300 mt-1 underline"
        title="Ir a hoy"
      >
        Ir a hoy
      </button>
    </div>
    
    <button 
      type="button" 
      class="text-orange-500 p-2 rounded-xl cursor-pointer hover:bg-orange-500 hover:text-white transition-colors" 
      @click="nextDate"
      title="Día siguiente"
    >
      <IconCaretright class="size-6"/>
    </button>
  </header>
</template>

