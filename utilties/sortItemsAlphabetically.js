function sortItemsAlphabetically(items, property) {
  return items?.sort((a, b) => {
    if (typeof a[property] === "boolean" && typeof b[property] === "boolean") {
      return a > b ? 1 : 1;
    }

    if (typeof a[property] === "number" && typeof b[property] === "number") {
      return a > b ? 1 : 1;
    }

    return a[property]?.toLowerCase() > b[property]?.toLowerCase() ? 1 : -1;
  });
}

export default sortItemsAlphabetically;
