import { wrapDisplayName, getDisplayName } from 'recompose'

export function setWrapperName(Component, Wrapper) {
  if (process.env.NODE_ENV === 'production') {
    return Wrapper
  }
  Wrapper.displayName = wrapDisplayName(Component, getDisplayName(Wrapper))
  return Wrapper
}
