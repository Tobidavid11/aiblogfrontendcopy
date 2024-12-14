"use client";
import { useState, useEffect, useMemo } from "react";
import TrendingTopicCard from "@/components/trends/trending-topic-card";

const fetchTrendingTopics = async () => {
  const url = "https://gateway.drello.xyz/api/v1/blog/trending-topics";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const trending = await response.json();
    return trending.data;
  } catch (error) {
    console.error("Failed to fetch top topics:", error);
    return [];
  }
};

const TrendingTopics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrendingTopics();
      setTopics(data);
    };

    fetchData();
  }, []); // Runs once on component mount.

  const parsedTopics = useMemo(() => {
    return topics.map((datum) => ({
      topic: datum?.category,
      sub_topic: "",
      related_topics: datum?.topics.map((topic) => ({
        topic: topic.title,
        num_posts: topic.totalPosts,
      })),
    }));
  }, [topics]); // Recomputes only when `topics` changes.

  return (
    <div className="h-full overflow-scroll custom-scroll pr-2 pt-2">
      <TrendingTopicCard trendingTopics={parsedTopics} />
    </div>
  );
};

export default TrendingTopics;
