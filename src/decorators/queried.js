import { queriedProp } from './queriedProp'

/*
Calls `request(query)` whenever the query at `query` changes and stores the result progress at `value`.
An abortion method at `onAbort` is injected. If called before the query resolves, it aborts it, sending the exception to `value.error`.
*/
export const queried = queriedProp({
  queryName: 'value',
  onAbortName: 'onAbort',
})
