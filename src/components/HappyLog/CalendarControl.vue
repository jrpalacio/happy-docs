<script setup lang="ts">
import { ref,onMounted } from "vue"
import type { Ref } from 'vue'
import { computed } from 'vue'

import { format } from "@formkit/tempo"
import { addDay } from "@formkit/tempo"

import IconCaretleft from './icons/IconCaretleft.vue'
import IconCaretright from './icons/IconCaretright.vue'

import { useDateStore } from '../../stores'

import { STR_LANG, STR_DATE_SHORT_FORMAT } from '../../constants/date_settings.ts'
const dateStore = useDateStore()
const { initDate, getDatePayload, setDatePayload } = dateStore

interface DatePayload {
  current: Date | null
  shortFormat: string | null
  longFormat: string | null
  timestamp: number | null
  dateTimeLocal: string | null
}
const datePayload: Ref<DatePayload | null> = ref(null)

const previousDate = () => {
  const currentDate = datePayload.value?.current
  
  if (!currentDate) return

  const previousDate = addDay(currentDate, -1)
  setDatePayload({ date: previousDate })
  datePayload.value = getDatePayload()
}

const nextDate = () => {
  const currentDate = datePayload.value?.current
  
  if (!currentDate) return

  const nextDate = addDay(currentDate, 1)
  setDatePayload({ date: nextDate })
  datePayload.value = getDatePayload()
}

onMounted(() => {
  initDate()
  datePayload.value = getDatePayload()
})

const dateLongFormat = computed(() => {
  return datePayload.value?.longFormat
})
  
</script>

<template>
    <header class="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
    <button type="button" class="text-orange-500 p-2 rounded-xl" @click="previousDate">
      <IconCaretleft class="size-6"/>
    </button>
    <p class="text-center text-white font-bold">{{dateLongFormat}}</p>
    <button type="button" class="text-orange-500 p-2 rounded-xl" @click="nextDate">
      <IconCaretright class="size-6"/>
    </button>
  </header> 
</template>

