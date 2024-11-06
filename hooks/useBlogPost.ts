import { getBlogPost } from "@/actions/getBlogs";
import { generateSlug } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

export async function fetchBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    let postId: string | null = null;
    const normalizedSearchSlug = generateSlug(slug);

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key?.startsWith("blog-")) {
        const storedSlug = key.replace("blog-", "");
        if (generateSlug(storedSlug) === normalizedSearchSlug) {
          postId = sessionStorage.getItem(key);
          break;
        }
      }
    }

    if (!postId) {
      return null;
    }
    const response = await getBlogPost(postId);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
