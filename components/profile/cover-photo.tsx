"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { UserProps } from "@/types/user";
import { CoverImage } from "./cover-image";
import { PencilLine, MoveLeft, ZoomIn, ZoomOut } from "lucide-react";
import ProfilePic from "./user-profile-pic";
import { UserData } from "@/data/mock/user";
import { toast } from "sonner"; 
import { Toaster } from "sonner";

interface CoverPhotoProps {
  user: UserProps;
  className?: string;
}

const CoverPhoto: React.FC<CoverPhotoProps> = ({ user, className }) => {
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedCoverImage, setSelectedCoverImage] = useState<string | null>(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPosition({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const dragImage = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  };

  const stopDragging = () => {
    setDragging(false);
  };

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setZoomLevel(Number(e.target.value));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedCoverImage(imageUrl);
      setIsEditingCover(true);
    }
  };

  const closeCoverOverlay = () => {
    setIsEditingCover(false);
    setSelectedCoverImage(null);
    setZoomLevel(50);
    setPosition({ x: 0, y: 0 });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedProfileImage(imageUrl);
      setIsEditingProfile(true);
    }
  };

  const closeProfileOverlay = () => {
    setIsEditingProfile(false);
    setSelectedProfileImage(null);
    setZoomLevel(50);
    setPosition({ x: 0, y: 0 });
  };

  const handleCoverApply = () => {
    if (selectedCoverImage) {
      UserData.coverPhoto = selectedCoverImage;
      toast.success("Cover Photo Updated Successfully!");
      closeCoverOverlay();
    } else {
      toast.error("Failed to update Cover Photo!"); 
    }
  };

  const handleProfileApply = () => {
    if (selectedProfileImage) {
      UserData.profilePic = selectedProfileImage;
      toast.success("Profile Picture Updated Successfully!");
      closeProfileOverlay();
    } else {
      toast.error("Failed to update Profile Picture!"); 
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="w-full h-40 md:h-56 bg-cover bg-center rounded-2xl overflow-hidden">
        <CoverImage src={user.coverPhoto} alt={`${user.username} cover pic`} />
      </div>

      <div className="absolute mb-4 top-4 right-4 flex gap-2 group">
        <Button
          onClick={() => document.getElementById("cover-photo-upload")?.click()}
          className="bg-[#171717] hover:bg-[#404040] text-[#FAFAFA] font-medium rounded-full transition duration-300 ease-in-out"
        >
          <PencilLine />
        </Button>
        <span className="opacity-0 group-hover:opacity-100 bg-black text-white text-xs rounded py-1 px-2 absolute -top-8 right-0 transition-opacity">
          Edit Media
        </span>
        <input
          type="file"
          id="cover-photo-upload"
          className="hidden"
          accept="image/*"
          onChange={handleCoverImageChange}
        />
      </div>

      {isEditingCover && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] h-[400px] flex flex-col items-center justify-center relative">
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MoveLeft className="cursor-pointer" onClick={closeCoverOverlay} />
                Edit Media
              </h2>
              <Button onClick={handleCoverApply}>Apply</Button>
            </div>
            <div
              className="relative w-full h-48 overflow-hidden bg-gray-200 flex items-center justify-center"
              onMouseDown={startDragging}
              onMouseMove={dragImage}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
            >
              <img
                src={selectedCoverImage || user.coverPhoto}
                alt="Selected Cover"
                style={{
                  transform: `scale(${1 + zoomLevel / 100}) translate(${position.x}px, ${position.y}px)`,
                }}
                className="cursor-move w-full"
              />
            </div>
            <div className="flex items-center gap-4 mt-4 w-full">
              <ZoomOut />
              <input
                type="range"
                min="1"
                max="100"
                value={zoomLevel}
                onChange={handleZoomChange}
                className="flex-1"
              />
              <ZoomIn />
            </div>
            <div className="text-sm mt-2 text-center">Zoom Level: {zoomLevel}%</div>
          </div>
        </div>
      )}

      <div className="bottom-12 left-8 flex gap-2 relative">
        <div className="relative">
          <ProfilePic user={UserData} />
          <div
            onClick={() => document.getElementById("profile-photo-upload")?.click()}
            className="absolute bottom-2 left-15 p-2 bg-[#171717] hover:bg-[#404040] rounded-full cursor-pointer transition-colors duration-300"
          >
            <PencilLine className="w-4 h-4 text-white" />
          </div>
          <input
            type="file"
            id="profile-photo-upload"
            className="hidden"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </div>
      </div>

      {isEditingProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[400px] h-[400px] flex flex-col items-center justify-center relative">
            <div className="flex justify-between items-center mb-4 w-full">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <MoveLeft className="cursor-pointer" onClick={closeProfileOverlay} />
                Edit Profile Picture
              </h2>
              <Button onClick={handleProfileApply}>Apply</Button>
            </div>
            <div
              className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
              onMouseDown={startDragging}
              onMouseMove={dragImage}
              onMouseUp={stopDragging}
              onMouseLeave={stopDragging}
            >
              <img
                src={selectedProfileImage || user.profilePic}
                alt="Selected Profile"
                style={{
                  transform: `scale(${1 + zoomLevel / 100}) translate(${position.x}px, ${position.y}px)`,
                }}
                className="w-full h-full"
              />
            </div>
            <div className="flex items-center gap-4 mt-4 w-full">
              <ZoomOut />
              <input
                type="range"
                min="1"
                max="100"
                value={zoomLevel}
                onChange={handleZoomChange}
                className="flex-1"
              />
              <ZoomIn />
            </div>
            <div className="text-sm mt-2 text-center">Zoom Level: {zoomLevel}%</div>
          </div>
        </div>
      )}

      <Toaster /> {/* Render the toaster for notifications */}
    </div>
  );
};

export default CoverPhoto;
