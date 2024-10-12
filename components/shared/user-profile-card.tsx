"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RoundedImage } from "./rounded-image";

const ProfileCard = ({
  user,
  isJobProfile,
  className,
}: {
  user: { name: string; profile_pic: string; username: string };
  isJobProfile?: boolean;
  className?: string;
}) => {
  const followAction = async () => {
    console.log("followed user!");
  };

  const applyAction = async () => {
    console.log("Apllication for job successful!");
  };

  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div className="w-full flex gap-2 items-center">
        <RoundedImage
          size={40}
          src={user.profile_pic}
          alt={`${user.username} profile pic`}
        />
        <div className="flex-1 gap-y-1">
          <h4 className="text-sm font-medium text-[#404040] capitalize line-clamp-1">
            {user.name}
          </h4>
          <p className="text-xs font-normal text-[#A3A3A3]">{user.username}</p>
        </div>
      </div>

      {/* Button (Job or Blog) */}
      {isJobProfile ? (
        <Button
          onClick={applyAction}
          className="bg-[#fdc316] hover:bg-[hsl(45,98%,49%)] text-[#262626] font-medium capitalize rounded-full transition duration-300 ease-in-out"
        >
          Apply
        </Button>
      ) : (
        <Button
          onClick={followAction}
          className="bg-[#171717] hover:bg-[#525252] text-[#FAFAFA] font-medium capitalize rounded-full transition duration-300 ease-in-out"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default ProfileCard;
