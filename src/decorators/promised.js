import { promisedProp } from './promisedProp'

/*
Replaces the promise at prop `value` with `{ done, error, value }`.
Before the promise resolves, `done` is `false`, and becomes `true` afterwards.
If an error occured in the promise, `error` is set to it. Otherwise, the `value` is set to the resolved value.
If the promise at prop `value` changes, `done`, `error`, and `value` are reset and any previous promise is discarded.
*/
export const promised = promisedProp({
  name: 'value',
  doneName: 'done',
  errorName: 'error',
})
