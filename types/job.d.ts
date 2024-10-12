import { PostMetrics } from "./post-metrics";
import { UserProps } from "./user";

export interface JobType {
  user: UserProps;
  title: string;
  description: string;
  content: string;
  date: string; // ISO Date 
  metrics: PostMetrics;
}
