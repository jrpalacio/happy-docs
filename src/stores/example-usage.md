# Ejemplos de Uso de las Stores de Productos

## Store de Registro de Productos (`useProductLogStore`)

### Inicialización
```typescript
import { useProductLogStore } from '../stores'

const productLogStore = useProductLogStore()
productLogStore.initialize() // Carga datos desde localStorage
```

### Agregar un registro
```typescript
// Agregar registro sin notas
productLogStore.addProductLog()

// Agregar registro con notas
productLogStore.addProductLog('Tomado después del desayuno')
```

### Obtener registros filtrados
```typescript
// Obtener todos los registros
const allLogs = productLogStore.productLogs

// Obtener registros filtrados (con filtros aplicados)
const filteredLogs = productLogStore.filteredLogs

// Aplicar filtros
productLogStore.setFilters({
  productId: 1, // Solo Happy Drop
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  searchTerm: 'desayuno'
})

// Limpiar filtros
productLogStore.clearFilters()
```

### Consultas específicas
```typescript
// Registros de hoy
const todayLogs = productLogStore.getTodayLogs()

// Registros de la semana
const weeklyLogs = productLogStore.getWeeklyLogs()

// Registros del mes
const monthlyLogs = productLogStore.getMonthlyLogs()

// Registros por producto
const happyDropLogs = productLogStore.getLogsByProduct(1)

// Registros por rango de fechas
const rangeLogs = productLogStore.getLogsByDateRange('2024-01-01', '2024-01-31')
```

### Manipular registros
```typescript
// Actualizar un registro
productLogStore.updateProductLog('log-id-123', {
  portion: 2,
  notes: 'Dosis aumentada por recomendación médica'
})

// Eliminar un registro
productLogStore.deleteProductLog('log-id-123')

// Limpiar todos los registros
productLogStore.clearAllLogs()
```

### Exportar/Importar datos
```typescript
// Exportar todos los registros
const jsonData = productLogStore.exportLogs()

// Importar registros
productLogStore.importLogs(jsonData)
```

## Store de Estadísticas (`useProductStatsStore`)

### Obtener estadísticas generales
```typescript
import { useProductStatsStore } from '../stores'

const statsStore = useProductStatsStore()

// Estadísticas de todos los productos
const allStats = statsStore.allProductStats

// Estadísticas generales de uso
const totalStats = statsStore.totalUsageStats
```

### Estadísticas específicas
```typescript
// Estadísticas de un producto específico
const happyDropStats = statsStore.getProductStats(1)

// Top 5 productos más usados
const topProducts = statsStore.getTopProducts(5)

// Productos menos usados
const leastUsed = statsStore.getLeastUsedProducts(3)

// Productos no usados en los últimos 7 días
const notUsedRecently = statsStore.getProductsNotUsedInDays(7)
```

### Tendencias de uso
```typescript
// Tendencias diarias
const dailyTrends = statsStore.usageTrends

// Tendencias semanales
const weeklyTrends = statsStore.weeklyTrends

// Puntuación de consistencia (0-100)
const consistency = statsStore.getConsistencyScore()
```

## Integración con otras stores

### Usar con DateStore
```typescript
import { useDateStore, useProductLogStore } from '../stores'

const dateStore = useDateStore()
const productLogStore = useProductLogStore()

// Configurar fecha y tiempo antes de agregar registro
dateStore.updateCurrentDate(new Date())
dateStore.updateSelectedTime('09:30')

// Agregar registro con la fecha/hora configurada
productLogStore.addProductLog('Tomado en la mañana')
```

### Usar con ProductStore
```typescript
import { useProductStore, useProductLogStore } from '../stores'

const productStore = useProductStore()
const productLogStore = useProductLogStore()

// Configurar producto antes de agregar registro
productStore.setProductType(1) // Happy Drop
productStore.setProductPortion(2)

// Agregar registro con el producto configurado
productLogStore.addProductLog()
```

## Casos de uso comunes

### Dashboard de estadísticas
```typescript
const statsStore = useProductStatsStore()
const productLogStore = useProductLogStore()

// Datos para dashboard
const dashboardData = {
  totalEntries: productLogStore.totalEntries,
  todayEntries: productLogStore.getTodayLogs().length,
  topProducts: statsStore.getTopProducts(3),
  consistencyScore: statsStore.getConsistencyScore(),
  weeklyTrends: statsStore.weeklyTrends
}
```

### Reporte semanal
```typescript
const weeklyLogs = productLogStore.getWeeklyLogs()
const weeklyStats = statsStore.weeklyTrends

const weeklyReport = {
  totalEntries: weeklyLogs.length,
  totalPortions: weeklyLogs.reduce((sum, log) => sum + log.portion, 0),
  productsUsed: new Set(weeklyLogs.map(log => log.productId)).size,
  dailyBreakdown: weeklyStats
}
```

### Recordatorios de productos no usados
```typescript
const notUsedInWeek = statsStore.getProductsNotUsedInDays(7)
const notUsedInMonth = statsStore.getProductsNotUsedInDays(30)

const reminders = {
  weekly: notUsedInWeek.map(product => product.productName),
  monthly: notUsedInMonth.map(product => product.productName)
}
``` 