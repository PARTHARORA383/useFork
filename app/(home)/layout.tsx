import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      className="dark:bg-muted pt-3 pl-2 pr-2 "
      {...baseOptions()}
      searchToggle={{ enabled: false }}
      nav={{ enabled: false }}
    >
      {children}
    </HomeLayout>
  );
}
