<script setup lang="ts">
import { format } from "@formkit/tempo"
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDateStore } from '../../stores'

const dateStore = useDateStore()
const { updateCurrentDate, updateSelectedTime, initializeWithCurrentDate } = dateStore
const { currentDate, selectedTime, datePayload } = storeToRefs(dateStore)

const currentTime = ref('')
const currentDateInput = ref('')

onMounted(() => {
  // Inicializar si no hay fecha actual
  if (!currentDate.value) {
    initializeWithCurrentDate()
  }
  
  // Establecer valores iniciales
  currentDateInput.value = datePayload.value?.shortFormat || format(new Date(), 'yyyy-MM-dd', 'es')
  currentTime.value = selectedTime.value || format(new Date(), 'HH:mm', 'es')
  
  // Actualizar la store con el tiempo inicial
  updateSelectedTime(currentTime.value)
})

// Observar cambios en la fecha
watch(currentDateInput, (newDate) => {
  if (newDate) {
    const date = new Date(newDate + 'T00:00:00')
    updateCurrentDate(date)
  }
})

// Observar cambios en el tiempo
watch(currentTime, (newTime) => {
  if (newTime) {
    updateSelectedTime(newTime)
  }
})

// Observar cambios en la fecha de la store para sincronizar
watch(() => datePayload.value?.shortFormat, (newFormat) => {
  if (newFormat) {
    currentDateInput.value = newFormat
  }
})

// Observar cambios en el tiempo de la store para sincronizar
watch(selectedTime, (newTime) => {
  if (newTime) {
    currentTime.value = newTime
  }
})
</script>

<template>
  <!-- Fecha -->
  <label class="flex flex-col gap-1">
    <span class="text-sm text-white font-semibold">Fecha</span>
    <input 
      type="date" 
      v-model="currentDateInput"
      class="input-primary bg-neutral-700 hover:bg-neutral-600 transition-colors" 
    />
  </label>
  
  <!-- Hora -->
  <label class="flex flex-col gap-1">
    <span class="text-sm text-white font-semibold">Hora</span>
    <input 
      type="time" 
      v-model="currentTime"
      class="input-primary hover:bg-neutral-600 transition-colors"
    />
  </label>
</template>