'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

interface HeaderProps {
  lang: string;
  dict: {
    gallery: string;
    about: string;
    audiovisuel: string;
  };
}

const SCROLL_THRESHOLD = 50;

export default function Header({ lang, dict }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const NAV_LINKS = [
    { href: `/${lang}/gallery`, label: dict.gallery },
    { href: `/${lang}/audiovisuel`, label: dict.audiovisuel },
    { href: `/${lang}/about`, label: dict.about },
  ] as const;

  /* ---------- Scroll detection ---------- */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ---------- Lock body scroll when mobile menu is open ---------- */
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  /* ---------- Close mobile menu on route change ---------- */
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  /* ---------- Close mobile menu on Escape ---------- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/');

  const getLanguageSwitchPath = (targetLang: string) => {
    if (!pathname) return `/${targetLang}`;
    const segments = pathname.split('/');
    if (segments.length > 1 && (segments[1] === 'fr' || segments[1] === 'en')) {
      segments[1] = targetLang;
      return segments.join('/');
    }
    return `/${targetLang}`;
  };

  return (
    <header
      className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}
      role="banner"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <Link href={`/${lang}`} className={styles.logo} aria-label="Lucions — Home">
          LUCIONS
        </Link>

        {/* Desktop navigation */}
        <div className={styles.desktopNavWrapper}>
          <nav aria-label="Main navigation">
            <ul className={styles.desktopNav}>
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${isActive(href) ? styles.navLinkActive : ''}`}
                    aria-current={isActive(href) ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.languageSwitcher}>
            <Link
              href={getLanguageSwitchPath('fr')}
              className={`${styles.langBtn} ${lang === 'fr' ? styles.langBtnActive : ''}`}
              aria-label="Version française"
            >
              FR
            </Link>
            <span className={styles.langDivider}>|</span>
            <Link
              href={getLanguageSwitchPath('en')}
              className={`${styles.langBtn} ${lang === 'en' ? styles.langBtnActive : ''}`}
              aria-label="English version"
            >
              EN
            </Link>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          className={styles.mobileToggle}
          onClick={toggleMobileMenu}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          type="button"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        className={`${styles.mobileOverlay} ${mobileOpen ? styles.mobileOverlayOpen : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.mobileNavList}>
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`${styles.mobileNavLink} ${isActive(href) ? styles.mobileNavLinkActive : ''}`}
                  aria-current={isActive(href) ? 'page' : undefined}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Language Switcher */}
        <div className={styles.mobileLanguageSwitcher}>
          <Link
            href={getLanguageSwitchPath('fr')}
            className={`${styles.mobileLangBtn} ${lang === 'fr' ? styles.mobileLangBtnActive : ''}`}
            tabIndex={mobileOpen ? 0 : -1}
          >
            Français
          </Link>
          <span className={styles.mobileLangDivider}>·</span>
          <Link
            href={getLanguageSwitchPath('en')}
            className={`${styles.mobileLangBtn} ${lang === 'en' ? styles.mobileLangBtnActive : ''}`}
            tabIndex={mobileOpen ? 0 : -1}
          >
            English
          </Link>
        </div>
      </div>
    </header>
  );
}
