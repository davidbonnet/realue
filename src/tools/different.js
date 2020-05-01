import { same } from './same'

export function different(properties, deep = true) {
  /*
  Returns a function that returns `true` if one of the `properties` of the objects `(a, b)` differs. This is usefull when deep-nested comparisons are required.

  Example:

    // Extracts the name from a `value` prop and updates it only if it changes
    const withName = withPropsOnChange(
      different(['value.name']),
      ({ value: { name } }) => ({ name }),
    )
  */
  return (a, b) => !same(a, b, properties, deep)
}
