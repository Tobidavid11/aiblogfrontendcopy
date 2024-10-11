export interface UserProps {
  name: string;
  profile_pic: string;
  username: string;
  onFollow?: () => void; // Optional callback for follow action
}
