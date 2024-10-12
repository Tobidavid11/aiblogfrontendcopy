import { UserProps } from "./user";

export interface ArticleProps {
  user: UserProps;
  title: string;
  description: string;
  image: string;
  date: string;
}
