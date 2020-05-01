export function isValidDate(date) {
  /*
	Returns `true` if the provided `date` is valid.
	*/
  return !isNaN(date.getTime())
}
