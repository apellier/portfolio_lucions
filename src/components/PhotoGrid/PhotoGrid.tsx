'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Photo } from '@/lib/photos';
import TagFilter from '@/components/TagFilter/TagFilter';
import styles from './PhotoGrid.module.css';

interface PhotoGridProps {
  photos: Photo[];
  lang?: string;
  allLabel?: string;
}

export default function PhotoGrid({ photos, lang, allLabel }: PhotoGridProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const currentLang = lang || 'fr';

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    photos.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [photos]);

  const filteredPhotos = useMemo(() => {
    if (activeTag === null) return photos;
    return photos.filter((p) => p.tags.includes(activeTag));
  }, [photos, activeTag]);

  return (
    <section>
      <TagFilter
        tags={allTags}
        activeTag={activeTag}
        onTagChange={setActiveTag}
        allLabel={allLabel}
      />

      {/* key forces re-mount to replay fade-in animations on filter change */}
      <div className={styles.grid} key={activeTag ?? '__all'}>
        {filteredPhotos.map((photo) => (
          <div
            key={photo.slug}
            className={`${styles.item} animate-on-scroll`}
          >
            <Link
              href={`/${currentLang}/gallery/${photo.slug}`}
              className={styles.itemLink}
              aria-label={`View "${photo.title}"`}
            >
              <Image
                src={photo.src}
                alt={photo.title}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className={styles.image}
              />
              <div className={styles.overlay} aria-hidden="true">
                <h3 className={styles.title}>{photo.title}</h3>
                <span className={styles.tags}>{photo.tags.join(' · ')}</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
