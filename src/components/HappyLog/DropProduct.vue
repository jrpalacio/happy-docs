<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { PRODUCTS } from '../../constants/happy-live'

import { useProductStore } from '../../stores'

const productStore = useProductStore()
const { getProductType, setProductType } = productStore
const products = ref(PRODUCTS)
const selectedDropper = ref(0)

onMounted(() => {
  const productId = getProductType()
  if (productId) {
    selectedDropper.value = productId
  }
})

watch(selectedDropper, (newProduct) => {
  setProductType(newProduct)
})

</script>

<template>
  <label class="flex flex-col gap-1">
    <span class="text-sm text-white font-semibold">Producto</span>
    <select name="droppers" v-model="selectedDropper" class="w-full input-primary">
        <option value="0" disabled>Elige tu producto</option>
        <option v-for="product in products" :value="product.id" :key="product.id">
          {{ product.name }}
        </option>
      </select>
  </label> 
</template>