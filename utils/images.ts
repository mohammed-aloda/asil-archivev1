import type { SyntheticEvent } from 'react';

/**
 * Small (900px WebP) version of a product photo, for cards, cart and gallery thumbnails.
 * Thumbnails live in /public/images/thumbs/<same name>.webp.
 * If a thumbnail doesn't exist yet (e.g. a newly added product), use `thumbFallback`
 * as the img onError handler and the browser falls back to the full image.
 */
export function thumb(src: string | undefined): string {
  if (!src || !src.startsWith('/images/') || src.startsWith('/images/thumbs/')) return src || '';
  const file = src.split('/').pop() || '';
  const base = file.replace(/\.(jpe?g|png|webp)$/i, '');
  return `/images/thumbs/${base}.webp`;
}

export function thumbFallback(original: string) {
  return (e: SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.dataset.fallback !== '1') {
      img.dataset.fallback = '1';
      img.src = original;
    }
  };
}
