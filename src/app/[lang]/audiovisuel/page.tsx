import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getAllExperiences } from "@/lib/audiovisuel";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: `${dict.audiovisuel.metaTitle} | Lucions`,
    description: dict.audiovisuel.metaDescription,
  };
}

export default async function AudiovisuelPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const experiences = getAllExperiences();

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{dict.audiovisuel.title}</h1>
          <p className={styles.subtitle}>{dict.audiovisuel.subtitle}</p>
        </section>

        <section className={styles.listSection}>
          <div className={styles.grid}>
            {experiences.map((exp) => (
              <article key={exp.slug} className={`${styles.card} animate-on-scroll`}>
                <Link href={`/${lang}/audiovisuel/${exp.slug}`} className={styles.imageLink}>
                  <div className={styles.imageContainer}>
                    <Image
                      src={exp.coverImage}
                      alt={exp.title[lang as Locale]}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={styles.image}
                    />
                  </div>
                </Link>

                <div className={styles.content}>
                  <div className={styles.metaRow}>
                    <span className={styles.role}>{exp.role[lang as Locale]}</span>
                    <span className={styles.dateInfo}>
                      <MapPin size={12} className={styles.icon} />
                      {exp.dateAndLocation[lang as Locale]}
                    </span>
                  </div>

                  <h2 className={styles.projectTitle}>
                    <Link href={`/${lang}/audiovisuel/${exp.slug}`} className={styles.titleLink}>
                      {exp.title[lang as Locale]}
                    </Link>
                  </h2>

                  <p className={styles.shortDesc}>
                    {exp.shortDescription[lang as Locale]}
                  </p>

                  <Link href={`/${lang}/audiovisuel/${exp.slug}`} className={styles.readMore}>
                    <span>{lang === 'fr' ? 'Découvrir le projet' : 'Discover project'}</span>
                    <ArrowRight size={14} className={styles.arrow} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
