import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";
import { getDictionary, Locale } from "@/lib/dictionaries";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.about.metaTitle,
    description: dict.about.metaDescription,
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{dict.about.title}</h1>
        </section>

        <section className={styles.content}>
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>{dict.about.visionTitle}</h2>
            <p className={styles.text}>{dict.about.visionText1}</p>
            <p className={styles.text}>{dict.about.visionText2}</p>
          </div>

          <div className={styles.divider} />

          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>{dict.about.getInTouchTitle}</h2>
            <p className={styles.text}>{dict.about.getInTouchText}</p>
            <div className={styles.contactLinks}>
              <a href="mailto:hello@lucions.com" className={styles.contactLink}>
                hello@lucions.com
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
