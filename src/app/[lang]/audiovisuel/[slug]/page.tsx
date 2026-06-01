import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getExperienceBySlug, getAllExperiences } from "@/lib/audiovisuel";
import { getDictionary, Locale } from "@/lib/dictionaries";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Film } from "lucide-react";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  const experiences = getAllExperiences();
  const locales = ["fr", "en"];
  return locales.flatMap((lang) =>
    experiences.map((exp) => ({
      lang,
      slug: exp.slug,
    }))
  );
}


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const exp = getExperienceBySlug(slug);
  if (!exp) return {};

  return {
    title: `${exp.title.en} | Audiovisuel | Lucions`,
    description: exp.shortDescription.en,
  };
}

export default async function AudiovisuelDetailPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const exp = getExperienceBySlug(slug);

  if (!exp) {
    notFound();
  }

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <Header lang={lang} dict={dict.nav} />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Back link */}
          <Link href={`/${lang}/audiovisuel`} className={styles.backLink}>
            <ArrowLeft size={16} className={styles.backIcon} aria-hidden="true" />
            {dict.audiovisuel.backToAudiovisuel}
          </Link>

          {/* Header section */}
          <header className={styles.header}>
            <div className={styles.metaRow}>
              <span className={styles.role}>{exp.role[lang as Locale]}</span>
              <span className={styles.date}>
                <MapPin size={14} className={styles.icon} />
                {exp.dateAndLocation[lang as Locale]}
              </span>
            </div>
            <h1 className={styles.title}>{exp.title[lang as Locale]}</h1>
          </header>

          {/* Featured media (cover image or video placeholder) */}
          <div className={styles.featuredMedia}>
            {exp.hasVideo ? (
              <div className={styles.videoPlaceholderContainer}>
                <div className={styles.videoOverlay}>
                  <Film size={48} className={styles.videoIcon} />
                  <h3 className={styles.videoPlaceholderTitle}>
                    {exp.title[lang as Locale]}
                  </h3>
                  <p className={styles.videoPlaceholderText}>
                    {dict.audiovisuel.videoPlaceholder}
                  </p>
                  <div className={styles.mockPlayBtn}>
                    <span>{dict.audiovisuel.playVideo}</span>
                  </div>
                </div>
                <Image
                  src={exp.coverImage}
                  alt={exp.title[lang as Locale]}
                  fill
                  sizes="100vw"
                  className={styles.videoPlaceholderBg}
                  priority
                />
              </div>
            ) : (
              <div className={styles.coverImageContainer}>
                <Image
                  src={exp.coverImage}
                  alt={exp.title[lang as Locale]}
                  fill
                  sizes="100vw"
                  className={styles.coverImage}
                  priority
                />
              </div>
            )}
          </div>

          {/* Description & info details */}
          <section className={styles.detailsSection}>
            <div className={styles.descriptionColumn}>
              <h2 className={styles.sectionHeading}>
                {dict.audiovisuel.descriptionLabel}
              </h2>
              {exp.description[lang as Locale].split('\n\n').map((paragraph, index) => (
                <p key={index} className={styles.paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Project Media Gallery */}
          {exp.gallery.length > 0 && (
            <section className={styles.gallerySection}>
              <h2 className={styles.sectionHeading}>
                {dict.audiovisuel.galleryLabel}
              </h2>
              <div className={styles.galleryGrid}>
                {exp.gallery.map((imgSrc, index) => (
                  <div key={index} className={styles.galleryItem}>
                    <Image
                      src={imgSrc}
                      alt={`${exp.title[lang as Locale]} - Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer dict={dict.footer} />
    </>
  );
}
