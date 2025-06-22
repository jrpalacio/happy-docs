<script setup lang="ts">
import IconMinus from './icons/IconMinus.vue'
import IconPlus from './icons/IconPlus.vue'

import { onMounted, ref } from 'vue'
import type { Ref } from 'vue'

import { useProductStore } from '../../stores'
const productStore = useProductStore()
const { getProductPortion, setProductPortion } = productStore  

const portion: Ref<number|null> = ref(null)

function incrementPortion() {
  if (portion.value !== null) {
    portion.value += 1
    setProductPortion(portion.value)
  }
}

function decrementPortion() {
  if (portion.value !== null && portion.value > 1) {
    portion.value -= 1
    setProductPortion(portion.value)
  }
}

onMounted(() => {
  portion.value = getProductPortion()
})

</script>

<template>
  <div class="flex flex-col gap-1">
    <p class="text-white font-semibold ">Porción</p>
    <div class="flex justify-between items-center">
      <button v-on:click="decrementPortion" type="button" class="text-white border border-neutral-600 p-2 rounded-lg bg-neutral-700">
        <IconMinus/>
      </button>
      <span class="text-[#ec7357] font-semibold">{{ portion }}</span>
      <button v-on:click="incrementPortion" type="button" class="text-white border border-neutral-600 p-2 rounded-lg bg-neutral-700">
        <IconPlus/>
      </button>
    </div>
  </div>
</template>