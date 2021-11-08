function getLocalStorage() {
  if (typeof window !== "undefined") {
    return localStorage;
  }

  return null;
}

export default getLocalStorage;
