import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { id } from 'date-fns/locale'

export default function dateFormat(date, type) {
  if (!date) return ''

  const formatedDate = e => format(parseISO(date), e, { locale: id })

  if (type === 2) {
    return formatedDate('EEEE, dd MMMM y')
  }

  if (type === 3) {
    return formatedDate('dd MMMM y · HH.mm')
  }

  if (type === 4) {
    return formatedDate('dd MMMM y')
  }

  if (type === 5) {
    return formatedDate('dd/MM/y')
  }

  if (type === 6) {
    return formatedDate('dd/MM/yy')
  }

  if (type === 7) {
    return formatedDate('HH.mm')
  }

  if (type === 8) {
    return formatDistanceToNow(parseISO(date), { locale: id, addSuffix: true })
  }

  return formatedDate('EEEE, dd MMMM y · HH.mm')
}
