import { some } from 'lodash'

/*
Returns a function that checks if some prop `name` in `names` is `nil`.
*/
export const hasNotProps = (names) => (props) =>
  some(names, (name) => props[name] == null)
