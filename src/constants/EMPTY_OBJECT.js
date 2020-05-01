/*
Immutable empty object. Using this instead of `{}` avoids having several instances of immutable empty objects.
*/
export const EMPTY_OBJECT = Object.freeze(Object.create(null))
