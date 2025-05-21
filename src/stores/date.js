import { ref } from 'vue'
import { defineStore } from 'pinia'
import { format, addDay, parse } from '@formkit/tempo'

export const useDateStore = defineStore('date', () => {
  const date = ref(null)
  const dateFormat = ref(null)
  const dateTimeLocal = ref(null)
  const timestamp = ref(null)
  const longDateFormat = ref(null)

  const STR_LANG = 'es'
  const STR_DATE_FORMAT = 'YYYY-MM-DD'
  const STR_DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm:ss'

  function initDate() {
    const now = new Date()
    setDate({ currentDate: now })
    setDateFormat({ currentDate: now })
    setLongDateFormat({ currentDate: now })
    setTimestamp({ currentDate: now })
    setDateTimeLocal({ currentDate: now })
  }

  function updateDate({ currentDate }) {
    setDate({ currentDate })
    setDateFormat({ currentDate })
    setLongDateFormat({ currentDate })
    setTimestamp({ currentDate })
    setDateTimeLocal({ currentDate })
  }

  function setDateTimeLocal({ currentDate }) {
    dateTimeLocal.value = format(currentDate, STR_DATE_TIME_FORMAT, STR_LANG)
  }

  function getDateTimeLocal() {
    return dateTimeLocal.value
  }

  function setDate({ currentDate }) {
    date.value = currentDate
  }

  function setDateFormat({ currentDate }) {
    dateFormat.value = format(currentDate, STR_DATE_FORMAT, STR_LANG)
  }

  function setLongDateFormat({ currentDate }) {
    longDateFormat.value = format(currentDate, { date: 'full' })
  }

  function setTimestamp({ currentDate }) {
    timestamp.value = currentDate.getTime()
  }

  function getDate() {
    return date.value
  }

  function getDateFormat() {
    return dateFormat.value
  }

  function getLongDateFormat() {
    return longDateFormat.value
  }

  function getTimestamp() {
    return timestamp.value
  }

  function nextDate() {
    const nowFormat = getDateFormat()
    const nextDay = addDay(nowFormat, 1)
    setDate({ currentDate: nextDay })
    setDateFormat({ currentDate: nextDay })
    setLongDateFormat({ currentDate: nextDay })
    setTimestamp({ currentDate: nextDay })
    setDateTimeLocal({ currentDate: nextDay })
  }

  function previousDate() {
    const nowFormat = getDateFormat()
    const previousDay = addDay(nowFormat, -1)
    setDate({ currentDate: previousDay })
    setDateFormat({ currentDate: previousDay })
    setLongDateFormat({ currentDate: previousDay })
    setTimestamp({ currentDate: previousDay })
    setDateTimeLocal({ currentDate: previousDay })
  }

  // parse("1987-12-17") => Date
  function stringToDate(dateString) {
    return parse(dateString)
  }

  return {
    initDate,
    setDateFormat,
    getDateFormat,
    getDate,
    setTimestamp,
    getTimestamp,
    setLongDateFormat,
    getLongDateFormat,
    nextDate,
    previousDate,
    setDateTimeLocal,
    getDateTimeLocal,
    updateDate,
    stringToDate
  }
})
