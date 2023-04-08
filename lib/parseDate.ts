import { DateTime } from "luxon";

export function parseDate(input: string, withTime = false): string {
  const date = DateTime.fromISO(input);

  return withTime ? date.toFormat("dd.LL.yyyy T") : date.toFormat("dd.LL.yyyy");
}
