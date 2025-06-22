<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDateStore } from '../../stores'

const dateStore = useDateStore()
const { currentDate, datePayload } = storeToRefs(dateStore)

const formattedDate = computed(() => {
  if (!datePayload.value) return 'Fecha no disponible'
  
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
  return formattedDate.value.weekday
})
</script>

<template>
  <div class="bg-gray-800 rounded-lg p-4 mb-4">
    <div class="text-center">
      <!-- Día del mes -->
      <div class="text-4xl font-bold text-orange-400 mb-1">
        {{ formattedDate.day }}
      </div>
      
      <!-- Mes y año -->
      <div class="text-white font-medium mb-2">
        {{ formattedDate.month }} {{ formattedDate.year }}
      </div>
      
      <!-- Día de la semana -->
      <div class="text-gray-300 text-sm mb-3">
        {{ getDateLabel }}
      </div>
      
      <!-- Indicador de fecha actual -->
      <div v-if="isToday" class="inline-block px-3 py-1 bg-green-600 text-white text-xs rounded-full">
        Fecha actual
      </div>
      <div v-else-if="isYesterday" class="inline-block px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
        Ayer
      </div>
      <div v-else-if="isTomorrow" class="inline-block px-3 py-1 bg-purple-600 text-white text-xs rounded-full">
        Mañana
      </div>
      <div v-else class="inline-block px-3 py-1 bg-gray-600 text-white text-xs rounded-full">
        {{ formattedDate.shortFormat }}
      </div>
    </div>
  </div>
</template> 