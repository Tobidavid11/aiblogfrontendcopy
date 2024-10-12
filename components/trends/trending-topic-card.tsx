import TopicCTA from "./topic-cta";
import AuthTopicCard from "./auth-topic-card";
import dummyAuthTopics from "@/data/mock/auth-topic-card";
import { slugify } from "@/lib/utils";
import { TopicsData } from "@/data/mock/topics";

// For the layout, to check if the user is
// authenticated and change the layout accordingly
const user = "authenticated";

const TrendingTopicCard = () => {
  return (
    <div className="">
      {user === "authenticated" ? (
        // Authenticated user topic card
        <div className="flex flex-col space-y-6 pb-12">
          {dummyAuthTopics.map((topics, index) => (
            <AuthTopicCard key={index} item={topics} />
          ))}
        </div>
      ) : (
        // Unauthenticated user topic card
        <div className="flex flex-wrap gap-2">
          {TopicsData.map((topic, index) => (
            <TopicCTA topic={topic} slug={slugify(topic)} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};
export default TrendingTopicCard;
