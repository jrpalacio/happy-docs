<script setup lang="ts">
import { ref } from 'vue'

import ModalContent from './ModalContent.vue'

import DropProduct from './DropProduct.vue'
import DropCounter from './DropCounter.vue'
import DropDate from './DropDate.vue'
import DropNotes from './DropNotes.vue'

import IconDropletPlus from './icons/IconDropletPlus.vue'

import { useProductLogStore, useProductStore, useDateStore } from '../../stores'

const dateStore = useDateStore()
const productStore = useProductStore()
const productLogStore = useProductLogStore()

const showModal = ref(false)
const currentNotes = ref('')

function updateNotes(notes: string) {
  currentNotes.value = notes
}

function agregarDrop() {
  try {
    // Agregar el registro usando la nueva store con notas
    productLogStore.addProductLog(currentNotes.value || undefined)
    
    // Limpiar las notas
    currentNotes.value = ''
    
    // Cerrar el modal
    showModal.value = false
    
    // Opcional: Mostrar mensaje de éxito
    console.log('Registro agregado exitosamente')
  } catch (error) {
    console.error('Error al agregar registro:', error)
    // Aquí podrías mostrar un mensaje de error al usuario
  }
}

function closeModal() {
  showModal.value = false
  currentNotes.value = ''
}
</script>

<template>
  <button @click="showModal = true" type="button" class="text-white p-2 bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors">
    <IconDropletPlus class="size-6"/>
  </button>
  
  <!-- Modal para agregar dosis -->
  <ModalContent :show="showModal" @close="closeModal" >
    <template #header>Agregar dosis</template>
    <template #body>
      <div class="flex flex-col space-y-4">
        <!-- Fecha y hora -->
        <DropDate />
        <!-- Selector de gotero -->
        <DropProduct />
        <!-- Contador de gotas -->
        <DropCounter />
        <!-- Notas -->
        <DropNotes @update-notes="updateNotes" />
        
        <button 
          @click="agregarDrop" 
          class="text-white p-3 bg-orange-500 rounded-xl hover:bg-orange-600 transition-colors font-medium"
        >
          Agregar registro
        </button>
      </div>
    </template>
  </ModalContent>
</template>