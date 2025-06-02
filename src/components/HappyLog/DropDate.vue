<script setup lang="ts">
import { format } from "@formkit/tempo"
import { onMounted, ref, watch } from 'vue'
import { useDateStore } from '../../stores'

const dateStore = useDateStore()
const { getDatePayload, setTime } = dateStore

const currentTime = ref('')
const currentDate = ref('')

onMounted(() => {
  const t = new Date()
  currentDate.value = getDatePayload()?.shortFormat || format(t, 'yyyy-MM-dd', 'es')
  currentTime.value = format(t, 'HH:mm', 'es')
  setTime(currentTime.value)
})

watch(currentTime, (newTime) => {
  setTime(newTime)
})

</script>
<template>
  <!-- Fecha -->
  <label class="flex flex-col gap-1">
    <span class="text-sm text-white font-semibold">Fecha</span>
    <input type="date" :value="currentDate" class="input-primary bg-neutral-700" disabled />
  </label>
  <!-- Hora -->
  <label class="flex flex-col gap-1">
    <span class="text-sm text-white font-semibold">Hora</span>
    <input type="time" class="input-primary" v-model="currentTime"/>
  </label>
</template>