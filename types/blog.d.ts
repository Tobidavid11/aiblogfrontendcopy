import { PostMetrics } from "./post-metrics";
import { UserProps } from "./user";

export interface BlogType {
  user: UserProps;
  title: string;
  description: string;
  image: string;
  metrics: PostMetrics;
  extra_info: string[];
}
