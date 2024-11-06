export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

export const storeBlogMappings = (blogs: BlogPost[]) => {
  const mappings = blogs.reduce((acc, blog) => {
    const slug = generateSlug(blog.title);
    return { ...acc, [`blog-${slug}`]: blog.id };
  }, {});

  sessionStorage.setItem("blogMappings", JSON.stringify(mappings));
};

export const getBlogIdFromSlug = (slug: string): string | null => {
  try {
    const mappings = JSON.parse(sessionStorage.getItem("blogMappings") || "{}");
    return mappings[`blog-${slug}`] || null;
  } catch (error) {
    console.error("Error retrieving blog mapping:", error);
    return null;
  }
};
