import { DateTime } from "luxon";

export function addTimeOffset(string) {
  return DateTime.fromISO(string, { setZone: true }).toISO();
}

export function parseDate(string, withTime = false) {
  const date = DateTime.fromISO(string);

  return {
    string: withTime
      ? date.toFormat("dd-LL-yyyy T")
      : date.toFormat("dd-LL-yyyy"),
    timestamp: date.toMillis(),
  };
}
