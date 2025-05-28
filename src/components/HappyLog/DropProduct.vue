<script setup lang="ts">
import { ref } from 'vue'
import { PRODUCTS } from '../../constants/happy-live'

const products = ref(PRODUCTS)
const selectedDropper = ref('')

</script>

<template>
  <label class="flex flex-col gap-1">
    <span class="text-sm text-white font-semibold">Producto</span>
    <select name="droppers" v-model="selectedDropper" class="w-full input-primary">
        <option value="" disabled>Elige tu producto</option>
        <option v-for="product in products" :value="product.name" :key="product.id">
          {{ product.name }}
        </option>
      </select>
  </label> 
</template>