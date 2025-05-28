<script setup lang="ts">
import { ref } from 'vue'

import ModalContent from './ModalContent.vue'

import DropProduct from './DropProduct.vue'
import DropCounter from './DropCounter.vue'
import DropDate from './DropDate.vue'

import IconDropletPlus from './icons/IconDropletPlus.vue'

import { useDropStore } from '../../stores/drop.ts'

const dropStore = useDropStore()
const { addDrop } = dropStore

const showModal = ref(false)

type Timestamp = number | Date | string

interface dropType {
  portion: number,
  timestamp: Timestamp,
  product: number
}

function agregarDrop() {
  const drop:dropType = {
    portion: 1,
    timestamp: new Date(),
    product: 1
  }
  addDrop(drop)
}
</script>

<template>
  <button @click="showModal = true" type="button" class="text-white p-2 bg-orange-500 rounded-xl">
    <IconDropletPlus class="size-6"/>
  </button>
  <!-- Modal para agregar dosis -->
  <ModalContent :show="showModal" @close="showModal = false" >
    <template #header>Agregar dosis</template>
    <template #body>
      <div class="flex flex-col space-y-4">
        <!-- Selector de gotero -->
        <DropProduct />
        <!-- Fecha y hora -->
         <DropDate />
        <!-- Contador de gotas -->
        <DropCounter />
        <button @click="agregarDrop" class="text-white p-2 bg-orange-500 rounded-xl">Agregar</button>
      </div>
    </template>
  </ModalContent>
</template>