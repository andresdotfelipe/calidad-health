import Link from "next/link";
import styles from "../../styles/Header.module.css";

export default function Header() {
  return (
    <header>
      <nav className={styles.nav}>
        <Link href="/">
          <a className={styles.brand}>CALIDAD Health</a>
        </Link>
      </nav>
    </header>
  );
}
