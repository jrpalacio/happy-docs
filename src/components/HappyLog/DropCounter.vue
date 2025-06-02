<script setup lang="ts">
import IconMinus from './icons/IconMinus.vue'
import IconPlus from './icons/IconPlus.vue'

import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import { useDropStore } from '../../stores'
const dropStore = useDropStore()
const { getPortion, setPortion } = dropStore  

const portion: Ref<number|null> = ref(null)

function incrementPortion() {
  if (portion.value !== null) {
    portion.value += 1
    setPortion(portion.value)
  }
}

function decrementPortion() {
  if (portion.value !== null && portion.value > 1) {
    portion.value -= 1
    setPortion(portion.value)
  }
}

onMounted(() => {
  portion.value = getPortion()
})

</script>

<template>
  <div class="flex justify-between items-center">
    <button v-on:click="decrementPortion" type="button" class="text-white border border-neutral-600 p-2 rounded-lg bg-neutral-700">
      <IconMinus/>
    </button>
    <span class="text-white font-semibold">{{ portion }}</span>
    <button v-on:click="incrementPortion" type="button" class="text-white border border-neutral-600 p-2 rounded-lg bg-neutral-700">
      <IconPlus/>
    </button>
  </div>
</template>