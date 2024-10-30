"use client"

import { useState } from "react"
import { Navbar } from "@/components/admin/admin-nav-bar"

import { PostDetails } from "@/components/admin/post-detail"
import { WalletDetails } from "@/components/admin/admin-wallet"
import { JobDetails } from "@/components/admin/job-detail"
import { UserProfile } from "@/components/admin/user-profile"


export default function PageComponent() {
  const [activeView] = useState<"posts" | "jobs" | "wallet">("posts")

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container py-6">
        <div className="space-y-6">
          <UserProfile />
          {activeView === "posts" && <PostDetails />}
          {activeView === "jobs" && <JobDetails />}
          {activeView === "wallet" && <WalletDetails />}
        </div>
      </div>
    </div>
  )
}