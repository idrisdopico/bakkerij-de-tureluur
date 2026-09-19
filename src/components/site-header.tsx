'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { useActiveSection } from '../hooks/use-active-section';
import { useBodyScrollLock } from '../hooks/use-body-scroll-lock';
import { useElementHeight } from '../hooks/use-element-height';
import { useEscapeKey } from '../hooks/use-escape-key';
import { useHasScrolled } from '../hooks/use-has-scrolled';
import { useScrolled } from '../hooks/use-scrolled';
import styles from './site-header.module.scss';

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'Over ons', href: '#over' },
  { label: 'Assortiment', href: '#assortiment' },
  { label: 'Contact', href: '#contact' },
];

const SECTION_IDS = NAV_LINKS.map(link => link.href.slice(1));

// How long a just-clicked link's active state overrides the scroll-driven
// one — long enough to cover the in-page smooth-scroll to the target
// section, so the link highlights the instant it's clicked instead of
// waiting for the scroll (and the observer catching up to it) to finish.
const CLICK_OVERRIDE_MS = 700;

export type SiteHeaderProps = {
  title: string;
};

export function SiteHeader({ title }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setIsMenuOpen(false);
    toggleRef.current?.focus();
  };

  useBodyScrollLock(isMenuOpen);
  useEscapeKey(isMenuOpen, closeMenu);

  const isScrolled = useScrolled();

  // Measured live, not hardcoded — the header shrinks on scroll (see the
  // `[data-scrolled='true']` rules in site-header.module.scss), so a fixed
  // "header height" constant would be wrong in one of its two states.
  // Synced to `--header-height` (global.scss's `scroll-padding-top` reads
  // it) so both stay correct together, and fed straight into
  // `useActiveSection` for the same reason.
  const headerHeight = useElementHeight(headerRef);

  useEffect(() => {
    if (headerHeight > 0) {
      document.documentElement.style.setProperty(
        '--header-height',
        `${headerHeight}px`,
      );
    }
  }, [headerHeight]);

  const activeId = useActiveSection({
    ids: SECTION_IDS,
    topOffset: headerHeight,
  });

  // Scroll-driven activeId lags behind a click by however long the in-page
  // smooth-scroll takes, so a clicked link briefly overrides it — otherwise
  // the nav shows the *previous* section active until the scroll (and the
  // IntersectionObserver catching up to it) finishes.
  const [clickOverrideHref, setClickOverrideHref] = useState<string | null>(
    null,
  );
  // Separate from `clickOverrideHref` (which clears itself after
  // `CLICK_OVERRIDE_MS`): this stays `true` forever once a nav link has
  // been pressed, same one-way-latch idea as `useHasScrolled` below.
  const [hasClicked, setHasClicked] = useState(false);
  const clickOverrideTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleNavLinkClick = (href: string) => {
    setHasClicked(true);
    setClickOverrideHref(href);
    clearTimeout(clickOverrideTimeoutRef.current);

    clickOverrideTimeoutRef.current = setTimeout(() => {
      setClickOverrideHref(null);
    }, CLICK_OVERRIDE_MS);
  };

  useEffect(() => {
    return () => clearTimeout(clickOverrideTimeoutRef.current);
  }, []);

  const hasScrolled = useHasScrolled();

  // No link should read as "active" just because the page loaded there —
  // only once the user has actually scrolled or pressed a nav link. A
  // press wins over a scroll-in-progress while its override is live
  // (`clickOverrideHref`), which is also why `handleNavLinkClick` sets
  // `hasClicked` immediately rather than waiting on the scroll it triggers.
  const hasInteracted = hasScrolled || hasClicked;
  const activeHref = hasInteracted
    ? (clickOverrideHref ?? (activeId ? `#${activeId}` : null))
    : null;

  // The overlay stays mounted (see mobileNav's `inert` below) so it can
  // transition in/out — move focus into it on open, same as any full-screen
  // panel/dialog.
  useEffect(() => {
    if (isMenuOpen) {
      firstMobileLinkRef.current?.focus();
    }
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={isScrolled}>
      <div className={styles.bar}>
        <Link className={styles.logoLink} href="#home" onClick={closeMenu}>
          <Image
            className={styles.logo}
            src="/logo.png"
            alt=""
            width={68}
            height={68}
            // The header is sticky and visible on first paint — without
            // this, next/image lazy-loads it like any other image, which
            // can delay a piece of always-visible chrome.
            priority
          />
          <span className={styles.title}>{title}</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Hoofdmenu">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.desktopLink}
              aria-current={link.href === activeHref ? 'page' : undefined}
              data-active={link.href === activeHref}
              onClick={() => handleNavLinkClick(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.menuToggle}
          aria-label={isMenuOpen ? 'Sluit menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => (isMenuOpen ? closeMenu() : setIsMenuOpen(true))}>
          <span className={styles.menuToggleLine} data-open={isMenuOpen} />
          <span className={styles.menuToggleLine} data-open={isMenuOpen} />
          <span className={styles.menuToggleLine} data-open={isMenuOpen} />
        </button>
      </div>

      <nav
        className={styles.mobileNav}
        aria-label="Mobiel menu"
        data-open={isMenuOpen}
        inert={!isMenuOpen}>
        {NAV_LINKS.map((link, index) => (
          <Link
            key={link.href}
            ref={index === 0 ? firstMobileLinkRef : undefined}
            href={link.href}
            className={styles.mobileLink}
            aria-current={link.href === activeHref ? 'page' : undefined}
            data-active={link.href === activeHref}
            onClick={() => {
              handleNavLinkClick(link.href);
              closeMenu();
            }}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
