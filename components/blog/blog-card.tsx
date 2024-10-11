/* eslint-disable react/display-name */
import { memo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PostMetrics, UserProfile } from "../shared";
import { BlogType } from "@/types/blog";
import Image from "next/image";

const BlogCard = memo<{ blog: BlogType }>(({ blog }) => {
  return (
    <Card className="w-full flex flex-col gap-y-3 mb-6 border-none bg-transparent rounded-xl shadow-none">
      <CardHeader className="p-0">
        <UserProfile user={blog.user} />
      </CardHeader>

      <CardContent className="flex flex-col p-0 gap-y-3">
        <CardDescription className="flex flex-col p-0 gap-y-3">
          {/* Title */}
          <CardTitle className="text-xl font-semibold capitalize leading-7 text-[#262626] ">
            {blog.title}
          </CardTitle>

          {/* Description */}
          <p className="text-base font-normal leading-6 text-[#737373]">
            {blog.description}
          </p>
        </CardDescription>

        <div className="relative block rounded-tl-xl rounded-tr-xl w-full h-[230px] my-4 overflow-hidden">
          <Image
            src={blog.image}
            alt={`${blog.title} blog image`}
            width={1000}
            height={1000}
            objectFit="cover"
          />
        </div>
      </CardContent>

      <CardFooter className="p-0">
        <PostMetrics
          item={blog.metrics}
          key={blog.user?.username + blog.title}
        />
      </CardFooter>
    </Card>
  );
});

export default BlogCard;
