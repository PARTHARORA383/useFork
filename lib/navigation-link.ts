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
        items: [{ id: 0, title: 'Introduction', href: '/docs' }],
      },
    ],
  },
  {
    heading: 'Components',
    subheadings: [
      {
        subheading: 'interactive',
        items: [
          { id: 1, title: 'Reveal Button', href: '/docs/reveal-button' },
          { id: 2, title: 'StopWatch', href: '/docs/stopwatch' },
          { id: 3, title: 'Parallax Image', href: '/docs/parallax-images' },
          { id: 4, title: 'Banner Carousal', href: '/docs/banner-carousal' },
          { id: 5, title: 'Code Block', href: '/docs/code-block' },
          { id: 6, title: 'Save Toggle', href: '/docs/save-toggle' },
          { id: 7, title: 'Flip Card', href: '/docs/flip-card-hover' },
          { id: 8, title: 'Side Navigation', href: '/docs/side-navigation' },
          { id: 9, title: 'Text Video Mask', href: '/docs/text-video-mask' },
          { id: 10, title: 'Text Hover Marquee', href: '/docs/text-hover-marquee' },
          { id: 11, title: 'Carousal-01', href: '/docs/carousal01' },
          { id: 12, title: 'Parallax Slider', href: '/docs/parallax-slider' },
          {id : 16, title: 'Cool Buttons', href: '/docs/cool-buttons' }
        ],
      },
      {
        subheading: 'text-wrappers',
        items: [
          { id: 13, title: 'Wave Effect', href: '/docs/wave-in-text' },
          { id: 14, title: 'Rollin Effect', href: '/docs/roll-in-text' },
          { id: 15, title: 'RollOver Effect', href: '/docs/roll-over-text' },
        ],
      },
    ],
  },
];
