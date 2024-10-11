"use client"
import React,{} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  MoreHorizontal,
  Home,
  Briefcase,
  User,
  Menu,
} from "lucide-react";
import articles from "@/data/mock/blog";
import Blog from "./Blog";
import BlogTags from "./tags";

const availableTags = articles.map((article) => article.tags).flat();

export default function BlogPlatformLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary md:hidden">Explore</h1>
          <div className="hidden md:flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-primary">dRello</h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary font-medium">
                    Explore
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Jobs
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Input
              type="search"
              placeholder="Find..."
              className="w-64 hidden md:block"
            />
            <Button className="hidden md:block">Create Jobs</Button>
            <Avatar className="hidden md:block">
              <AvatarImage src="/placeholder.svg" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header> */}

      <main className="container mx-auto px-4 py-8">
        <div className="md:hidden mb-4">
          <Input type="search" placeholder="Find Blogs..." className="w-full" />
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

        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-3/4 px-4">
          <h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
           <BlogTags tags={availableTags} />
            <div className="grid md:grid-cols-2  gap-6">
              {articles.map((article: any) => (
              
                <Blog key={article.title} {...article} />
               
              ))}
            </div>
          </div>
          {/* <div className="w-full lg:w-1/4 px-4 mt-8 lg:mt-0 hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle>Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    category: "Sports",
                    subcategory: "Football",
                    title: "Premier League",
                    posts: "15k posts",
                  },
                  {
                    category: "Sports",
                    subcategory: "Football",
                    title: "Uefa League",
                    posts: "15k posts",
                  },
                  {
                    category: "Web 3",
                    subcategory: "Trending",
                    title: "Metaverse",
                    posts: "15k posts",
                  },
                  {
                    category: "Technology",
                    subcategory: "Trending",
                    title: "SeiChats",
                    posts: "15k posts",
                  },
                ].map((topic, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {topic.category} • {topic.subcategory}
                      </p>
                      <p className="font-medium">{topic.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {topic.posts}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Featured Writers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage
                          src="/placeholder.svg"
                          alt="Miracle Davison"
                        />
                        <AvatarFallback>MD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Miracle Davison</p>
                        <p className="text-sm text-muted-foreground">
                          Tesla&apos;s AI-Powered Transformation in Electric...
                        </p>
                      </div>
                    </div>
                    <Button variant="secondary" size="sm">
                      Follow
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>*/}
        </div>
      </main>

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
