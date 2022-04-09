import moment from "moment";

function parseDate(string, withTime = false) {
  const date = moment(string);

  return {
    string: withTime
      ? date.format("D MMMM YYYY HH:mm")
      : date.format("D MMMM YYYY"),
    timestamp: date.unix(),
  };
}

export default parseDate;
