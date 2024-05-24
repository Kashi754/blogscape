export function convertDateToString(date) {
  const dateTimestamp = new Date(date);
  const dateOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  return new Intl.DateTimeFormat(undefined, dateOptions).format(dateTimestamp);
}
