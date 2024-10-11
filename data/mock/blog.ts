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
