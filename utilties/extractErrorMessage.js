function extractErrorMessage(error) {
  if (!error.response) {
    return "No response";
  }

  const { data } = error.response;

  if (data?.type === "formError") {
    const errors = error.response.data.errors;
    const fields = Object.keys(errors);

    return fields.map((field) => `${field}: ⚠️ ${errors[field]}`);
  }

  if (data.message) {
    return data.message;
  }

  return error.response.statusText;
}

export default extractErrorMessage;
