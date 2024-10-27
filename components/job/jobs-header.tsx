"use client";

import JobCta from "@/app/components/JobCta";
import TopicCTA from "@/components/trends/topic-cta";
import { TopicsData } from "@/data/mock/topics";
import { slugify } from "@/lib/utils";
import { SearchInput } from "../shared";

export const JobsHeader = () => (
  <>
    <div className="hidden md:block">
      <JobCta />
      <div className="flex gap-2 overflow-x-auto custom-scroll my-6">
        {TopicsData.map((topic, index) => (
          <TopicCTA topic={topic} slug={slugify(topic)} key={index} />
        ))}
      </div>
    </div>

    {/* Mobile jobs header */}
    <div className="flex flex-col gap-3 mb-6 md:hidden">
      <div className="gap-1">
        <h2 className="text-2xl text-[#171717] font-semibold">Jobs</h2>
        <p className="text-sm text-[#737373] font-normal">
          Find task, complete actions, and earn rewards
        </p>
      </div>

      {/* Search */}
      <div>
        <SearchInput onSearch={handleSearch} placeholder="Find jobs..." />
      </div>
    </div>
  </>
);

const handleSearch = (searchTerm: string) => {
  console.log({ searchTerm });
};
