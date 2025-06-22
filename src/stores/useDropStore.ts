import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { dropType } from '../constants/happy-live'

export const useDropStore = defineStore('drop', ()=> {
  const drop: Ref <dropType> = ref({
    portion: 1,
    product: 1
  })

  function getDrop(): dropType {
    return drop.value
  }

  function getDropPortion(): number {
    return drop.value.portion
  }

  function getDropProduct(): dropType['product'] {
    return drop.value.product
  }

  function setDrop(newDrop: dropType): void {
    drop.value = { ...newDrop }
  }

  function setDropPortion(portion: number): void {
    drop.value.portion = portion
  }

  function setDropProduct(product: dropType['product']): void {
    drop.value.product = product
  }

  function resetDrop(): void {
    drop.value = {
      portion: 1,
      product: 1
    }
  }

  return {
    drop,
    getDrop,
    getDropPortion,
    getDropProduct,
    setDrop,
    setDropPortion,
    setDropProduct,
    resetDrop
  }
})