<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import IconMinus from './icons/IconMinus.vue'
import IconPlus from './icons/IconPlus.vue'
import IconDropletPlus from './icons/IconDropletPlus.vue'
import { PRODUCTS } from '../../constants/happy-live'
import HappyDropper from '../../assets/images/happy-dropper.webp'

import ModalContent from './ModalContent.vue'
import CalendarControl from './CalendarControl.vue'

import { useDropStore } from '../../stores/drop.ts'

const showModal = ref(false)
const products = ref(PRODUCTS)

const selectedDropper = ref('')
const dateModal = ref(new Date().toISOString().split('T')[0])
const timeModal = ref(new Date().toISOString().split('T')[1])

const dropStore = useDropStore()
const { addDrop } = dropStore
const { dropList } = storeToRefs(dropStore)

function agregarDrop() {
  const drop = {
    portion: 1,
    timestamp: new Date(),
    product: 1
  }
  addDrop(drop)
}

</script>

<template>
  <CalendarControl client:only="vue"/>
  <section class="p-4">
    <div>
      <slot />
    </div>
    
    <main>
      <div class="flex items-center justify-between">
        <p class="text-white font-bold">Toma diaria de CBD</p>
        <button @click="showModal = true" type="button" class="text-white p-2 bg-orange-500 rounded-xl">
          <IconDropletPlus class="size-6"/>
        </button>
      </div>
    
    </main>
    <template v-if="dropList.length">
      <ul class="mt-4 space-y-4">
        <li class="text-white border-b border-neutral-200 dark:border-neutral-800" v-for="drop in dropList" :key="drop.timestamp">
          {{ drop.portion }} - {{ drop.timestamp }} - {{ drop.product }}
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="flex flex-col items-center justify-center animate-pulse">
        <img :src="HappyDropper.src" alt="Happy Dropper" class=" size-64 object-cover mx-auto mt-24">
        <p class="text-white font-bold">No hay tomas</p>
      </div>
    </template>   
  </section>
  <ModalContent :show="showModal" @close="showModal = false" >
    <template #header>Agregar dosis</template>
    <template #body>
      <div class="flex flex-col space-y-4">
        <label class="flex flex-col gap-1">
          <span class="text-sm text-white font-semibold">Producto</span>
          <div class="border border-neutral-600 p-2 rounded-lg">
            <select name="droppers" v-model="selectedDropper" class=" text-[#ec7357] font-semibold w-full">
            <option value="" disabled>Elige tu producto</option>
            <option v-for="product in products" :value="product.name" :key="product.id">
              {{ product.name }}
            </option>
          </select>
          </div>
          
        </label>    
        <label class="flex flex-col gap-1">
          <span class="text-sm text-white font-semibold">Fecha</span>
          <input type="date" :value="dateModal" disabled class="text-neutral-300 font-semibold border border-neutral-600 p-2 rounded-lg bg-neutral-700" />
        </label>
        <label class="flex flex-col gap-1">
          <span class="text-sm text-white font-semibold">Hora</span>
          <input type="time" v-model="timeModal"  class="time border border-neutral-600 p-2 rounded-lg text-[#ec7357] font-semibold"/>
        </label>
        <div class="flex items-center gap-2">
          <IconMinus/>  
          <span>1</span>
          <IconPlus/>
        </div>
        <button @click="agregarDrop" class="text-white p-2 bg-orange-500 rounded-xl">Agregar</button>
      </div>
    </template>
  </ModalContent>
</template>
