"use client"

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProfileJobs from './jobs';
import Posts from './posts';
import SavedPosts from './saved-posts';
import { BlogPost } from '@/types/blog';
import { UserProps } from '@/types/user';
import { APIJobType } from '@/types/job';


function ContentTab({
  blogs,
  user,
  job
}:{
  blogs:BlogPost[]
  user:UserProps
  job:APIJobType[]
}) {
  console.log("rrrr" , user)     
    const [activeTab, setActiveTab] = useState('posts')
    const tabs = [
      { id: 'posts', label: 'Posts', component: <Posts blogs={blogs} user={user}/> },
      { id: 'jobs', label: 'Jobs', component: <ProfileJobs job={job} /> },
      { id: 'saved', label: 'Saved Posts', component: <SavedPosts /> },
    ];
  return (
    <div className="w-full">
    <div className="flex gap-4 border-b border-gray-200">
      {tabs.map(tab => (
        <Button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-4 py-2 -mb-px",
            activeTab === tab.id
              ? "text-black border-b-2 border-cta-primary-normal bg-transparent"
              : "text-gray-500 bg-transparent hover:text-black"
          )}
          variant="ghost"
        >
          {tab.label}
        </Button>
      ))}
    </div>

    <div className="mt-4">
      {tabs.find(tab => tab.id === activeTab)?.component}
    </div>
  </div>
  )
}

export default ContentTab
