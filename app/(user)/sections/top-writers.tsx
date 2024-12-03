import { TopWriterCard } from "@/components/writers";
import { TopWriterProps } from "@/components/writers/top-writer-card";
import topWriters from "@/data/mock/top-writers";
import { Key } from "react";

const TopWriters = async () => {
  const url = "https://gateway.drello.xyz/api/v1/blog/trending-topics";

  let trendingTopics = [];
  try {
    const response = await fetch(url, { next: { tags: ["trending-topic"] } });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    trendingTopics = await response.json();
    console.log(trendingTopics)
  } catch (error) {
    console.error("Failed to fetch trending topics:", error);
  }

  return (
    <div className="h-full overflow-scroll custom-scroll pr-2 pt-2">
      <div className="flex flex-col space-y-6 pb-16">
        {/* Use trendingTopics or fallback to topWriters */}
        {(trendingTopics.length ? trendingTopics : topWriters).map((writer: TopWriterProps, index: Key | null | undefined) => (
          <TopWriterCard key={index} item={writer} />
        ))}
      </div>
    </div>
  );
};

export default TopWriters;
