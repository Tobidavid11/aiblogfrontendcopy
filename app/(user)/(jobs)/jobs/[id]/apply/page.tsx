import { fetchJobWithComments } from "@/lib/jobs";
import TaskQuestionsUI from "../_components/job-question";
import { notFound } from "next/navigation";

export default async function Home({ params }: { params: { id: string } }) {
  const { data: job, error, status } = await fetchJobWithComments(params.id);
  if (status === 404) {
    notFound();
  }

  if (error) {
    return <p>{error.message}</p>;
  }
  return <TaskQuestionsUI job={job} />;
}
