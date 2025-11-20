"use client"

import { SideNavigation, SideNavigationItem } from "@/components/side-navigation";


export function SideNavigationDemo(){
  return (
      <SideNavigation>
        <SideNavigationItem href="/" title="Home"/>
        <SideNavigationItem href="/" title="Projects"/>
        <SideNavigationItem href="/" title="Experience"/>
        <SideNavigationItem href="/" title="Contact"/>
        <SideNavigationItem href="/" title="Github"/>
      </SideNavigation>
  )
}