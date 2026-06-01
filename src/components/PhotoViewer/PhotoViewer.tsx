'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Photo } from '@/lib/photos';
import styles from './PhotoViewer.module.css';

interface PhotoViewerProps {
  photo: Photo;
  prevPhoto: Photo | null;
  nextPhoto: Photo | null;
  lang: string;
  dict: {
    backToGallery: string;
    previous: string;
    next: string;
    tags: string;
  };
}

function formatDate(dateTaken: string, lang: string): string {
  // Handles "YYYY-MM" or "YYYY-MM-DD" formats
  const cleanDateStr = dateTaken.length === 7 ? `${dateTaken}-02` : dateTaken;
  const dateObj = new Date(cleanDateStr);
  return dateObj.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    month: 'long',
    year: 'numeric',
  });
}

export default function PhotoViewer({ photo, prevPhoto, nextPhoto, lang, dict }: PhotoViewerProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === 'ArrowLeft' && prevPhoto) {
        router.push(`/${lang}/gallery/${prevPhoto.slug}`);
      } else if (e.key === 'ArrowRight' && nextPhoto) {
        router.push(`/${lang}/gallery/${nextPhoto.slug}`);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, prevPhoto, nextPhoto, lang]);

  return (
    <section className={styles.viewer}>
      {/* Back to gallery link */}
      <Link href={`/${lang}/gallery`} className={styles.backLink}>
        <ArrowLeft size={16} className={styles.backIcon} aria-hidden="true" />
        {dict.backToGallery}
      </Link>

      {/* Main content: photo + metadata */}
      <div className={styles.content}>
        {/* Photo */}
        <div className={styles.photoContainer}>
          <Image
            src={photo.src}
            alt={photo.title}
            width={photo.width}
            height={photo.height}
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 70vw"
            className={styles.photo}
          />
        </div>

        {/* Metadata panel */}
        <div className={styles.metadata} role="complementary" aria-label="Photo details">
          {/* Title + Date */}
          <header className={styles.header}>
            <h1 className={styles.title}>{photo.title}</h1>
            {photo.dateTaken && (
              <time className={styles.date} dateTime={photo.dateTaken}>
                {formatDate(photo.dateTaken, lang)}
              </time>
            )}
          </header>

          {/* Description */}
          {photo.description && (
            <>
              <hr className={styles.separator} />
              <p className={styles.description}>{photo.description}</p>
            </>
          )}

          {/* Tags */}
          {photo.tags.length > 0 && (
            <>
              <hr className={styles.separator} />
              <div className={styles.tagsSection}>
                <span className={styles.tagsLabel}>{dict.tags}</span>
                <div className={styles.tags} role="list">
                  {photo.tags.map((tag) => (
                    <span key={tag} className={styles.tag} role="listitem">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <hr className={styles.separator} />
          <nav className={styles.navigation} aria-label="Photo navigation">
            {prevPhoto ? (
              <Link
                href={`/${lang}/gallery/${prevPhoto.slug}`}
                className={styles.navLink}
                aria-label={`${dict.previous}: ${prevPhoto.title}`}
              >
                <ArrowLeft
                  size={16}
                  className={`${styles.navIcon} ${styles.navIconPrev}`}
                  aria-hidden="true"
                />
                {dict.previous}
              </Link>
            ) : (
              <span className={styles.navSpacer} />
            )}

            {nextPhoto ? (
              <Link
                href={`/${lang}/gallery/${nextPhoto.slug}`}
                className={styles.navLink}
                aria-label={`${dict.next}: ${nextPhoto.title}`}
              >
                {dict.next}
                <ArrowRight
                  size={16}
                  className={`${styles.navIcon} ${styles.navIconNext}`}
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <span className={styles.navSpacer} />
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
