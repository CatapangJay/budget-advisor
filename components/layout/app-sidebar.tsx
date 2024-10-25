"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  ChartPie,
  Coins,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
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
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "dashboard",
      icon: ChartPie,
      isActive: true,
    },
    {
      title: "Transactions",
      url: "transactions",
      icon: Coins,
    },
    {
      title: "Budgets",
      url: "#",
      icon: BookOpen,
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ children, ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Budgets
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
// navMain: [
//   {
//     title: "Playground",
//     url: "#",
//     icon: SquareTerminal,
//     isActive: true,
//     items: [
//       {
//         title: "History",
//         url: "#",
//       },
//       {
//         title: "Starred",
//         url: "#",
//       },
//       {
//         title: "Settings",
//         url: "#",
//       },
//     ],
//   },
//   {
//     title: "Models",
//     url: "#",
//     icon: Bot,
//     items: [
//       {
//         title: "Genesis",
//         url: "#",
//       },
//       {
//         title: "Explorer",
//         url: "#",
//       },
//       {
//         title: "Quantum",
//         url: "#",
//       },
//     ],
//   },
//   {
//     title: "Documentation",
//     url: "#",
//     icon: BookOpen,
//     items: [
//       {
//         title: "Introduction",
//         url: "#",
//       },
//       {
//         title: "Get Started",
//         url: "#",
//       },
//       {
//         title: "Tutorials",
//         url: "#",
//       },
//       {
//         title: "Changelog",
//         url: "#",
//       },
//     ],
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings2,
//     items: [
//       {
//         title: "General",
//         url: "#",
//       },
//       {
//         title: "Team",
//         url: "#",
//       },
//       {
//         title: "Billing",
//         url: "#",
//       },
//       {
//         title: "Limits",
//         url: "#",
//       },
//     ],
//   },
// ],