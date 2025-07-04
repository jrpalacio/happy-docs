export interface DatePayload {
  current: Date
  shortFormat: string
  longFormat: string
  timestamp: number
  dateTimeLocal: string
}

const DATE_FORMATS = {
  SHORT: 'YYYY-MM-DD',
  TIME: 'YYYY-MM-DDTHH:mm:ss'
}

export type DATE_SHORT_FORMAT = typeof DATE_FORMATS.SHORT
export type DATE_TIME_FORMAT = typeof DATE_FORMATS.TIME

export const STR_LANG: string = 'es'
export const STR_DATE_SHORT_FORMAT: DATE_SHORT_FORMAT = DATE_FORMATS.SHORT
export const STR_DATE_TIME_FORMAT: DATE_TIME_FORMAT = DATE_FORMATS.TIME