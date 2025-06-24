<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import IconClock from './icons/IconClock.vue'

import HappyDropper from '../../assets/images/happy-dropper.webp'
import DateControl from './DateControl.vue'
import StatsPanel from './StatsPanel.vue'
import DailyStats from './DailyStats.vue'

import { useProductLogStore, useProductStatsStore, useDateStore } from '../../stores'
import DropRegister from './DropRegister.vue'
import IconTrash from './icons/IconTrash.vue'

import { HAPPY_ID_TO_PRODUCT } from '../../constants/happy-live.ts'

const productLogStore = useProductLogStore()
const statsStore = useProductStatsStore()
const dateStore = useDateStore()

// Inicializar las stores en el orden correcto
onMounted(() => {
  try {
    // Primero inicializar la store de fechas
    dateStore.initializeWithCurrentDate()
    // Luego inicializar la store de productos
    productLogStore.initialize()
  } catch (error) {
    console.error('Error initializing stores:', error)
  }
})

// Obtener datos reactivos
const { filteredLogs, totalEntries } = storeToRefs(productLogStore)
const { allProductStats, totalUsageStats } = storeToRefs(statsStore)

// Función para formatear la fecha
function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Función para obtener el color del producto (opcional)
function getProductColor(productId: number): string {
  const colors = {
    1: 'text-blue-400', // Happy Drop
    2: 'text-purple-400', // Happy Ending
    3: 'text-yellow-400', // Happy Face Day
    4: 'text-indigo-400', // Happy Face Night
    5: 'text-green-400', // Happy Focus
    6: 'text-pink-400', // Happy Gummies
    7: 'text-amber-400', // Happy Honey
    8: 'text-cyan-400', // Happy Kids
    9: 'text-emerald-400', // Happy Oil 250ml
    10: 'text-teal-400', // Happy Oil 60ml
    11: 'text-orange-400', // Happy Pet
    12: 'text-violet-400', // Happy Sleep
  }
  return colors[productId as keyof typeof colors] || 'text-white'
}
</script>

<template>
  <DateControl client:only="vue"/>
  <section class="p-4">
    
    <!-- Estadísticas del día -->
    <DailyStats />
    
    <main>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-white font-bold text-lg">Toma diaria de CBD</p>
          <p class="text-gray-300 text-sm">
            Total: {{ totalEntries }} registros
            <span v-if="totalUsageStats.totalPortions > 0">
              • {{ totalUsageStats.totalPortions }} porciones
            </span>
          </p>
        </div>
        <DropRegister />
      </div>
    </main>

    <!-- Estadísticas rápidas -->
    <div v-if="allProductStats.length > 0" class="mt-4 p-3 bg-neutral-800 rounded-lg">
      <h3 class="text-white font-semibold mb-2">Productos más usados</h3>
      <div class="flex flex-wrap gap-2">
        <span 
          v-for="stat in allProductStats.slice(0, 3)" 
          :key="stat.productId"
          class="text-xs px-2 py-1 bg-neutral-700 rounded-full text-white"
        >
          {{ stat.productName }}: {{ stat.totalEntries }}
        </span>
      </div>
    </div>

    <!-- Lista de registros -->
    <template v-if="filteredLogs.length">
      <ul class="mt-4 space-y-3">
        <li 
          v-for="log in filteredLogs" 
          :key="log.id"
          class="flex flex-col gap-3 p-3 bg-neutral-800 rounded-lg border-l-4 border-orange-500"
        >
          <section class="flex items-center justify-between gap-3">
            <div class="flex flex-col ">
              <span :class="getProductColor(log.productId)" class="font-medium w-[max-content] mb-1">
                {{ log.productName }}
              </span>
              <p class="flex items-center gap-1 text-xs text-gray-400 font-bold w-[max-content]">
                <span>{{ log.portion }} {{log.portion > 1 ? 'gotas' : 'gota'}}</span>
                <IconClock class="size-4"/>
                <span>{{ log.time }} hrs</span>
              </p>
            </div>
            
            <div class="flex items-center gap-3">
                <span class="text-gray-400 text-sm">{{ log.date }}</span>
                <button 
                  @click="productLogStore.deleteProductLog(log.id)"
                  class="text-red-400 hover:text-red-300 text-sm"
                  title="Eliminar registro"
                >
                  <IconTrash class="size-4"/>
                </button>
              </div>
          </section>
          <!-- Notas si existen -->
          <div v-if="log.notes" class="w-full mt-2 text-gray-300 text-sm italic">
            "{{ log.notes }}"
          </div>
        </li>
      </ul>
    </template>

    <!-- Estado vacío -->
    <template v-else>
      <div class="flex flex-col items-center justify-center animate-pulse">
        <img :src="HappyDropper.src" alt="Happy Dropper" class="size-64 object-cover mx-auto mt-24">
        <p class="text-white font-bold text-lg">No hay registros</p>
        <p class="text-gray-400 text-sm mt-2">Agrega tu primera dosis de CBD</p>
      </div>
    </template>

    <!-- Filtros rápidos -->
    <div v-if="filteredLogs.length > 0" class="mt-6 p-3 bg-neutral-800 rounded-lg">
      <h3 class="text-white font-semibold mb-2">Filtros rápidos</h3>
      <div class="flex flex-wrap gap-2">
        <button 
          @click="productLogStore.setFilters({})"
          class="text-xs px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600"
        >
          Todos ({{ totalEntries }})
        </button>
        <button 
          @click="productLogStore.setFilters({ dateFrom: new Date().toISOString().split('T')[0] })"
          class="text-xs px-3 py-1 bg-neutral-700 text-white rounded-full hover:bg-neutral-600"
        >
          Hoy ({{ productLogStore.getTodayLogs().length }})
        </button>
        <button 
          @click="productLogStore.setFilters({ 
            dateFrom: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] 
          })"
          class="text-xs px-3 py-1 bg-neutral-700 text-white rounded-full hover:bg-neutral-600"
        >
          Esta semana ({{ productLogStore.getWeeklyLogs().length }})
        </button>
        <button 
          @click="productLogStore.clearFilters()"
          class="text-xs px-3 py-1 bg-neutral-600 text-white rounded-full hover:bg-neutral-500"
        >
          Limpiar filtros
        </button>
      </div>
      <!-- Debug info -->
      <div class="mt-2 text-xs text-gray-400">
        Registros filtrados: {{ filteredLogs.length }} de {{ totalEntries }} total
      </div>
    </div>

    <!-- Panel de estadísticas -->
    <StatsPanel />
  </section>
</template>
