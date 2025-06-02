import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Ref } from 'vue'

interface dropType {
  portion: number,
  timestamp: number,
  product: number
}

export const useDropStore = defineStore('drop', ()=> {
    const dropList: Ref<dropType[]> = ref([])
    
    const drop = ref<dropType>({
        portion: 1,
        timestamp: 0,
        product: 1
    })
    const product = ref(0)
    const portion = ref(1)

    function getProduct(): number {
        return product.value
    }

    function setProduct(value: number) {
        product.value = value
    }

    function getPortion() {
        return portion.value
    }

    function setPortion(value: number) {
        portion.value = value
    }

    function getDrop() {
        return drop.value
    }

    function setDrop({ portion, timestamp, product }: dropType) {
        drop.value = { portion, timestamp, product }
    }
        
    function addDrop({ portion, timestamp, product }: dropType) {
        dropList.value.push({ portion, timestamp, product })
    }

    function removeDrop(index: number) {
        dropList.value.splice(index, 1)
    }

    function updateDrop(index: number, { portion, timestamp, product }: dropType) {
        dropList.value[index] = { portion, timestamp, product }
    }

    function getDataByDate(date: string) {
        return dropList.value.filter((drop) => {
            const dropDate = new Date(drop.timestamp).toLocaleDateString()
            return dropDate === date
        })
    }

    return {
        dropList,
        drop,
        portion,
        product,
        addDrop,
        removeDrop,
        updateDrop,
        getDataByDate,
        getDrop,
        setDrop,
        getPortion,
        setPortion,
        getProduct,
        setProduct,
    }
})