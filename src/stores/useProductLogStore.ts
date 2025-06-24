import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { format } from '@formkit/tempo'
import { 
  useDateStore, 
  useProductStore 
} from '../stores'
import type { 
  ProductLogEntry, 
  ProductLogFilters
} from '../constants/happy-live'
import { 
  HAPPY_ID_TO_PRODUCT,
  type HappyLiveProductsId,
  type HappyLiveProducts
} from '../constants/happy-live'

export const useProductLogStore = defineStore('productLog', () => {
  // Stores relacionadas
  const dateStore = useDateStore()
  const productStore = useProductStore()

  // Estado privado
  const _productLogs: Ref<ProductLogEntry[]> = ref([])
  const _filters: Ref<ProductLogFilters> = ref({})

  // Getters computados
  const productLogs: ComputedRef<ProductLogEntry[]> = computed(() => _productLogs.value)
  
  const filteredLogs: ComputedRef<ProductLogEntry[]> = computed(() => {
    let logs = [..._productLogs.value]
    const filters = _filters.value

    // Filtrar por producto
    if (filters.productId) {
      logs = logs.filter(log => log.productId === filters.productId)
    }

    // Filtrar por rango de fechas
    if (filters.dateFrom) {
      logs = logs.filter(log => log.date >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      logs = logs.filter(log => log.date <= filters.dateTo!)
    }

    // Filtrar por término de búsqueda
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      logs = logs.filter(log => 
        log.productName.toLowerCase().includes(searchTerm) ||
        log.notes?.toLowerCase().includes(searchTerm)
      )
    }

    return logs.sort((a, b) => b.timestamp - a.timestamp) // Más recientes primero
  })

  const totalEntries: ComputedRef<number> = computed(() => _productLogs.value.length)
  
  const entriesByProduct: ComputedRef<Record<HappyLiveProductsId, number>> = computed(() => {
    const counts: Record<HappyLiveProductsId, number> = {} as Record<HappyLiveProductsId, number>
    
    // Inicializar contadores
    Object.values(HAPPY_ID_TO_PRODUCT).forEach(productName => {
      const productId = Object.entries(HAPPY_ID_TO_PRODUCT).find(([_, name]) => name === productName)?.[0]
      if (productId && Object.keys(HAPPY_ID_TO_PRODUCT).includes(productId)) {
        counts[productId as unknown as HappyLiveProductsId] = 0
      }
    })

    // Contar entradas
    _productLogs.value.forEach(log => {
      counts[log.productId] = (counts[log.productId] || 0) + 1
    })

    return counts
  })

  // Acciones
  function addProductLog(notes?: string): void {
    const currentProduct = productStore.getProduct()
    const currentDate = dateStore.currentDate
    const selectedTime = dateStore.selectedTime

    if (!currentProduct || !currentDate) {
      throw new Error('Información de producto o fecha no disponible')
    }

    const newEntry: ProductLogEntry = {
      id: generateUniqueId(),
      productId: currentProduct.type,
      productName: HAPPY_ID_TO_PRODUCT[currentProduct.type],
      portion: currentProduct.portion,
      timestamp: currentDate.getTime(),
      date: format(currentDate, 'YYYY-MM-DD', 'es'),
      time: selectedTime || format(currentDate, 'HH:mm', 'es'),
      notes: notes?.trim() || undefined
    }

    _productLogs.value.push(newEntry)
    saveToLocalStorage()
  }

  function updateProductLog(id: string, updates: Partial<ProductLogEntry>): void {
    const index = _productLogs.value.findIndex(log => log.id === id)
    if (index === -1) {
      throw new Error(`Entrada de registro no encontrada con ID: ${id}`)
    }

    _productLogs.value[index] = {
      ..._productLogs.value[index],
      ...updates,
      id: _productLogs.value[index].id // Mantener el ID original
    }

    saveToLocalStorage()
  }

  function deleteProductLog(id: string): void {
    const index = _productLogs.value.findIndex(log => log.id === id)
    if (index === -1) {
      throw new Error(`Entrada de registro no encontrada con ID: ${id}`)
    }

    _productLogs.value.splice(index, 1)
    saveToLocalStorage()
  }

  function clearAllLogs(): void {
    _productLogs.value = []
    saveToLocalStorage()
  }

  function setFilters(filters: ProductLogFilters): void {
    _filters.value = { ...filters }
  }

  function clearFilters(): void {
    _filters.value = {}
  }

  function getLogsByDateRange(startDate: string, endDate: string): ProductLogEntry[] {
    console.log('getLogsByDateRange:', { startDate, endDate, totalLogs: _productLogs.value.length })
    
    const filteredLogs = _productLogs.value.filter(log => 
      log.date >= startDate && log.date <= endDate
    )
    
    console.log('getLogsByDateRange: logs filtrados:', filteredLogs.length)
    return filteredLogs
  }

  function getLogsByProduct(productId: HappyLiveProductsId): ProductLogEntry[] {
    return _productLogs.value.filter(log => log.productId === productId)
  }

  function getTodayLogs(): ProductLogEntry[] {
    const today = format(new Date(), 'YYYY-MM-DD', 'es')
    return _productLogs.value.filter(log => log.date === today)
  }

  function getWeeklyLogs(): ProductLogEntry[] {
    const today = new Date()
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const weekAgoStr = format(weekAgo, 'YYYY-MM-DD', 'es')
    const todayStr = format(today, 'YYYY-MM-DD', 'es')
    
    return getLogsByDateRange(weekAgoStr, todayStr)
  }

  function getMonthlyLogs(): ProductLogEntry[] {
    const today = new Date()
    const monthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
    const monthAgoStr = format(monthAgo, 'YYYY-MM-DD', 'es')
    const todayStr = format(today, 'YYYY-MM-DD', 'es')
    
    return getLogsByDateRange(monthAgoStr, todayStr)
  }

  // Persistencia
  function saveToLocalStorage(): void {
    try {
      localStorage.setItem('happy-product-logs', JSON.stringify(_productLogs.value))
    } catch (error) {
      console.error('Error al guardar logs en localStorage:', error)
    }
  }

  function loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem('happy-product-logs')
      if (saved) {
        _productLogs.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error al cargar logs desde localStorage:', error)
      _productLogs.value = []
    }
  }

  // Utilidades
  function generateUniqueId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  function exportLogs(): string {
    return JSON.stringify(_productLogs.value, null, 2)
  }

  function importLogs(jsonData: string): void {
    try {
      const importedLogs = JSON.parse(jsonData)
      if (Array.isArray(importedLogs)) {
        _productLogs.value = importedLogs
        saveToLocalStorage()
      } else {
        throw new Error('Formato de datos inválido')
      }
    } catch (error) {
      throw new Error(`Error al importar logs: ${error}`)
    }
  }

  // Inicialización
  function initialize(): void {
    loadFromLocalStorage()
  }

  return {
    // Estado público (solo lectura)
    productLogs,
    filteredLogs,
    totalEntries,
    entriesByProduct,
    
    // Acciones principales
    addProductLog,
    updateProductLog,
    deleteProductLog,
    clearAllLogs,
    
    // Filtros
    setFilters,
    clearFilters,
    
    // Consultas
    getLogsByDateRange,
    getLogsByProduct,
    getTodayLogs,
    getWeeklyLogs,
    getMonthlyLogs,
    
    // Persistencia
    saveToLocalStorage,
    loadFromLocalStorage,
    
    // Utilidades
    exportLogs,
    importLogs,
    initialize,
  }
})