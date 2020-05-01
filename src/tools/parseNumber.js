import { replace, trim, escapeRegExp } from 'lodash'

import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function parseNumber(
  value,
  { radix = '.', thousandsSeparator = ',' } = EMPTY_OBJECT,
) {
  const formattedValue = replace(
    trim(trim(value), radix),
    new RegExp(escapeRegExp(thousandsSeparator), 'g'),
    '',
  )
  const parsedValue = parseFloat(formattedValue)
  return `${parsedValue}` !== formattedValue || isNaN(parsedValue)
    ? value
    : parsedValue
}
