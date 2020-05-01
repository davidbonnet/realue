import { every } from 'lodash'

/*
Returns a function that checks if every prop `name` in `names` is not `nil`.
*/
export const hasProps = (names) => (props) =>
  every(names, (name) => props[name] != null)
