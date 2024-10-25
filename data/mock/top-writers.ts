import type { TopWriterProps } from "@/components/writers/top-writer-card";
import type { PostMetrics } from "@/types/post-metrics";
import type { UserProps } from "@/types/user";

/**
 * Dummy user data.
 */
const dummyUsers: UserProps[] = [
  {
    name: "Alice Johnson",
    profile_pic: "/profile.png",
    username: "alice_json",
    timestamp: Date.now() - 1000 * 60 * 9,
    cover_photo: "/cover.jpg",
    isVerified: true,
    user_bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    user_website: "https://www.linkedin.com/",
    user_join_date: "December, 2006",
    user_followers: 118,
    user_following: 335
  },
  {
    name: "Bob Smith",
    profile_pic: "/profile.png",
    username: "Bob_Sth",
    timestamp: Date.now() - 1000 * 60 * 2,
    cover_photo: "/cover.jpg",
    isVerified: true,
    user_bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    user_website: "https://www.linkedin.com/",
    user_join_date: "December, 2006",
    user_followers: 118,
    user_following: 335
  },
  {
    name: "Charlie Brown",
    profile_pic: "/profile.png",
    username: "CharBrwn",
    timestamp: Date.now() - 1000 * 60 * 10,
    cover_photo: "/cover.jpg",
    isVerified: true,
    user_bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    user_website: "https://www.linkedin.com/",
    user_join_date: "December, 2006",
    user_followers: 118,
    user_following: 335
    
  },
  {
    name: "Diana Prince",
    profile_pic: "/profile.png",
    username: "diana_PR",
    timestamp: Date.now() - 1000 * 60 * 2,
    cover_photo: "/cover.jpg",
    isVerified: true,
    user_bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    user_website: "https://www.linkedin.com/",
    user_join_date: "December, 2006",
    user_followers: 118,
    user_following: 335
  },
  {
    name: "Ethan Hunt",
    profile_pic: "/profile.png",
    username: "ethan_",
    timestamp: Date.now() - 1000 * 60 * 8,
    cover_photo: "/cover.jpg",
    isVerified: true,
    user_bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry. With a focus on innovation, they help businesses enhance their digital ",
    user_website: "https://www.linkedin.com/",
    user_join_date: "December, 2006",
    user_followers: 118,
    user_following: 335
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
