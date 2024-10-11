import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Function to format likes, comments, views
export function formatViews(views: number): string {
  if (views < 1_000) return views.toString();
  if (views < 1_000_000) return (views / 1_000).toFixed(0) + "K";
  return (views / 1_000_000).toFixed(0) + "M";
}
