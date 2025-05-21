import { ref } from 'vue'
import { defineStore } from 'pinia'
import { DropTypeTextToNum, DropTypeNumToText } from '@/constants/products'

export const useCbdStore = defineStore('cbd', () => {
  const portion = ref(1)
  const timestamp = ref(0)
  const timeList = ref([])
  const dropType = ref(1)

  function increment() {
    portion.value++
  }

  function decrement() {
    if (portion.value > 1) {
      portion.value--
    }
  }

  function setTimeList(times) {
    timeList.value = times.map((time) => {
      return {
        id: time.id,
        portion: time.portion,
        timestamp: time.timestamp,
        dropType: DropTypeNumToText[time.dropType]
      }
    })
  }

  function addTimeLocalStorage({ id, portion, timestamp, dropType }) {
    // Save newTime to local storage
    const storedTimes = JSON.parse(localStorage.getItem('times')) || []
    storedTimes.push({ id, portion, timestamp, dropType })
    localStorage.setItem('times', JSON.stringify(storedTimes))
  }

  function addTime({ timestampValue, dropTypeValue }) {
    const id = generateUniqueId()
    timestamp.value = timestampValue
    dropType.value = DropTypeTextToNum[dropTypeValue]
    timeList.value.push({
      id,
      portion: portion.value,
      timestamp: timestampValue,
      dropType: dropTypeValue
    })

    addTimeLocalStorage({
      id,
      portion: portion.value,
      timestamp: timestampValue,
      dropType: DropTypeTextToNum[dropTypeValue]
    })

    portion.value = 1
    timestamp.value = 0
    dropType.value = 1
  }

  // esta función debe de recibir un parametro de tipo Date
  function getDataByDate(date) {
    const formatDate = typeof date === 'string' ? date : date.toLocaleDateString()
    const storedTimes = JSON.parse(localStorage.getItem('times')) || []
    return storedTimes.filter((time) => {
      const timeDate = new Date(time.timestamp).toLocaleDateString()
      return timeDate === formatDate
    })
  }

  function generateUniqueId() {
    let id = Math.random().toString(36).substr(2, 9)
    while (timeList.value.some((time) => time.id === id)) {
      id = Math.random().toString(36).substr(2, 9)
    }
    return id
  }

  function getItemById(id) {
    return timeList.value.find((time) => time.id === id)
  }

  function removeTimeLocalStorage(id) {
    const storedTimes = JSON.parse(localStorage.getItem('times')) || []
    const index = storedTimes.findIndex((time) => time.id === id)
    if (index !== -1) {
      storedTimes.splice(index, 1)
      localStorage.setItem('times', JSON.stringify(storedTimes))
    }
  }

  function removeTime(id) {
    const index = timeList.value.findIndex((time) => time.id === id)
    if (index !== -1) {
      timeList.value.splice(index, 1)
      removeTimeLocalStorage(id)
    }
  }

  function updateItemLocalStorage({ id, portion }) {
    const storedTimes = JSON.parse(localStorage.getItem('times')) || []
    const index = storedTimes.findIndex((time) => time.id === id)
    if (index !== -1) {
      storedTimes[index].portion = portion
      localStorage.setItem('times', JSON.stringify(storedTimes))
    }
  }

  function updateItem({ id, portion }) {
    const index = timeList.value.findIndex((time) => time.id === id)
    if (index !== -1) {
      timeList.value[index].portion = portion
      // timeList.value[index].timestamp = timestamp.value
      updateItemLocalStorage({ id, portion })
    }
  }

  return {
    portion,
    timeList,
    timestamp,
    increment,
    decrement,
    addTime,
    getItemById,
    removeTime,
    updateItem,
    getDataByDate,
    setTimeList
  }
})
