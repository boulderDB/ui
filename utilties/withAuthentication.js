import axios from "axios";

async function withAuthentication(context, callable) {
  let options = {
    baseURL: process.env.API_PROXY + "/api",
    headers: {
      Authorization: `Bearer ${context.req.cookies.BEARER}`,
    },
  };

  return callable(axios.create(options));
}

export default withAuthentication;
