<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductLogStore, useDateStore } from '../../stores'

const productLogStore = useProductLogStore()
const dateStore = useDateStore()
const { currentDate } = storeToRefs(dateStore)

// Obtener registros del día seleccionado
const dailyLogs = computed(() => {
  if (!currentDate.value) {
    console.log('DailyStats: No hay fecha actual')
    return []
  }
  
  const selectedDate = currentDate.value.toISOString().split('T')[0]
  console.log('DailyStats: Buscando registros para fecha:', selectedDate)
  
  const logs = productLogStore.getLogsByDateRange(selectedDate, selectedDate)
  console.log('DailyStats: Registros encontrados:', logs.length)
  
  return logs
})

// Estadísticas del día
const dailyStats = computed(() => {
  const logs = dailyLogs.value
  
  if (logs.length === 0) {
    return {
      totalEntries: 0,
      totalPortions: 0,
      uniqueProducts: 0,
      averagePortions: 0,
      productsUsed: []
    }
  }

  const totalPortions = logs.reduce((sum, log) => sum + log.portion, 0)
  const uniqueProducts = new Set(logs.map(log => log.productId)).size
  const averagePortions = totalPortions / logs.length
  const productsUsed = logs.map(log => log.productName)

  return {
    totalEntries: logs.length,
    totalPortions,
    uniqueProducts,
    averagePortions: Math.round(averagePortions * 100) / 100,
    productsUsed
  }
})

// Verificar si es hoy
const isToday = computed(() => {
  if (!currentDate.value) return false
  
  const today = new Date()
  return currentDate.value.toDateString() === today.toDateString()
})

// Verificar si hay registros
const hasEntries = computed(() => dailyStats.value.totalEntries > 0)
</script>

<template>
  <div v-if="hasEntries" class="bg-neutral-800 rounded-lg p-4 mb-4">
    <div class="flex items-center justify-between mb-3">
      <h3 class="text-white font-semibold">
        {{ isToday ? 'Hoy' : 'Día seleccionado' }}
      </h3>
      <span class="text-orange-400 font-bold">{{ dailyStats.totalEntries }}</span>
    </div>
    
    <div class="grid grid-cols-2 gap-4 text-sm">
      <div class="text-gray-300">
        <span class="text-orange-400 font-bold">{{ dailyStats.totalPortions }}</span> porciones
      </div>
      <div class="text-gray-300">
        <span class="text-orange-400 font-bold">{{ dailyStats.uniqueProducts }}</span> productos
      </div>
      <div class="text-gray-300">
        <span class="text-orange-400 font-bold">{{ dailyStats.averagePortions }}</span> promedio
      </div>
      <div class="text-gray-300">
        <span class="text-orange-400 font-bold">{{ dailyStats.productsUsed.length }}</span> tipos
      </div>
    </div>
    
    <!-- Productos usados hoy -->
    <div v-if="dailyStats.productsUsed.length > 0" class="mt-3 pt-3 border-t border-gray-700">
      <h4 class="text-gray-300 text-sm mb-2">Productos utilizados:</h4>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="product in dailyStats.productsUsed" 
          :key="product"
          class="text-xs px-2 py-1 bg-orange-900 text-orange-200 rounded-full"
        >
          {{ product }}
        </span>
      </div>
    </div>
    
    <!-- Debug info -->
    <div class="mt-2 text-xs text-gray-500">
      Fecha actual: {{ currentDate ? currentDate.toISOString().split('T')[0] : 'No disponible' }} | 
      Registros del día: {{ dailyLogs.length }}
    </div>
  </div>
  
  <!-- Mensaje cuando no hay registros -->
  <div v-else class="bg-neutral-800 rounded-lg p-4 mb-4 text-center">
    <p class="text-gray-400 text-sm">
      {{ isToday ? 'No hay registros para hoy' : 'No hay registros para este día' }}
    </p>
    <p class="text-gray-500 text-xs mt-1">
      Agrega tu primera dosis para comenzar
    </p>
    <!-- Debug info -->
    <div class="mt-2 text-xs text-gray-500">
      Fecha actual: {{ currentDate ? currentDate.toISOString().split('T')[0] : 'No disponible' }} | 
      Total registros: {{ productLogStore.productLogs.length }}
    </div>
  </div>
</template> 