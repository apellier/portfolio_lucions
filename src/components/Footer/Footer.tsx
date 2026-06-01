import styles from './Footer.module.css';

interface FooterProps {
  dict?: {
    rights: string;
  };
}

export default function Footer({ dict }: FooterProps) {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <span className={styles.text}>© 2025 Lucions</span>
        <span className={styles.text}>{dict?.rights || "All rights reserved"}</span>
      </div>
    </footer>
  );
}
