const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function parseDate(string, withTime = false) {
  const date = new Date(string);
  const day = ("0" + date.getDate()).slice(-2);

  let dateString = `${day} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()}`;

  if (withTime) {
    dateString += ` ${date.getHours()}:${date.getMinutes()}`;
  }

  return {
    string: dateString,
    timestamp: date.getTime(),
  };
}

export default parseDate;
