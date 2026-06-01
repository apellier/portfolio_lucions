import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import PhotoGrid from "@/components/PhotoGrid/PhotoGrid";
import Footer from "@/components/Footer/Footer";
import { getAllPhotos } from "@/lib/photos";
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
    title: dict.gallery.metaTitle,
    description: dict.gallery.metaDescription,
  };
}

export default async function GalleryPage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  const photos = getAllPhotos();

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main className={styles.main}>
        <section className={styles.hero}>
          <h1 className={styles.title}>{dict.gallery.title}</h1>
          <p className={styles.subtitle}>{dict.gallery.subtitle}</p>
        </section>
        <section className={styles.gridSection}>
          <PhotoGrid
            photos={photos}
            lang={lang}
            allLabel={dict.gallery.filterAll}
          />
        </section>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
