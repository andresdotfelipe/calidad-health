import Head from "next/head";
import Header from "../Header";
import styles from "../../styles/Layout.module.css";

export default function Layout({ children, title = "CALIDAD Health" }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Web application for medical appointmentsy"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className={styles.container}>{children}</div>
    </>
  );
}
