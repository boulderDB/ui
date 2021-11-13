import { useRouter } from "next/router";
import Head from "next/head";

function Meta({
  children,
  description: descriptionProp,
  title: titleProp,
  image: imageProp,
}) {
  const { asPath } = useRouter();

  const url = process.env.NEXT_PUBLIC_SITE_HOST + asPath;

  const title = titleProp ? titleProp : "";
  const description = descriptionProp ? descriptionProp : "";
  const image = imageProp ? imageProp : "";

  return (
    <Head>
      <title>BoulderDB – {title}</title>
      <meta name="description" content={description} />

      <meta
        property="og:title"
        content={`BoulderDB ${title ? "– " + title : ""}`}
      />
      <meta property="og:locale" content={"de"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:description"
        content={description ? description : description}
      />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      <meta
        name={`twitter:title`}
        content={`BoulderDB ${title ? "– " + title : ""}`}
      />
      <meta
        name={`twitter:description`}
        content={description ? description : description}
      />
      <meta name={`twitter:image`} content={image} />
      <meta name={`twitter:card`} content={`summary_large_image`} />

      {children}
    </Head>
  );
}

export default Meta;
