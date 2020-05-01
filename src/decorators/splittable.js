import { join, pick } from 'lodash'
import { withHandlers } from 'recompose'

export const splittable = withHandlers({
  /*
  Enables dispatching a subset of properties to a child element.
  */
  properties: ({ value, onChangeProperties: onChange }) => (
    names,
    key = join(names, '-'),
  ) => ({
    value: pick(value, names),
    key,
    name: key,
    onChange,
  }),
})
