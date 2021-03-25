import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(isToday)
dayjs.extend(customParseFormat)

export default dayjs
