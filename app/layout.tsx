import "../styles/globals/index.css";
import styles from "./layout.module.css";
import { getTokenPayload, isAuthenticated } from "../lib/api";
import { Header } from "../components/header/_header";
import { get } from "../lib/http";
import { Location } from "../lib/types";
import { redirect } from "next/navigation";

export default async function RootLayout({ children }) {
  const authenticated = isAuthenticated();
  const tokenPayload = getTokenPayload();

  const locations = await get<Location[]>("/locations");

  // if (!authenticated) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body>
        <Header
          tokenPayload={tokenPayload}
          authenticated={authenticated}
          locations={locations}
          backlink={authenticated ? "/" : "/login"}
        />

        <main className={styles.main}>{children}</main>
      </body>
    </html>
  );
}
