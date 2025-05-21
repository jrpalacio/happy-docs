import { defineStore } from 'pinia'
import { ref } from 'vue'

interface dropType {
    portion: number,
    timestamp: number,
    product: number
}

export const useDropStore = defineStore('drop', ()=> {
    const nombre = ref('Pepe')
    const dropList = ref<dropType[]>([])
    const drop = ref<dropType>({
        portion: 1,
        timestamp: 0,
        product: 1
    })

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
        nombre,
        dropList,
        drop,
        addDrop,
        removeDrop,
        updateDrop,
        getDataByDate,
        getDrop,
        setDrop
    }
})