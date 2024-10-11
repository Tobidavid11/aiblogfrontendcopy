import { BlogType } from "@/types/blog";
import { user } from "./user";

export const article: BlogType = {
  user: user,
  title: "The Digital Detox, Why Unplugging is Essential",
  image: "/blog_image.png",
  description:
    "The Digital Detox, Why Unplugging is Essential for Mental Health",
  date: "3hrs ago",
};

export const articles = [article, article, article, article, article, article];
