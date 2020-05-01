import { pickBy } from 'lodash'
import { mapProps } from 'recompose'

import { DOM_PROP_NAMES } from '../constants/DOM_PROP_NAMES'

/*
Only keeps DOM properties.
*/
export const domProps = mapProps((props) =>
  pickBy(props, (value, name) => DOM_PROP_NAMES[name] === true),
)
