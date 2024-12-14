"use client"
import { useState, useEffect } from "react";
import { TopWriterCard } from "@/components/writers";
import { TopWriterProps } from "@/components/writers/top-writer-card";

const TopWriters = () => {
  const [topWriter, setTopWriter] = useState<TopWriterProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopWriters = async () => {
      const url = "https://gateway.drello.xyz/api/v1/blog/top-writers";
      
      try {
        const response = await fetch(url, { next: { tags: ["trending-topic"] } });
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();

        // Fetch profiles for each writer
        const augmentedWriters = await Promise.all(
          data.data.map(async (writer: TopWriterProps) => {
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

        setTopWriter(augmentedWriters); // Update the state with augmented data
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTopWriters();
  }, []); // Empty dependency array ensures this effect runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="h-full overflow-scroll custom-scroll pr-2 pt-2">
      <div className="flex flex-col space-y-6 pb-16">
        {topWriter.map((writer: TopWriterProps, index: number) => (
          <TopWriterCard key={index} item={writer} />
        ))}
      </div>
    </div>
  );
};

export default TopWriters;
