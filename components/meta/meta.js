import Head from "next/head";

function Meta({ children }) {
  const title = "BoulderDB";
  const description = "BoulderDB";
  const image = "";

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <meta name="application-name" content={title} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />

      <meta name="description" content={description} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#5759FB" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#5759FB" />

      <link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/touch-icon-ipad.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/touch-icon-iphone-retina.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="167x167"
        href="/icons/touch-icon-ipad-retina.png"
      />

      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/icons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/icons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="mask-icon"
        href="/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="shortcut icon" href="/favicon.ico" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={title} />
      <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_HOST} />
      <meta property="og:image" content="/icons/apple-touch-icon.png" />

      <meta name="twitter:image" content="/icons/android-chrome-192x192.png" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:url" content={process.env.NEXT_PUBLIC_SITE_HOST} />
      <meta name="twitter:description" content={description} />

      <meta name="google" content="notranslate" />

      {children}
    </Head>
  );
}

export default Meta;
