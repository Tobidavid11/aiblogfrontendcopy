"use client";
import { SectionTitle } from "@/components/shared";
import "../../globals.css";
import {
  FeaturedArticles,
  NavBar,
  TopWriters,
  TrendingTopics,
} from "../sections";
import { Suspense } from "react";

// For the grid, to check if the user is
// authenticated and change the layout accordingly
const user = "authenticated";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Navigation */}

      <NavBar />

      <main className="w-[1200px] mx-auto flex justify-center mt-4 overflow-hidden h-[85vh]">
        <div className="grid grid-cols-4 gap-4">
          {/* Featured article */}

          <section className="hidden relative md:block w-full col-span-1">
            <SectionTitle title="Featured Articless" />
            <FeaturedArticles />
          </section>

          {/* Blog | Jobs */}

          <section className="w-full flex-1 h-full md:col-span-2 md:px-6 md:pt-6  border-[#E5E5E5] dark:border-neutral-800 rounded-tl-xl rounded-tr-xl">
            {children}
          </section>

          {/* Trending topics | Top writers */}

          <section className="hidden md:block col-span-1">
            <div
              className={`h-[88vh] grid ${
                user === "authenticated" ? "grid-rows-2" : "grid-rows-3"
              } gap-y-6 overflow-hidden`}
            >
              <section className="row-span-1 overflow-hidden">
                <SectionTitle title="Trending Topics" />
                <Suspense fallback={<div>loading........</div>}>
                  <TrendingTopics />
                </Suspense>
              </section>

              <section
                className={`${
                  user === "authenticated" ? "row-span-2" : "row-span-1"
                }`}
              >
                <SectionTitle title="Top Writers" />
                <Suspense fallback={<div>loading........</div>}>
                  <TopWriters />
                </Suspense>
              </section>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
