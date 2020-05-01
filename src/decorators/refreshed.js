import { compose } from 'recompose'

import { interval } from '../tools/interval'

import { refreshable } from './refreshable'
import { withEffect } from './withEffect'

export const refreshed = compose(
  /*
  Refreshes the component at a given `delay` interval. See `interval` for the behavior based on `delay`.
  */
  refreshable,
  withEffect(['delay'], ({ delay, onRefresh }) => interval(delay, onRefresh)),
)
