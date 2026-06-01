'use client';

import styles from './TagFilter.module.css';

interface TagFilterProps {
  tags: string[];
  activeTag: string | null;
  onTagChange: (tag: string | null) => void;
  allLabel?: string;
}

export default function TagFilter({ tags, activeTag, onTagChange, allLabel }: TagFilterProps) {
  return (
    <nav aria-label="Filter photos by tag" className={styles.filterBar}>
      <button
        type="button"
        className={`${styles.tag} ${activeTag === null ? styles.tagActive : ''}`}
        onClick={() => onTagChange(null)}
        aria-pressed={activeTag === null}
      >
        {allLabel || 'All'}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`${styles.tag} ${activeTag === tag ? styles.tagActive : ''}`}
          onClick={() => onTagChange(tag)}
          aria-pressed={activeTag === tag}
        >
          {tag}
        </button>
      ))}
    </nav>
  );
}
