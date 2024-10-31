"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Pencil, XIcon } from "lucide-react";
import { toast, Toaster } from "sonner";
import type { UserProps } from "@/types/user";

const API_BASE_URL = "https://drellouserauth.onrender.com/api/v1/"; //Base URL 

interface EditProfileProps {
  userData?: UserProps;
  setUserData: (data: UserProps) => void;
  token: string;
  profileId: string;
}

function EditProfile({ userData = {} as UserProps, setUserData, token, profileId }: EditProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: userData?.name?.split(" ")[0] || "",
    lastName: userData?.name?.split(" ")[1] || "",
    bio: userData?.bio || "",
    country: userData?.country || "",
    state: userData?.state || "",
    phoneNumber: userData?.phoneNumber || "",
    username: userData?.username || "",
    externalLink: userData?.externalLink || "",
    profilePic: "",
    coverPhoto: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userData) {
      setFormData({
        firstName: userData.name?.split(" ")[0] || "",
        lastName: userData.name?.split(" ")[1] || "",
        bio: userData.bio || "",
        country: userData.country || "",
        state: userData.state || "",
        phoneNumber: userData.phoneNumber || "",
        username: userData.username || "",
        externalLink: userData.externalLink || "",
        profilePic: "",
        coverPhoto: "",
      });
    }
  }, [userData]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(
        `${API_BASE_URL}auth/profile/${profileId}`,
        {
          username: formData.username,
          profilePic: formData.profilePic,
          coverPic: formData.coverPhoto,
          firstName: formData.firstName,
          lastName: formData.lastName,
          bio: formData.bio,
          external_link: formData.externalLink, 
          country: formData.country,
          state: formData.state, 
          phoneNumber: formData.phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setUserData({
          ...userData,
          name: `${formData.firstName} ${formData.lastName}`,
          bio: formData.bio,
          country: formData.country,
          state: formData.state,
          phoneNumber: formData.phoneNumber,
          username: formData.username,
          profilePic: formData.profilePic,
          coverPhoto: formData.coverPhoto,
        });
        toggleModal();
        toast.success("Profile updated successfully!");
      } else {
        setError("Failed to update profile.");
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      setError("An error occurred while updating the profile.");
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={toggleModal}
        className="bg-[#FAFAFA] hover:bg-white hover:border-[#171717] text-[#171717] font-medium rounded-full transition duration-300 ease-in-out border"
      >
        <Pencil className="pr-2" /> Edit Profile
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg z-10 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="max-h-96 overflow-y-auto custom-scroll">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input 
                    type="text" 
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea 
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">External Link</label>
                  <input 
                    type="text" 
                    name="externalLink"
                    value={formData.externalLink}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <div className="flex space-x-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">Country</label>
                      <input 
                        type="text" 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-medium text-gray-700">State</label>
                      <input 
                        type="text" 
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="text" 
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={loading}>
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Toaster />
    </>
  );
}

export default EditProfile;
