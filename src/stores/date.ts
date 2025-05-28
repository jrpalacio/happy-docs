import { ref } from 'vue'
import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { format } from '@formkit/tempo'

import { 
  STR_DATE_SHORT_FORMAT,
  STR_DATE_TIME_FORMAT,
  STR_LANG,
} from '../constants/date_settings.ts'

interface DatePayload {
  current: Date | null
  shortFormat: string | null
  longFormat: string | null
  timestamp: number | null
  dateTimeLocal: string | null
}

export const useDateStore = defineStore('date', () => {
  const datePayload: Ref<DatePayload | null> = ref(null)
  const time: Ref<string> = ref('')

  function setDatePayload({ date }: Date): void {
    datePayload.value = { 
      current: date, 
      dateTimeLocal: format(date, STR_DATE_TIME_FORMAT, STR_LANG),
      longFormat: format(date, "long", STR_LANG), 
      shortFormat: format(date, STR_DATE_SHORT_FORMAT, STR_LANG), 
      timestamp: date.getTime(),
    }
  }

  function getDatePayload(): DatePayload | null {
    return datePayload.value
  }

  function initDate(): void {
    const now = new Date()
    setDatePayload({ date: now })
  }

  function setTime(value: string): void {
    time.value = value
  }
  function getTime(): string {
    return time.value
  }

  return {
    datePayload,
    time,
    setTime,
    getTime,
    initDate,
    setDatePayload,
    getDatePayload,
    
  }
})
