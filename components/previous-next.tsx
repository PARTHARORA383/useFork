'use client';

import { NavigationLinkData, NavigationSection } from '@/lib/navigation-link';

export function getAllPages() {
  const pages: { id: number; title: string; href: string }[] = [];

  for (const section of NavigationLinkData) {
    for (const sub of section.subheadings) {
      for (const item of sub.items) {
        pages.push({ id: item.id, title: item.title, href: item.href });
      }
    }
  }

  return pages;
}

export function getPrevNext(currentHref: string) {
  const flatPages = getAllPages();

  const index = flatPages.findIndex((p) => p.href === currentHref);

  return {
    prev: index > 0 ? flatPages[index - 1] : null,
    next: index < flatPages.length - 1 ? flatPages[index + 1] : null,
  };
}
