import "../styles/globals/index.css";
import styles from "./layout.module.css";
import { getTokenPayload, isAuthenticated } from "../lib/api";
import { Header } from "../components/header/_header";
import { api } from "../lib/http";
import { Location } from "../lib/types";
import { redirect } from "next/navigation";
import { Footer } from "../components/footer/footer";

export default async function RootLayout({ children }) {
  const authenticated = isAuthenticated();
  const tokenPayload = getTokenPayload();

  const locations = await api<Location[]>("/locations");

  // if (!authenticated) {
  //   redirect("/login");
  // }

  return (
    <html lang="en">
      <body>
        <div className={styles.root}>
          <Header
            tokenPayload={tokenPayload}
            authenticated={authenticated}
            locations={locations}
            backlink={authenticated ? "/" : "/login"}
          />

          <main className={styles.main}>{children}</main>

          <Footer />
        </div>
      </body>
    </html>
  );
}
