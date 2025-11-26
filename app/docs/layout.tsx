import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { CustomSidebar } from '@/components/custom-sidebar';
import { CustomNavbar } from '@/components/navbar';
import { DynamicIsland } from '@/components/dynamic-island';
import { OpenCodeContextfunc } from '@/hooks/use-opencode';
import { CodePopup } from '@/components/preview/code-popup';
import { NavigationMenu } from '@/components/navigation-menu';
import { CustomToolbar } from '@/components/custom-toolbar';

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
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
          {children}
        </div>
      </DocsLayout>
    </OpenCodeContextfunc>
  );
}
