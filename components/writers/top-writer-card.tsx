/* eslint-disable react/display-name */
import { memo } from "react";
import { PostMetrics, UserProfile } from "../shared";
import type { UserProps } from "@/types/user";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import type { PostMetrics as PostMetricsProps } from "@/types/post-metrics";

/**
 * Interface representing the properties of a top writer.
 */
export interface TopWriterProps {
  profile: UserProps;
  userId: string;
  title: string;
  comments_count:number;
  likes_count:number
}

const TopWriterCard = memo<{ item: TopWriterProps }>(({ item }) => {
  const metrics = {
    commentsCount: item.comments_count,
    likesCount: item.likes_count,
    sharesCount:0
  }
  console.log(item ,"itemsss")
  return (
    <Card className="w-full p-3 flex flex-col gap-y-[0.9rem] border rounded-xl bg-transparent shadow-none border-[#E5E5E5] dark:border-neutral-800">
      <CardHeader className="p-0">
        <UserProfile user={item.profile} />
      </CardHeader>

      <CardContent className="p-0">
        <h2 className="text-base dark:text-neutral-200 font-semibold capitalize w-[96%] line-clamp-2">
          {item?.title}
        </h2>
      </CardContent>

      <CardFooter className="p-0">
        <PostMetrics item={metrics} />
      </CardFooter>
    </Card>
  );
});

export default TopWriterCard;
