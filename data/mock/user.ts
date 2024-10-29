import type { UserProps } from "@/types/user";

export const UserData: UserProps = {
  username: "@mira",
  profile_pic: "/profile.png",
  name: "Miracle Davison",
  timestamp: Date.now() - 1000 * 60 * 5,
  cover_photo: "/cover.jpg",
  isVerified: true,
  user_bio: "Miracle is a business owner specializing in digital solutions tailored to the tech industry.",
  external_link: "https://www.linkedin.com/", 
  user_join_date: "December, 2006",
  user_followers: 118,
  user_following: 335,
  userId: "",
  country: "", 
  state: "", 
  phoneNumber: "", 
};

export const setUserData = (data: Partial<UserProps>) => {
  Object.assign(UserData, data);
};
