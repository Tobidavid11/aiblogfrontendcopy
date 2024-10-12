import JobCta from "@/app/components/JobCta";
import TopicCTA from "@/components/trends/topic-cta";
import { TopicsData } from "@/data/mock/topics";
import { slugify } from "@/lib/utils";

export const JobsHeader = () => (
  <div className="space-y-6">
    <JobCta />
    <div className="flex gap-2 overflow-x-auto custom-scroll">
      {TopicsData.map((topic, index) => (
        <TopicCTA topic={topic} slug={slugify(topic)} key={index} />
      ))}
    </div>
  </div>
);
