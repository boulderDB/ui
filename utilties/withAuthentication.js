import axios from "axios";

async function withAuthentication(context, callable) {
  const token = context.req.cookies.BEARER;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  let options = {
    baseURL: process.env.NEXT_PUBLIC_API_PROXY + "/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return callable(axios.create(options));
}

export default withAuthentication;
