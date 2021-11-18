import axios from "axios";

async function withAuthentication(context, callable) {
  const token = context.req.cookies.BEARER;
  const location = context?.params?.location;

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

  try {
    return await callable(axios.create(options), location);
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        notFound: true,
      };
    }

    if (error.response?.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    console.error(error.response);

    throw error;
  }
}

export default withAuthentication;
