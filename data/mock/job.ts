import { UserData } from "./user";
import { dummyMetrics } from "./top-writers";
import { JobType } from "@/types/job";

const JobData: JobType = {
  user: UserData,
  title: "Tesla's AI-Powered Transformation in Electric Vehicles",
  description:
    "Explore Tesla's journey from its inception to the groundbreaking advancements in autonomous driving technology and AI integration.",
  metrics: dummyMetrics[2],
};

export const JobDummyData = [
  JobData,
  JobData,
  JobData,
  JobData,
  JobData,
  JobData,
];
