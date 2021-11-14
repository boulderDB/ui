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
    return {
      props: await callable(axios.create(options), location),
    };
  } catch (error) {
    if (error.response.status === 404) {
      return {
        notFound: true,
      };
    }

    if (error.response.status === 401) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
}

export default withAuthentication;
