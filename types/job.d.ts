import { PostMetrics } from "./post-metrics";
import { UserProps } from "./user";

export interface JobType {
  user: UserProps;
  title: string;
  description: string;
  metrics: PostMetrics;
}
