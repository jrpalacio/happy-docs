<script setup lang="ts">
import { storeToRefs } from 'pinia'

import HappyDropper from '../../assets/images/happy-dropper.webp'
import CalendarControl from './CalendarControl.vue'

import { useDropStore } from '../../stores'
import DropRegister from './DropRegister.vue'

import { HAPPY_ID_TO_PRODUCT } from '../../constants/happy-live.ts'

const dropStore = useDropStore()
const { dropList } = storeToRefs(dropStore) 

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
        <DropRegister />
      </div>
    
    </main>
    <template v-if="dropList.length">
      <ul class="mt-4 space-y-4">
        <li class="text-white border-b border-neutral-200 dark:border-neutral-800" v-for="drop in dropList" :key="drop.timestamp">
          {{ drop.portion }} - {{ new Date(drop.timestamp).toLocaleDateString() }} - {{ HAPPY_ID_TO_PRODUCT[drop.product] }}
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
  
</template>
