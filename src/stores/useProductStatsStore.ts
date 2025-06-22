import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { format } from '@formkit/tempo'
import { useProductLogStore } from './useProductLogStore'
import type { 
  ProductLogEntry,
  HappyLiveProductsId,
  HappyLiveProducts
} from '../constants/happy-live'
import { 
  HAPPY_ID_TO_PRODUCT,
  PRODUCTS
} from '../constants/happy-live'

export interface ProductStats {
  productId: HappyLiveProductsId
  productName: HappyLiveProducts
  totalEntries: number
  totalPortions: number
  averagePortionsPerEntry: number
  lastUsed: string | null
  mostUsedTime: string | null
  weeklyUsage: number
  monthlyUsage: number
}

export interface UsageTrend {
  date: string
  totalEntries: number
  totalPortions: number
  productsUsed: HappyLiveProductsId[]
}

export const useProductStatsStore = defineStore('productStats', () => {
  const productLogStore = useProductLogStore()

  // Getters computados para estadísticas
  const allProductStats: ComputedRef<ProductStats[]> = computed(() => {
    const logs = productLogStore.productLogs
    const stats: ProductStats[] = []

    PRODUCTS.forEach(product => {
      const productLogs = logs.filter(log => log.productId === product.id)
      
      if (productLogs.length === 0) {
        stats.push({
          productId: product.id,
          productName: product.name,
          totalEntries: 0,
          totalPortions: 0,
          averagePortionsPerEntry: 0,
          lastUsed: null,
          mostUsedTime: null,
          weeklyUsage: 0,
          monthlyUsage: 0
        })
        return
      }

      const totalPortions = productLogs.reduce((sum, log) => sum + log.portion, 0)
      const averagePortions = totalPortions / productLogs.length
      
      // Encontrar la hora más usada
      const timeCounts: Record<string, number> = {}
      productLogs.forEach(log => {
        timeCounts[log.time] = (timeCounts[log.time] || 0) + 1
      })
      const mostUsedTime = Object.entries(timeCounts)
        .sort(([,a], [,b]) => b - a)[0]?.[0] || null

      // Último uso
      const lastUsed = productLogs
        .sort((a, b) => b.timestamp - a.timestamp)[0]?.date || null

      // Uso semanal y mensual
      const weeklyLogs = productLogStore.getWeeklyLogs()
      const monthlyLogs = productLogStore.getMonthlyLogs()
      
      const weeklyUsage = weeklyLogs.filter(log => log.productId === product.id).length
      const monthlyUsage = monthlyLogs.filter(log => log.productId === product.id).length

      stats.push({
        productId: product.id,
        productName: product.name,
        totalEntries: productLogs.length,
        totalPortions,
        averagePortionsPerEntry: Math.round(averagePortions * 100) / 100,
        lastUsed,
        mostUsedTime,
        weeklyUsage,
        monthlyUsage
      })
    })

    return stats.sort((a, b) => b.totalEntries - a.totalEntries)
  })

  const totalUsageStats: ComputedRef<{
    totalEntries: number
    totalPortions: number
    uniqueProductsUsed: number
    averagePortionsPerDay: number
    mostActiveDay: string | null
    mostActiveTime: string | null
  }> = computed(() => {
    const logs = productLogStore.productLogs
    
    if (logs.length === 0) {
      return {
        totalEntries: 0,
        totalPortions: 0,
        uniqueProductsUsed: 0,
        averagePortionsPerDay: 0,
        mostActiveDay: null,
        mostActiveTime: null
      }
    }

    const totalPortions = logs.reduce((sum, log) => sum + log.portion, 0)
    const uniqueProducts = new Set(logs.map(log => log.productId)).size

    // Calcular promedio por día
    const daysWithEntries = new Set(logs.map(log => log.date)).size
    const averagePortionsPerDay = daysWithEntries > 0 ? totalPortions / daysWithEntries : 0

    // Día más activo
    const dayCounts: Record<string, number> = {}
    logs.forEach(log => {
      dayCounts[log.date] = (dayCounts[log.date] || 0) + 1
    })
    const mostActiveDay = Object.entries(dayCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || null

    // Hora más activa
    const timeCounts: Record<string, number> = {}
    logs.forEach(log => {
      timeCounts[log.time] = (timeCounts[log.time] || 0) + 1
    })
    const mostActiveTime = Object.entries(timeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || null

    return {
      totalEntries: logs.length,
      totalPortions,
      uniqueProductsUsed: uniqueProducts,
      averagePortionsPerDay: Math.round(averagePortionsPerDay * 100) / 100,
      mostActiveDay,
      mostActiveTime
    }
  })

  const usageTrends: ComputedRef<UsageTrend[]> = computed(() => {
    const logs = productLogStore.productLogs
    const trends: Record<string, UsageTrend> = {}

    logs.forEach(log => {
      if (!trends[log.date]) {
        trends[log.date] = {
          date: log.date,
          totalEntries: 0,
          totalPortions: 0,
          productsUsed: []
        }
      }

      trends[log.date].totalEntries++
      trends[log.date].totalPortions += log.portion
      
      if (!trends[log.date].productsUsed.includes(log.productId)) {
        trends[log.date].productsUsed.push(log.productId)
      }
    })

    return Object.values(trends)
      .sort((a, b) => a.date.localeCompare(b.date))
  })

  const weeklyTrends: ComputedRef<UsageTrend[]> = computed(() => {
    const logs = productLogStore.getWeeklyLogs()
    const trends: Record<string, UsageTrend> = {}

    logs.forEach(log => {
      if (!trends[log.date]) {
        trends[log.date] = {
          date: log.date,
          totalEntries: 0,
          totalPortions: 0,
          productsUsed: []
        }
      }

      trends[log.date].totalEntries++
      trends[log.date].totalPortions += log.portion
      
      if (!trends[log.date].productsUsed.includes(log.productId)) {
        trends[log.date].productsUsed.push(log.productId)
      }
    })

    return Object.values(trends)
      .sort((a, b) => a.date.localeCompare(b.date))
  })

  // Funciones de utilidad
  function getProductStats(productId: HappyLiveProductsId): ProductStats | null {
    return allProductStats.value.find(stats => stats.productId === productId) || null
  }

  function getTopProducts(limit: number = 5): ProductStats[] {
    return allProductStats.value.slice(0, limit)
  }

  function getLeastUsedProducts(limit: number = 5): ProductStats[] {
    return allProductStats.value
      .filter(stats => stats.totalEntries > 0)
      .slice(-limit)
      .reverse()
  }

  function getProductsNotUsedInDays(days: number): ProductStats[] {
    const cutoffDate = new Date()
    cutoffDate.setDate(cutoffDate.getDate() - days)
    const cutoffDateStr = format(cutoffDate, 'YYYY-MM-DD', 'es')

    return allProductStats.value.filter(stats => {
      if (stats.totalEntries === 0) return true
      if (!stats.lastUsed) return true
      return stats.lastUsed < cutoffDateStr
    })
  }

  function getConsistencyScore(): number {
    const logs = productLogStore.productLogs
    if (logs.length === 0) return 0

    const uniqueDays = new Set(logs.map(log => log.date)).size
    const totalDays = Math.ceil((Date.now() - Math.min(...logs.map(log => log.timestamp))) / (1000 * 60 * 60 * 24))
    
    return totalDays > 0 ? Math.round((uniqueDays / totalDays) * 100) : 0
  }

  return {
    // Estadísticas principales
    allProductStats,
    totalUsageStats,
    usageTrends,
    weeklyTrends,
    
    // Funciones de utilidad
    getProductStats,
    getTopProducts,
    getLeastUsedProducts,
    getProductsNotUsedInDays,
    getConsistencyScore,
  }
}) 