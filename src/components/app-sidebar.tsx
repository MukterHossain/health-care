"use client"

import * as React from "react"
import {
  IconDashboard,
  IconHelp,
  IconInnerShadowTop,
  IconSearch,
  IconSettings,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
// import { UseUser } from "@/Providers/UserProvider"
import Link from "next/link"
// import checkAuthStatus from "@/utility/auth"

// const { user } = await checkAuthStatus();

// const {role} = user || {role: "guest"}

const navMainItems = [
    {
      title: "Dashboard",
      url: "#",
      icon: IconDashboard,
    },
    // {
    //   title: "Lifecycle",
    //   url: "#",
    //   icon: IconListDetails,
    // },
    // {
    //   title: "Analytics",
    //   url: "#",
    //   icon: IconChartBar,
    // },
    // {
    //   title: "Add Doctor",
    //   url: "/dashboard/add-doctor",
    //   icon: IconUsers,
    // },
  ]


  // if(role === 'ADMIN'){
  //   navMainItems.push(
  //     {
  //       title: "Manage Doctors",
  //       url: "/dashboard/admin/manage-doctors",
  //       icon: IconSettings,
  //     },
  //     {
  //       title: "Manage Patients",
  //       url: "/dashboard/admin/manage-patients",
  //       icon: IconUsers,
  //     }
  //   )
  // }
  

const data = {
  // user: {
  //   name: user?.name,
  //   email: user?.email,
  //   avatar: user?.imageUrl,
  // },
  user: {
    name: '',
    email: '',
    avatar: '',
  },
  navMain: navMainItems,
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const {user, setUser} = UseUser()
  // const role = user?.role;
  // if(role === 'ADMIN'){
  //   navMainItems.push(
  //     {
  //       title: "Manage Doctors",
  //       url: "/admin/dashboard/manage-doctors",
  //       icon: IconSettings,
  //     },
  //     {
  //       title: "Manage Patients",
  //       url: "/admin/dashboard/manage-patients",
  //       icon: IconUsers,
  //     }
  //   )
  // }
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} /> */}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
