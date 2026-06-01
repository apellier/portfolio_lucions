"use client";

import Image from "next/image";
import Link from "next/link";
import type { Photo } from "@/lib/photos";
import styles from "./FeaturedStrip.module.css";

interface FeaturedStripProps {
  photos: Photo[];
  title?: string;
  lang?: string;
}

export default function FeaturedStrip({ photos, title, lang }: FeaturedStripProps) {
  const currentLang = lang || 'fr';
  return (
    <section className={styles.section} aria-label={title || "Selected Works"}>
      <h2 className={styles.heading}>{title || "Selected Works"}</h2>

      <div className={styles.strip} role="list">
        {photos.map((photo) => (
          <Link
            key={photo.slug}
            href={`/${currentLang}/gallery/${photo.slug}`}
            className={styles.card}
            role="listitem"
          >
            <Image
              className={styles.cardImage}
              src={photo.src}
              alt={photo.title}
              fill
              sizes="400px"
            />
            <div className={styles.cardOverlay}>
              <span className={styles.cardTitle}>{photo.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
