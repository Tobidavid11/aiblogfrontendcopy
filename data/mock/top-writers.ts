import { UserProps } from "@/types/user";
import { PostMetrics } from "@/types/post-metrics";
import { TopWriterProps } from "@/components/writers/top-writer-card";

/**
 * Dummy user data.
 */
const dummyUsers: UserProps[] = [
  {
    name: "Alice Johnson",
    profile_pic: "/profile.png",
    username: "alice_json",
  },
  {
    name: "Bob Smith",
    profile_pic: "/profile.png",
    username: "@Bob_Sth",
  },
  {
    name: "Charlie Brown",
    profile_pic: "/profile.png",
    username: "@chaR_brown",
  },
  {
    name: "Diana Prince",
    profile_pic: "/profile.png",
    username: "@diana_princek",
  },
  {
    name: "Ethan Hunt",
    profile_pic: "/profile.png",
    username: "@ethan_hunt",
  },
];

/**
 * Dummy metrics data.
 */
export const dummyMetrics: PostMetrics[] = [
  {
    likesCount: 1500,
    commentsCount: 300,
    sharesCount: 120,
  },
  {
    likesCount: 2500,
    commentsCount: 450,
    sharesCount: 220,
  },
  {
    likesCount: 3500,
    commentsCount: 600,
    sharesCount: 320,
  },
  {
    likesCount: 4500,
    commentsCount: 750,
    sharesCount: 420,
  },
  {
    likesCount: 5500,
    commentsCount: 900,
    sharesCount: 520,
  },
];

/**
 * Array of top writers with complete props.
 */
const topWriters: TopWriterProps[] = [
  {
    user: dummyUsers[0],
    topic: "Tesla's AI-Powered Transformation in Electric Vehicles",
    metrics: dummyMetrics[0],
  },

  {
    user: dummyUsers[1],
    topic: "The Digital Detox, Why Unplugging is Essential for Mental Health",
    metrics: dummyMetrics[1],
  },
  {
    user: dummyUsers[2],
    topic:
      "Finance: Understanding the Basics and Beyond for a Secure Future asdjkfb",
    metrics: dummyMetrics[2],
  },
  {
    user: dummyUsers[3],
    topic:
      "Travel: Exploring the Hidden Gems of the World and Their Unique Cultures",
    metrics: dummyMetrics[3],
  },
  {
    user: dummyUsers[4],
    topic:
      "Lifestyle: Embracing Minimalism and Sustainable Living in Modern Society",
    metrics: dummyMetrics[4],
  },
];

export default topWriters;
