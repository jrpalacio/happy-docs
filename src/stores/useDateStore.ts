import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { defineStore } from 'pinia'
import { format } from '@formkit/tempo'
import type { DatePayload } from '../constants/date_settings.ts'

import { 
  STR_DATE_SHORT_FORMAT,
  STR_DATE_TIME_FORMAT,
  STR_LANG,
} from '../constants/date_settings.ts'

export const useDateStore = defineStore('date', () => {
  // Estado privado
  const _currentDate: Ref<Date> = ref(new Date())
  const _selectedTime: Ref<string> = ref('')

  // Getters computados para mejor rendimiento y legibilidad
  const currentDate: ComputedRef<Date> = computed(() => _currentDate.value)
  const selectedTime: ComputedRef<string> = computed(() => _selectedTime.value)
  
  const datePayload: ComputedRef<DatePayload> = computed(() => {
    const date = _currentDate.value
    return {
      current: date,
      dateTimeLocal: format(date, STR_DATE_TIME_FORMAT, STR_LANG),
      longFormat: format(date, "long", STR_LANG),
      shortFormat: format(date, STR_DATE_SHORT_FORMAT, STR_LANG),
      timestamp: date.getTime(),
    }
  })

  // Acciones
  function updateCurrentDate(date: Date): void {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error('Fecha inválida proporcionada')
    }
    _currentDate.value = date
  }

  function updateSelectedTime(time: string): void {
    // Validación básica de formato de tiempo (HH:mm)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
    if (!timeRegex.test(time)) {
      throw new Error('Formato de tiempo inválido. Use HH:mm')
    }
    _selectedTime.value = time
  }

  function initializeWithCurrentDate(): void {
    updateCurrentDate(new Date())
  }

  function resetToNow(): void {
    updateCurrentDate(new Date())
    _selectedTime.value = ''
  }

  return {
    // Estado público (solo lectura)
    currentDate,
    selectedTime,
    datePayload,
    
    // Acciones
    updateCurrentDate,
    updateSelectedTime,
    initializeWithCurrentDate,
    resetToNow,
  }
})
