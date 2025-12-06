import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { CustomSidebar } from '@/components/custom-sidebar';
import { OpenCodeContextfunc } from '@/hooks/use-opencode';
import { CustomToolbar } from '@/components/custom-toolbar';
import { PrevNext } from '@/hooks/use-prev-next';
import { PageLoader } from '@/components/page-loader';
export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <PrevNext>
      <OpenCodeContextfunc>
        <DocsLayout
          tree={source.pageTree}
          {...baseOptions()}
          sidebar={{ enabled: false }}
          nav={{ enabled: false }}
          searchToggle={{ enabled: false }}
        >
          
          <div className="pt-8 dark:bg-muted ">
            <CustomSidebar />
            <CustomToolbar />
            <PageLoader>
            {children}
            </PageLoader>
          </div>
        </DocsLayout>
      </OpenCodeContextfunc>
    </PrevNext>
  );
}
