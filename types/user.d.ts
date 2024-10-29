export interface UserProps {
  name: string;
  profile_pic: string;
  username: string;
  timestamp: number;
  cover_photo: string;
  userId: string;
  isVerified: boolean;
  user_bio: string;
  external_link: string; 
  user_join_date: string;
  user_followers: number;
  user_following: number;
  country: string;     
  state: string;       
  phoneNumber: string; 
  onFollow?: () => void;
}
