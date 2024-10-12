// // Define the article interface
// interface Article {
//     id: number;
//     author: string;
//     authorImage: string;
//     title: string;
//     description: string;
//     imageUrl: string;
//     likes: number;
//     comments: number;
//     shares: number;
//     tags: string[];
//     timePosted: string;
//     isFollowing: boolean;
//     location: string;
//   }
  
//   // Mock data for articles
//   const articles: Article[] = [
//     {
//       id: 1,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg", // Author image URL
//       title: "Tesla's AI-Powered Transformation in Electric Vehicles",
//       description: "Explore Tesla's journey from its inception to the groundbreaking advancements in autonomous driving technology and AI integration.",
//       imageUrl: "/images/car.png", // Article image URL
//       likes: 15000,
//       comments: 3500,
//       shares: 5000,
//       tags: ["Web3", "Nigeria"],
//       timePosted: "3 hrs ago",
//       isFollowing: true,
//       location: "Nigeria",
//     },
//     {
//       id: 2,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg",
//       title: "The Digital Detox: Why Unplugging is Essential",
//       description: "Discover the importance of unplugging for mental health and how digital detox can lead to a more fulfilling lifestyle.",
//       imageUrl: "/images/car.png",
//       likes: 1200,
//       comments: 2900,
//       shares: 4300,
//       tags: ["Health", "Lifestyle"],
//       timePosted: "3 hrs ago",
//       isFollowing: true,
//       location: "Nigeria",
//     },
//     {
//       id: 3,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg",
//       title: "Exploring AI in Healthcare: The Future of Medicine",
//       description: "An in-depth look at how AI is revolutionizing healthcare, from predictive diagnosis to personalized treatment.",
//       imageUrl: "/images/car.png",
//       likes: 1600,
//       comments: 3300,
//       shares: 4800,
//       tags: ["AI", "Healthcare"],
//       timePosted: "4 hrs ago",
//       isFollowing: false,
//       location: "Global",
//     },
//     {
//       id: 4,
//       author: "Miracle Davison",
//       authorImage: "https://example.com/author1.jpg",
//       title: "Sustainable Energy Solutions: AI's Role in Green Tech",
//       description: "How artificial intelligence is driving innovation in green technology and contributing to sustainable energy solutions.",
//       imageUrl: "/images/car.png",
//       likes: 1400,
//       comments: 3100,
//       shares: 4500,
//       tags: ["AI", "GreenTech"],
//       timePosted: "5 hrs ago",
//       isFollowing: false,
//       location: "Nigeria",
//     }
//   ];
  
//   export default articles;
import { BlogType } from "@/types/blog";
import { UserData } from "./user";
import { dummyMetrics } from "./top-writers";

const BlogData: BlogType = {
  user: UserData,
  title: "Tesla's AI-Powered Transformation in Electric Vehicles",
  image: "/blog_image.png",
  description:
    "Explore Tesla's journey from its inception to the groundbreaking advancements in autonomous driving technology and AI integration.",
  metrics: dummyMetrics[0],
};

export const BlogDummyData = [BlogData, BlogData, BlogData, BlogData, BlogData];