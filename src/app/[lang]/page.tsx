import Header from "@/components/Header/Header";
import HeroImage from "@/components/HeroImage/HeroImage";
import FeaturedStrip from "@/components/FeaturedStrip/FeaturedStrip";
import Footer from "@/components/Footer/Footer";
import { getHeroPhoto, getFeaturedPhotos } from "@/lib/photos";
import Link from "next/link";
import styles from "./page.module.css";
import { getDictionary, Locale } from "@/lib/dictionaries";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const hero = getHeroPhoto();
  const featured = getFeaturedPhotos();

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main>
        {hero && (
          <HeroImage
            src={hero.src}
            title={dict.home.title}
            subtitle={dict.home.subtitle}
          />
        )}

        {featured.length > 0 && (
          <section className={styles.featuredSection}>
            <FeaturedStrip
              photos={featured}
              title={dict.home.selectedWorks}
              lang={lang}
            />
          </section>
        )}

        <section className={styles.ctaSection}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{dict.home.exploreTitle}</h2>
            <p className={styles.ctaText}>{dict.home.exploreText}</p>
            <Link href={`/${lang}/gallery`} className={styles.ctaButton}>
              {dict.home.exploreButton}
            </Link>
          </div>
        </section>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
