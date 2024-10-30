"use client"

import Link from "next/link"

import { Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"

export function Navbar() {
  

  const routes = [
    { href: "/overview", label: "Overview" },
    { href: "/user", label: "User", active: true },
    { href: "/content", label: "Content" },
    { href: "/jobs-post", label: "Jobs/Post" },
    { href: "/transactions", label: "Transactions" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">drello</span>
        </Link>
        <nav className="flex items-center space-x-6 ml-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm transition-colors hover:text-primary",
                route.active
                  ? "text-primary border-b-2 border-primary font-medium"
                  : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Find..."
              className="w-[200px] pl-8 md:w-[300px]"
            />
          </div>
          <button className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              3
            </span>
          </button>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg" alt="@user" />
            <AvatarFallback>MD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}