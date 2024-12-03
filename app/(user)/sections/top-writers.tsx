import { TopWriterCard } from "@/components/writers";
import { TopWriterProps } from "@/components/writers/top-writer-card";
import { Key } from "react";

const TopWriters = async () => {
  const url = "https://gateway.drello.xyz/api/v1/blog/top-writers";

  let topWriter = [];
  try {
    const response = await fetch(url, { next: { tags: ["trending-topic"] } });
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    topWriter = await response.json();

    // Fetch profiles for each writer
    const augmentedWriters = await Promise.all(
      topWriter.data.map(async (writer: TopWriterProps) => {
        try {
          const profileResponse = await fetch(
            `https://gateway.drello.xyz/api/v1/auth/profile/${writer.userId}`
          );
          if (!profileResponse.ok) {
            throw new Error(`Error fetching profile for user ${writer.userId}`);
          }
          const profileData = await profileResponse.json();
          return { ...writer, profile: profileData.data }; // Merge profile data into writer object
        } catch (error) {
          console.error(`Failed to fetch profile for user ${writer.userId}:`, error);
          return writer; // Return the original writer if profile fetch fails
        }
      })
    );

    topWriter.data = augmentedWriters; // Update the array with augmented data
  } catch (error) {
    console.error("Failed to fetch top writers:", error);
  }

  return (
    <div className="h-full overflow-scroll custom-scroll pr-2 pt-2">
      <div className="flex flex-col space-y-6 pb-16">
        {topWriter.data.map((writer: TopWriterProps, index: Key | null | undefined) => (
          <TopWriterCard key={index} item={writer} />
        ))}
      </div>
    </div>
  );
};

export default TopWriters;
