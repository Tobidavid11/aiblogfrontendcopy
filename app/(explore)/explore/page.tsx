import { CheckFollowing } from "@/actions/follow";
import BlogPlatformLayout from "@/app/components/blogPost/blog-platform-layout";
import { assertUserAuthenticated } from "@/lib/auth";

export default async function BlogPage() {
	
  const user = await assertUserAuthenticated();
   const isFollowing = await CheckFollowing( user.accessToken.value as string, user.userId as string);
	return <BlogPlatformLayout isFollowing={isFollowing} />;
}
