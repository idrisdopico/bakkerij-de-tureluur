import { useEffect, useState } from 'react';

type UseActiveSectionParams = {
  /** Element `id`s to track, in document order. */
  ids: string[];
  /**
   * Pixels to shrink the observed viewport by from the top — pass the
   * sticky header's height so a section only counts as "active" once it's
   * actually visible below the header, not the moment it slides underneath
   * it.
   */
  topOffset?: number;
};

// Slack *added* to `topOffset` when building the intersection root's top
// margin, pushing the observed band's top edge a few px *below* the offset
// line. `html`'s `scroll-padding-top` (see global.scss) lands a clicked-to
// section's top exactly on `topOffset` — and the previous section's *bottom*
// edge sits on that same line. Without this slack the band's top edge would
// straddle that shared boundary, so the previous section still intersects by
// a sliver (subpixel rounding alone is enough) and, since the topmost
// intersecting section wins below, it would wrongly stay active. Nudging the
// band's top edge down past the boundary keeps only the section actually
// below the header active.
const TOP_OFFSET_SLACK_PX = 8;

/**
 * Tracks which of the given section `id`s is currently scrolled into view
 * and returns it, for highlighting the matching nav link ("scrollspy").
 *
 * A section counts as active once it's visible in the band between
 * `topOffset` and 60% down the viewport — narrow enough that only one
 * section is usually active at a time, but forgiving enough that short
 * sections aren't skipped. When more than one section is visible at once,
 * the topmost (in `ids` order) wins, matching what the user is actually
 * looking at while scrolling down.
 *
 * The last section is a special case: once the page is scrolled to the very
 * bottom, a short trailing section (e.g. Contact) can't be pushed up far
 * enough to reach that band, so it would never win on its own and the nav
 * would revert to the previous section. While at the bottom we instead
 * activate the bottommost tracked section that's actually on screen, so the
 * final section highlights the way clicking its nav link expects.
 */
export function useActiveSection({
  ids,
  topOffset = 0,
}: UseActiveSectionParams): string | null {
  const [activeId, setActiveId] = useState<string | null>(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);

    if (elements.length === 0) {
      return;
    }

    const visibleIds = new Set<string>();

    // Within ~1px of the bottom of the scrollable page, accounting for
    // subpixel/zoom rounding that can leave `scrollY + innerHeight` a hair
    // short of `scrollHeight`.
    const isAtPageBottom = () =>
      Math.ceil(window.scrollY + window.innerHeight) >=
      document.documentElement.scrollHeight - 1;

    const update = () => {
      // At the page bottom, prefer the bottommost tracked section that's on
      // screen — it can't reach the detection band, but it's what the user
      // has scrolled to. Uses live geometry rather than `visibleIds`, since
      // that set only tracks the band, which such a section never enters.
      if (isAtPageBottom()) {
        const bottommostOnScreen = [...elements]
          .reverse()
          .find(
            element => element.getBoundingClientRect().top < window.innerHeight,
          );
        if (bottommostOnScreen) {
          setActiveId(bottommostOnScreen.id);
          return;
        }
      }

      const topmostVisible = ids.find(id => visibleIds.has(id));
      if (topmostVisible) {
        setActiveId(topmostVisible);
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id);
          } else {
            visibleIds.delete(entry.target.id);
          }
        }

        update();
      },
      {
        rootMargin: `-${topOffset + TOP_OFFSET_SLACK_PX}px 0px -60% 0px`,
        threshold: 0,
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    // Reaching the bottom doesn't always change which sections intersect the
    // band, so the observer alone can miss it — re-evaluate on scroll/resize
    // too. `update` reads layout (scrollHeight/getBoundingClientRect), so
    // coalesce those events to one call per animation frame to avoid layout
    // thrash on rapid scrolling. `setActiveId` also bails when unchanged.
    let frame = 0;
    const scheduleUpdate = () => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        update();
      });
    };
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [ids, topOffset]);

  return activeId;
}
