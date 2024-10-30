"use client";

import { Card } from "@/components/ui/card";

import Image from "next/image";

const UserProfile = () => {
  return (
    <div>
      <div>
        <Card className="p-0">
          <div className="">
            <div>
              <Image src="/blog_image.png" alt="Profile picture" />
            </div>
            <div>
              <div>
                {/* h4-username */}
                <span>{/* icon */}</span>
              </div>
              {/* <p>username@</p> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;