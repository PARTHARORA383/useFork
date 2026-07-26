import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { CustomNavbar } from '@/components/navbar';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'USEFORK — Design Led Components for Bold Interfaces',
  description:
    'A collection of design led components built for modern interfaces.',
  openGraph: {
    title: 'USEFORK — Design Led Components for Bold Interfaces',
    description:
      'A collection of design led components built for modern interfaces.',
    url: 'https://usefork.dev',
    siteName: 'USEFORK',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'USEFORK — Design Led Components for Bold Interfaces',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USEFORK — Design Led Components for Bold Interfaces',
    description:
      'A collection of design led components built for modern interfaces.',
    images: ['/images/og.png'],
  },
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col dark">
        <RootProvider
          search={{
            enabled: false,
          }}
        >
          <Analytics />
          <CustomNavbar />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}