export interface NavItem {
  id: number;
  title: string;
  href: string;
}

export interface NavSubheading {
  subheading: string;
  items: NavItem[];
}

export interface NavigationSection {
  heading: string;
  subheadings: NavSubheading[];
}
export const NavigationLinkData: NavigationSection[] = [
  {
    heading: 'Documentation',
    subheadings: [
      {
        subheading: 'overview',
        items: [{ id: 1, title: 'Introduction', href: '/docs' }],
      },
    ],
  },
  {
    heading: 'Components',
    subheadings: [
      {
        subheading: 'interactive',
        items: [
          { id: 2, title: 'Reveal Button', href: '/docs/reveal-button' },
          { id: 3, title: 'StopWatch', href: '/docs/stopwatch' },
          { id: 4, title: 'Parallax Image', href: '/docs/parallax-images' },
          { id: 5, title: 'Banner Carousal', href: '/docs/banner-carousal' },
          { id: 6, title: 'Code Block', href: '/docs/code-block' },
          { id: 7, title: 'Save Toggle', href: '/docs/save-toggle' },
          { id: 8, title: 'Flip Card', href: '/docs/flip-card-hover' },
          { id: 9, title: 'Side Navigation', href: '/docs/side-navigation' },
          { id: 10, title: 'Text Video Mask', href: '/docs/text-video-mask' },
          { id: 11, title: 'Text Hover Marquee', href: '/docs/text-hover-marquee' },
        ],
      },
      {
        subheading: 'text-wrappers',
        items: [
          { id: 12, title: 'Wave Effect', href: '/docs/wave-in-text' },
          { id: 13, title: 'Rollin Effect', href: '/docs/roll-in-text' },
          { id: 14, title: 'RollOver Effect', href: '/docs/roll-over-text' },
        ],
      },
    ],
  },
];
