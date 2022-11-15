import Link from "next/link";
import Layout from "../components/Layout";
import { FaHandHoldingMedical, FaBookMedical } from "react-icons/fa";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Layout>
      <main className={styles.main}>        
        <Link href="/appointments/request">
          <a>
            <section className={styles.request}>
              <FaHandHoldingMedical
                className={`${styles.icon} ${styles.requestIcon}`}
              />
              Request an appointment
            </section>
          </a>
        </Link>
        <Link href="/appointments/check">
          <a>
            <section className={styles.check}>
              <FaBookMedical className={`${styles.icon} ${styles.checkIcon}`} />
              Check appointments
            </section>
          </a>
        </Link>
      </main>
    </Layout>
  );
}
