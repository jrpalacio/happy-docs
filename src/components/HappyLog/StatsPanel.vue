<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useProductStatsStore } from '../../stores'

const statsStore = useProductStatsStore()
const { allProductStats, totalUsageStats, weeklyTrends } = storeToRefs(statsStore)

const showStats = ref(false)

// Calcular estadísticas adicionales
const consistencyScore = computed(() => statsStore.getConsistencyScore())
const topProducts = computed(() => statsStore.getTopProducts(3))
const notUsedRecently = computed(() => statsStore.getProductsNotUsedInDays(7))

// Función para obtener el color de la puntuación de consistencia
function getConsistencyColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

// Función para formatear la fecha
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="mt-4">
    <!-- Botón para mostrar/ocultar estadísticas -->
    <button 
      @click="showStats = !showStats"
      class="text-white p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-sm"
    >
      {{ showStats ? 'Ocultar' : 'Mostrar' }} estadísticas
    </button>

    <!-- Panel de estadísticas -->
    <div v-if="showStats" class="mt-4 space-y-4">
      <!-- Estadísticas generales -->
      <div class="bg-gray-800 rounded-lg p-4">
        <h3 class="text-white font-semibold mb-3">Resumen general</h3>
        <div class="grid grid-cols-2 gap-4 text-sm">
          <div class="text-gray-300">
            <span class="text-orange-400 font-bold">{{ totalUsageStats.totalEntries }}</span> registros totales
          </div>
          <div class="text-gray-300">
            <span class="text-orange-400 font-bold">{{ totalUsageStats.totalPortions }}</span> porciones
          </div>
          <div class="text-gray-300">
            <span class="text-orange-400 font-bold">{{ totalUsageStats.uniqueProductsUsed }}</span> productos únicos
          </div>
          <div class="text-gray-300">
            <span class="text-orange-400 font-bold">{{ totalUsageStats.averagePortionsPerDay }}</span> promedio/día
          </div>
        </div>
        
        <!-- Puntuación de consistencia -->
        <div class="mt-3 pt-3 border-t border-gray-700">
          <div class="flex items-center justify-between">
            <span class="text-gray-300 text-sm">Consistencia:</span>
            <span :class="getConsistencyColor(consistencyScore)" class="font-bold">
              {{ consistencyScore }}%
            </span>
          </div>
        </div>
      </div>

      <!-- Productos más usados -->
      <div v-if="topProducts.length > 0" class="bg-gray-800 rounded-lg p-4">
        <h3 class="text-white font-semibold mb-3">Productos más usados</h3>
        <div class="space-y-2">
          <div 
            v-for="product in topProducts" 
            :key="product.productId"
            class="flex items-center justify-between p-2 bg-gray-700 rounded"
          >
            <span class="text-white text-sm">{{ product.productName }}</span>
            <div class="flex items-center space-x-2">
              <span class="text-orange-400 font-bold">{{ product.totalEntries }}</span>
              <span class="text-gray-400 text-xs">usos</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Productos no usados recientemente -->
      <div v-if="notUsedRecently.length > 0" class="bg-gray-800 rounded-lg p-4">
        <h3 class="text-white font-semibold mb-3">No usados en 7 días</h3>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="product in notUsedRecently" 
            :key="product.productId"
            class="text-xs px-2 py-1 bg-red-900 text-red-200 rounded-full"
          >
            {{ product.productName }}
          </span>
        </div>
      </div>

      <!-- Tendencias semanales -->
      <div v-if="weeklyTrends.length > 0" class="bg-gray-800 rounded-lg p-4">
        <h3 class="text-white font-semibold mb-3">Actividad esta semana</h3>
        <div class="space-y-2">
          <div 
            v-for="trend in weeklyTrends.slice(-7)" 
            :key="trend.date"
            class="flex items-center justify-between p-2 bg-gray-700 rounded"
          >
            <span class="text-gray-300 text-sm">{{ formatDate(trend.date) }}</span>
            <div class="flex items-center space-x-2">
              <span class="text-orange-400 font-bold">{{ trend.totalEntries }}</span>
              <span class="text-gray-400 text-xs">registros</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 