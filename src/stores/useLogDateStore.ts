import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from '@formkit/tempo'

type DATE_FORMAT_STRING = 'YYYY-MM-DD'

export const useLogDateStore = defineStore('logDate', () => {
  const date: Ref<Date | null> = ref(null)
  const dateFormat: Ref<DATE_FORMAT_STRING | null> = ref(null)
  const timestamp: Ref<number | null> = ref(null)

  const STR_LANG = 'es'
  const STR_DATE_FORMAT = 'YYYY-MM-DD'

  interface DatePayload {
    currentDate: Date | string
  }

  function getLogDate(): Date | null {
    return date.value
  }

  function setLogDate({ currentDate }: DatePayload): void {
    date.value = currentDate as Date
    dateFormat.value = format(currentDate, STR_DATE_FORMAT, STR_LANG)
    timestamp.value = (currentDate as Date).getTime()
  }

  function getLogDateFormat(): DATE_FORMAT_STRING | null {
    return dateFormat.value
  }

  function getLogTimestamp(): number | null {
    return timestamp.value
  }

  return {
    getLogDate,
    getLogDateFormat,
    getLogTimestamp,
    setLogDate  
  }
})