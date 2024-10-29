export interface UserProps {
	id: string;
	username: string;
	name: string;
	profilePic: string;
	firstName: string | null;
	lastName: string;
	bio: string;
	externalLink: null;
	country: string;
	state: string;
	phoneNumber: string;
	followersCount: number;
	followingCount: number;
	createdAt: string;
	// timestamp: number;
	// cover_photo: string;
	// userId: string,
	// isVerified: boolean;
	// user_website: string;
	// user_join_date: string;
	// user_followers: number;
	// user_following: number;
	// onFollow?: () => void; // Optional callback for follow action
}
