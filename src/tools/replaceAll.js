import { escapeRegExp } from 'lodash'

export function replaceAll(string, find, replace) {
  /*
  Replaces all occurrences of `find` by `replace` in the provided `string`.
  */
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace)
}
