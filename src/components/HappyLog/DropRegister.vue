<script setup lang="ts">
import { ref } from 'vue'

import ModalContent from './ModalContent.vue'

import DropProduct from './DropProduct.vue'
import DropCounter from './DropCounter.vue'
import DropDate from './DropDate.vue'

import IconDropletPlus from './icons/IconDropletPlus.vue'

import { useDropStore } from '../../stores'
import { useDateStore } from '../../stores'

const dateStore = useDateStore()
const { getDatePayload, getTime } = dateStore

const dropStore = useDropStore()
const { addDrop, getPortion, getProduct } = dropStore

const showModal = ref(false)

type Timestamp = number | Date | string

interface dropType {
  portion: number,
  timestamp: Timestamp,
  product: number
}

function agregarDrop() {
  const { shortFormat } = getDatePayload() || {}
  if (!shortFormat) {
    console.error('No date payload available')
    return
  }
  const currentTime = shortFormat+'T'+getTime()
  const ct = new Date(currentTime)
  const drop:dropType = {
    portion: getPortion(),
    timestamp: ct.getTime(),
    product: getProduct()
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