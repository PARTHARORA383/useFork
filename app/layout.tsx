import '@/app/global.css';
import { CustomNavbar } from '@/components/navbar';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col ">
        <RootProvider
          search={{
            enabled: false,
          }}
        >
          <Analytics />
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
