"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Home, Briefcase, User } from "lucide-react";
import { BlogCard } from "@/components/blog";
import { BlogDummyData } from "@/data/mock/blog";
import { SearchInput } from "@/components/shared";
import { CategoryItem } from "@/components/shared/category";

export default function BlogPlatformLayout() {
  return (
    <div className="min-h-screen bg-gray-50 w-full relative ">
      <div className="md:hidden mb-4">
        <SearchInput
          placeholder="Find blogs..."
          onSearch={() => console.log("searching blogs...")}
        />
      </div>

      <div className="md:hidden mb-6">
        <h2 className="text-lg font-semibold mb-2">CATEGORY</h2>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {["All", "Technology", "Politics", "Flutter"].map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

      </div>
      
        <CategoryItem />

      <div className="flex flex-wrap -mx-4">
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-6">
            {BlogDummyData.map((item, index) => (
              <BlogCard key={index} blog={item} hasBackground />
            ))}
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
        <div className="flex justify-around py-2">
          <Button variant="ghost" size="icon">
            <Home className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Briefcase className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
