import { isString, upperFirst } from 'lodash'
import { withPropsOnChange } from 'recompose'

import { EMPTY_OBJECT } from '../constants/EMPTY_OBJECT'

export function queriedProp(options) {
  /*
  Calls `[requestName]([name])` whenever `[name]` changes and stores the promise at `[valueName]`.
  An abortion method at `[onAbortName]` is injected if `AbortController` is defined.
  If `[onAbortName]` is called before the query resolves, it rejects the promise with an `AbortError` exception.
  */
  const name = isString(options) ? options : options.name
  const capitalizedName = upperFirst(name)
  const {
    requestName = `request${capitalizedName}`,
    onAbortName = `onAbort${capitalizedName}`,
    AbortController = globalThis.AbortController,
  } = name === options ? EMPTY_OBJECT : options
  return withPropsOnChange(
    [name, requestName],
    ({ [name]: value, [requestName]: request }) => {
      const controller = AbortController && new AbortController()
      return controller
        ? {
            [name]: value && request({ ...value, signal: controller.signal }),
            [onAbortName]: () => controller.abort(),
          }
        : {
            [name]: value && request(value),
          }
    },
  )
}
