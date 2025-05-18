// navigator.language
const LANG = 'es-ES' // 'es-MX'
// solicitar un día de la semana junto con una fecha larga
const OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

const DATE_OPTIONS = { month: 'long', day: 'numeric' }
const TIME_OPTIONS = { hour: '2-digit', minute: '2-digit', hour12: false }
const LOGN_TIME_OPTIONS = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }

export { LANG, OPTIONS, DATE_OPTIONS, TIME_OPTIONS, LOGN_TIME_OPTIONS }
