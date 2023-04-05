export function uniqBy<TItem>(array: TItem[], key: string): TItem[] {
  return Object.values(
    array.reduce(
      (map, item) => ({
        ...map,
        [`${item[key]}`]: item,
      }),
      {}
    )
  );
}
