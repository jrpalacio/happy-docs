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
  try {
    initializeWithCurrentDate()
  } catch (error) {
    console.error('Error initializing date store:', error)
  }
})

const formattedDate = computed(() => {
  if (!datePayload.value) return null
  
  return {
    day: new Date(currentDate.value).getDate(),
    month: new Date(currentDate.value).toLocaleDateString('es-ES', { month: 'long' }),
    year: new Date(currentDate.value).getFullYear(),
    weekday: new Date(currentDate.value).toLocaleDateString('es-ES', { weekday: 'long' }),
    shortFormat: datePayload.value.shortFormat,
    longFormat: datePayload.value.longFormat
  }
})

const isToday = computed(() => {
  if (!currentDate.value) return false
  
  const today = new Date()
  return currentDate.value.toDateString() === today.toDateString()
})

const isYesterday = computed(() => {
  if (!currentDate.value) return false
  
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return currentDate.value.toDateString() === yesterday.toDateString()
})

const isTomorrow = computed(() => {
  if (!currentDate.value) return false
  
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return currentDate.value.toDateString() === tomorrow.toDateString()
})

const getDateLabel = computed(() => {
  if (isToday.value) return 'Hoy'
  if (isYesterday.value) return 'Ayer'
  if (isTomorrow.value) return 'Mañana'
  return formattedDate.value?.weekday || 'Fecha no disponible'
})
</script>

<template>
  <div class="flex items-center justify-between rounded-lg p-4 mb-4">
    <button 
      type="button" 
      class="text-orange-500 p-2 rounded-xl cursor-pointer hover:bg-orange-500 hover:text-white transition-colors" 
      @click="previousDate"
      title="Día anterior"
    >
      <IconCaretleft class="size-6"/>
    </button>

    <div class="text-center">
        <!-- Día de la semana -->
      <div class="text-gray-300 text-sm mb-2">
        {{ getDateLabel }}
      </div>
      <!-- Día del mes -->
      <div class="text-4xl font-bold text-orange-400 mb-1">
        {{ formattedDate?.day || '--' }}
      </div>
      
      <!-- Mes y año -->
      <div class="text-white text-sm">
        {{ formattedDate?.month || 'Mes' }} de {{ formattedDate?.year || 'Año' }}
      </div>
      
      <!-- Botón "Ir a hoy" -->
      <div v-if="!isToday" class="mt-2">
        <button 
          @click="goToToday"
          class="text-xs text-orange-400 hover:text-orange-300 underline"
          title="Ir a hoy"
        >
          Ir a hoy
        </button>
      </div>
    </div>

    <button 
      type="button" 
      class="text-orange-500 p-2 rounded-xl cursor-pointer hover:bg-orange-500 hover:text-white transition-colors" 
      @click="nextDate"
      title="Día siguiente"
    >
      <IconCaretright class="size-6"/>
    </button>
  </div>
</template> 