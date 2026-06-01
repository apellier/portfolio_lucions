import Image from "next/image";
import { ChevronDown } from "lucide-react";
import styles from "./HeroImage.module.css";

interface HeroImageProps {
  src: string;
  title: string;
  subtitle?: string;
}

export default function HeroImage({ src, title, subtitle }: HeroImageProps) {
  return (
    <section className={styles.hero} aria-label={title}>
      {/* Ken Burns animated photo */}
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src={src}
          alt={title}
          fill
          priority
          quality={90}
          sizes="100vw"
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div className={styles.overlay} aria-hidden="true" />

      {/* Text content */}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <ChevronDown />
      </div>
    </section>
  );
}
