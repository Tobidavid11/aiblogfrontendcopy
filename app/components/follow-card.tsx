import { Button } from "@/components/ui/button";
import { RoundedImage } from "./rounded-image";
import { cn } from "@/lib/utils";
import { followAction } from "@/actions/follow";
import { article } from "@/data/mock/articles";

const FollowCard = ({
  user,
  className,
}: {
  user: { name: string; profile_pic: string; username: string };
  className?: string;
}) => {
  

  return (
    <div className={cn("flex justify-between", className)}>
      <div className="gap-3 flex items-center">
        <div>
          <RoundedImage
            size={50}
            src={user.profile_pic}
            alt={`${user.username} Profile Pic`}
          />
        </div>
        <div className="font-dm-sans">
          <h4 className="text-sm font-bold">{user.name}</h4>
          <p className="font-medium text-xs">{user.username} . <span>{article.date}</span></p>
          
        </div>
        
      </div>
      <form action={followAction}>
        <Button className="bg-black rounded-full text-white hover:text-black" variant={"secondary"}>
          Follow
        </Button>
      </form>
    </div>
  );
};
export default FollowCard;
