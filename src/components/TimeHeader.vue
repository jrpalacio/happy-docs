<script setup>
import { ref, onMounted } from 'vue'
import { LANG } from '../constants/date_config'

const time = ref('')

const getCurrentDateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString(LANG)
}

onMounted(() => {
  getCurrentDateTime()
  setInterval(getCurrentDateTime, 1000)
})
</script>

<template>
  <header class="text-3xl font-bold text-neutral-100 text-center py-4" >
    <h1>{{ time }}</h1>
  </header>
</template>

