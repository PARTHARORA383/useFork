
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { CustomSidebar } from '@/components/custom-sidebar';
import { CustomNavbar } from '@/components/navbar';
import { DynamicIsland } from '@/components/dynamic-island';
export default function Layout({ children }: LayoutProps<'/docs'>) {


  return (
    <DocsLayout   tree={source.pageTree} {...baseOptions()}  sidebar={{enabled : true ,component : <CustomSidebar/>} }   nav={{enabled : true, component : <CustomNavbar/>}}  searchToggle={{enabled : false}} >
      <div className='pt-8 dark:bg-muted'>
      <DynamicIsland/>
      {children} 
      </div>
    </DocsLayout>
  );
}
