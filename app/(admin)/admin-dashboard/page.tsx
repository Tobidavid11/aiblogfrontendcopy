"use client";

import { useState } from "react";
import { PostDetails } from "@/components/admin/post-detail";
import { JobDetails } from "@/components/admin/job-detail";
import UserProfile from "@/components/admin/user-updatetwo";


export default function PageComponent() {
  const [activeView] = useState<"posts" | "jobs" | "wallet">("posts");

  return (
    <div className="min-h-screen bg-background">
      <div className="container p-0">
        <div className="space-y-6"> 
          <UserProfile />
          
          {activeView === "posts" && <PostDetails />}
          {activeView === "jobs" && <JobDetails />}
          {/* {activeView === "wallet" && <WalletDetails />} */}
        </div>   
      </div>
    </div>
  );
}
