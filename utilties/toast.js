function toast(title, description = null, type = "info", timeout = 2000) {
  return {
    title,
    description,
    type,
    timeout,
  };
}

export default toast;
