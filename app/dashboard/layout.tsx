"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Car,
  ChevronDown,
  ClipboardList,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { findUserByEmail, getUsersFromStorage, updateUserInStorage, writeStorage } from "@/lib/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
}

interface UserData {
  email: string
  businessName: string
  isLoggedIn: boolean
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function getAuthUser(users: any, isLoggedIn: boolean) {
    const id = users.findIndex((user: any) => user.isLoggedIn == true)
    return id
  }
  
  useEffect(() => {
    setIsMounted(true)

    // Check if user is logged in
    // const storedUser = localStorage.getItem("fleetUser")
    const storedUsers = getUsersFromStorage("fleetUser")
    const id = getAuthUser(storedUsers, true)
    const user = storedUsers[id]

    if (storedUsers.length > 0 && storedUsers) {
      console.log(storedUsers)
      if (user.isLoggedIn) {
        setUserData(user)
      } else {
        router.push("/login")
      }
    } else {
      router.push("/login")
    }
  }, [router])

  const handleLogout = () => {
    // const USER = localStorage.getItem("fleetUser")
    const users = getUsersFromStorage("fleetUser")
    const auth_user = getAuthUser(users, true)
    users[auth_user].isLoggedIn = false
    writeStorage("fleetUser", users)
   
    router.push("/login")
  }

  // Don't render anything on the server to avoid hydration mismatch
  if (!isMounted) {
    return null
  }

  // If no user data, show loading
  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  const sidebarLinks = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Vehicles", href: "/dashboard/vehicles", icon: Car },
    { name: "Drivers", href: "/dashboard/drivers", icon: Users },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: ClipboardList },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile menu trigger */}
            <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="FleetMaster Logo"
                        width={32}
                        height={32}
                        className="rounded"
                      /> */}
                      <span className="font-bold">FleetMaster</span>
                    </div>
                    {/* <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button> */}
                  </div>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {sidebarLinks.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                          onClick={() => setIsSidebarOpen(false)}
                        >
                          <link.icon className="h-5 w-5" />
                          <span>{link.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/dashboard" className="flex items-center gap-2">
              {/* <Image
                src="/placeholder.svg?height=32&width=32"
                alt="FleetMaster Logo"
                width={32}
                height={32}
                className="rounded"
              /> */}
              <span className="font-bold hidden sm:inline-block">FleetMaster</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {userData.businessName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block">{userData.businessName}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - desktop */}
        <aside className="hidden md:block w-64 bg-white border-r shrink-0">
          <nav className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <ul className="space-y-2">
              {sidebarLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )

//  return (
//     <div className="w-screen min-h-screen bg-gray-50 flex flex-col">
//       {/* Header */}
//       <header className="bg-white border-b sticky top-0 z-30">
//         <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {/* Mobile menu trigger */}
//             <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" className="md:hidden">
//                   <Menu className="h-5 w-5" />
//                   <span className="sr-only">Toggle menu</span>
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="left" className="p-0 w-64">
//                 <div className="p-4 border-b">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-2">
//                       {/* <Image
//                         src="/placeholder.svg?height=32&width=32"
//                         alt="FleetMaster Logo"
//                         width={32}
//                         height={32}
//                         className="rounded"
//                       /> */}
//                       <span className="font-bold">FleetMaster</span>
//                     </div>
//                     {/* <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
//                       <X className="h-5 w-5" />
//                     </Button> */}
//                   </div>
//                 </div>
//                 <nav className="p-4">
//                   <ul className="space-y-2">
//                     {sidebarLinks.map((link) => (
//                       <li key={link.name}>
//                         <Link
//                           href={link.href}
//                           className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
//                           onClick={() => setIsSidebarOpen(false)}
//                         >
//                           <link.icon className="h-5 w-5" />
//                           <span>{link.name}</span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </nav>
//               </SheetContent>
//             </Sheet>

//             <Link href="/dashboard" className="flex items-center gap-2">
//               {/* <Image
//                 src="/placeholder.svg?height=32&width=32"
//                 alt="FleetMaster Logo"
//                 width={32}
//                 height={32}
//                 className="rounded"
//               /> */}
//               <span className="font-bold hidden sm:inline-block">FleetMaster</span>
//             </Link>
//           </div>

//           <div className="flex items-center gap-4">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" className="flex items-center gap-2">
//                   <Avatar className="h-8 w-8">
//                     <AvatarFallback className="bg-primary/10 text-primary">
//                       {userData.businessName.charAt(0)}
//                     </AvatarFallback>
//                   </Avatar>
//                   <span className="hidden sm:inline-block">{userData.businessName}</span>
//                   <ChevronDown className="h-4 w-4 opacity-50" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>
//                   <User className="mr-2 h-4 w-4" />
//                   <span>Profile</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuItem>
//                   <Settings className="mr-2 h-4 w-4" />
//                   <span>Settings</span>
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   <span>Log out</span>
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       </header>

//       <div className="flex flex-1">
//         {/* Sidebar - desktop */}
//         <aside className="hidden md:block w-64 bg-white border-r shrink-0">
//           <nav className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
//             <ul className="space-y-2">
//               {sidebarLinks.map((link) => (
//                 <li key={link.name}>
//                   <Link
//                     href={link.href}
//                     className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
//                   >
//                     <link.icon className="h-5 w-5" />
//                     <span>{link.name}</span>
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </nav>
//         </aside>

//         {/* Main content */}
//         <main className="flex-1 overflow-y-auto">
//           <div className="h-full absolute overflow-y-auto">{children}</div>
//         </main>
//       </div>
//     </div>
//   )

}
