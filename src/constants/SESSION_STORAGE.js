import { DOMStorage } from '../tools/DOMStorage'

/*
Storage that persists between page reloads, until the tab or window is closed. To be used with `persistedProp()` or `persisted`.
*/
export const SESSION_STORAGE = DOMStorage('sessionStorage')
