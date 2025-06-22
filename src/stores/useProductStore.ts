import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { productType } from '../constants/happy-live'

export const useProductStore = defineStore('product', ()=> {
  const product: Ref <productType> = ref({
    portion: 1,
    type: 1
  })

  function getProduct(): productType {
    return product.value
  }

  function getProductPortion(): number {
    return product.value.portion
  }

  function getProductType(): productType['type'] {
    return product.value.type
  }

  function setProduct(newProduct: productType): void {
    product.value = { ...newProduct }
  }

  function setProductPortion(portion: number): void {
    product.value.portion = portion
  }

  function setProductType(type: productType['type']): void {
    product.value.type = type
  }

  function resetProduct(): void {
    product.value = {
      portion: 1,
      type: 1
    }
  }

  return {
    product,
    getProduct,
    getProductPortion,
    getProductType,
    setProduct,
    setProductPortion,
    setProductType,
    resetProduct
  }
})