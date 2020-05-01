import { branch, compose, withPropsOnChange } from 'recompose'

import { editableProp } from '../decorators/editableProp'
import { cyclableProp } from '../decorators/cyclableProp'
import { hasProp } from '../tools/hasProp'

export const toggledEditing = branch(
  /*
  Sets the `editing` prop and enables its toggling through the `onToggleEditing()` prop. 
  */
  hasProp('onChange'),
  compose(
    editableProp('editing'),
    cyclableProp({ name: 'editing', onCycleName: 'onToggleEditing' }),
    withPropsOnChange(['editing'], ({ editing, onChange, onPush }) => ({
      onChange: editing ? onChange : null,
      onPush: editing ? onChange : onPush,
    })),
  ),
)
