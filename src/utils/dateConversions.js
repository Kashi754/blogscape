export function convertTimestampToDate(timestamp) {
  const splitTimestamp = timestamp.split(/[- :]/);
  const convertedDate = new Date(
    Date.UTC(
      splitTimestamp[0],
      splitTimestamp[1] - 1,
      splitTimestamp[2],
      splitTimestamp[3],
      splitTimestamp[4],
      splitTimestamp[5]
    )
  );
  return convertedDate;
}

export function convertDateToString(date) {
  const dateOptions = {
    dateStyle: 'medium',
    timeStyle: 'short',
  };

  return new Intl.DateTimeFormat(undefined, dateOptions).format(date);
}

export function convertTimestampToString(timestamp) {
  let date = convertTimestampToDate(timestamp);
  if (typeof date === 'string') {
    date = convertTimestampToDate(date);
  }
  return convertDateToString(date);
}
