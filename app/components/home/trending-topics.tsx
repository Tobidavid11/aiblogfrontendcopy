import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import Link from "next/link";
import FollowCard from "../follow-card";
import { topics } from "@/data/mock/topics";
import { user } from "@/data/mock/user";

export default function TrendingTopics() {
  const emptyArray = Array(9).fill(undefined);

  return (
    <aside className="flex flex-col gap-7 px-6 py-7 top-[100px] sticky bg-white max-w-[450px] h-dvh">
      <div>
        <h3 className="font-dm-sans font-medium text-2xl">Trending Topics</h3>
      </div>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic, index) => (
          <Topic name={topic} slug={slugify(topic)} key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-3">
        {emptyArray.map((_, index) => (
          <FollowCard key={index} user={user} />
        ))}
      </div>
    </aside>
  );
}

const Topic = ({ name, slug }: { name: string; slug: string }) => {
  return (
    <Button
      asChild
      variant={"secondary"}
      className="rounded-full text-[#171717] bg-[#E8E8E8] font-dm-sans text-[12px]"
    >
      <Link href={`/${slug}`}>{name}</Link>
    </Button>
  );
};
