import { Button } from "@/components/ui/button";
import { RoundedImage } from "./rounded-image";

const FollowCard = ({
  user,
}: {
  user: { name: string; profile_pic: string; username: string };
}) => {
  const followAction = async () => {
    "use server";
  };
  console.log(user);

  return (
    <div className="flex justify-between">
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
          <p className="font-medium text-xs">{user.username}</p>
        </div>
      </div>
      <form action={followAction}>
        <Button className="bg-[#E5E5E5] rounded-full" variant={"secondary"}>
          Follow
        </Button>
      </form>
    </div>
  );
};
export default FollowCard;
