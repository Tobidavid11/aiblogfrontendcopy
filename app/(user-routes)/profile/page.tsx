"use client"
import React, { useState } from "react";
import { MoveLeft } from "lucide-react";
import CoverPhoto from "@/components/profile/cover-photo";
import { UserData as initialUserData } from "@/data/mock/user";
import ViewWallet from "@/components/profile/view-wallet";
import EditProfile from "@/components/profile/edit-profile";
import UserInfo from "@/components/profile/user-info";
import ContentTab from "@/components/profile/content-tab";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwNDY3N2Y5YS0xY2ZjLTRhYzgtOTgwZi05MWRhNGRlOTYzZmYiLCJlbWFpbCI6ImRyZWxsbzM2MEBnbWFpbC5jb20iLCJpYXQiOjE3MzAxMTUyOTJ9.w57FSl2S17Yv3XPentdt-2zkz2s3IsIKJXX6ruWFtVY";
const profileId = "c90363c0-7717-476e-932d-65654832c891";

const Profile = () => {
  const [userData, setUserData] = useState(initialUserData);

  return (
    <div className="flex flex-col gap-2 maxHeight overflow-hidden">
      <div className="bg-white">
        <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          <span>
            <MoveLeft />
          </span>
          Profile
        </div>

        <div className="p-4">
          <CoverPhoto user={userData} />
        </div>

        <div className="flex justify-end gap-2 items-center px-4">
          <EditProfile userData={userData} setUserData={setUserData} token={token} profileId={profileId} />
          <ViewWallet />
        </div>

        <div className="rounded-b-lg pb-5">
          <UserInfo user={userData} />
        </div>
      </div>

      <div className="bg-white rounded-lg">
        <div className="text-2xl font-bold mb-4 flex gap-2 items-center p-5 border-b-2">
          <ContentTab />
        </div>
      </div>
    </div>
  );
};

export default Profile;
