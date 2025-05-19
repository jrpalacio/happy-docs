<script setup>
import { ref } from "vue"
import { format } from "@formkit/tempo"
import { addDay } from "@formkit/tempo"
import IconCaretleft from './icons/IconCaretleft.vue'
import IconCaretright from './icons/IconCaretright.vue'


const FORMAT_DATE = "YYYY-MM-DD"
const STR_LANG = "es"

const date = ref(new Date())
const dateFormat = ref(format(date.value, FORMAT_DATE, STR_LANG))

const previousDate = () => {
  date.value = addDay(date.value, -1)
  dateFormat.value = format(date.value, FORMAT_DATE, STR_LANG)
}

const nextDate = () => {
  date.value = addDay(date.value, 1)
  dateFormat.value = format(date.value, FORMAT_DATE, STR_LANG)
}

</script>

<template>
  <header class="flex items-center justify-between p-2 border-b border-neutral-200 dark:border-neutral-800">
    <button type="button" class="text-orange-500 p-2" @click="previousDate">
      <IconCaretleft class="size-6"/>
    </button>
    <p class="text-center text-white font-bold">{{ format(dateFormat, "long", STR_LANG) }}</p>
    <button type="button" class="text-orange-500 p-2" @click="nextDate">
      <IconCaretright class="size-6"/>
    </button>
  </header>

</template>
