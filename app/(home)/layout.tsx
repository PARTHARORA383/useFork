import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';

export default function Layout({ children }: LayoutProps<'/'>) {
  return <HomeLayout  className='dark:bg-muted' {...baseOptions()} searchToggle={{enabled : false}} nav={{enabled : false}}>{children}</HomeLayout>;
}
