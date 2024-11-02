import { APIJobCommentType, APIJobType } from "@/types/job";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchJobWithComments = async (id: string) => {
  try {
    const [jobRes, commentsRes] = await Promise.all([
      fetch(`${API_URL}jobs/${id}`),
      fetch(`${API_URL}jobs/${id}/comments`),
    ]);

    if (jobRes.status === 404) {
      return { error: { message: "Job not found" }, status: jobRes.status };
    }

    if (!jobRes.ok || (!commentsRes.ok && commentsRes.status !== 404)) {
      // 404 means no comments yet
      return {
        error: {
          message: !jobRes.ok
            ? "An error occured fetching job"
            : "An error occured fetching job comments",
        },
        status: !jobRes.ok ? jobRes.status : commentsRes.status,
      };
    }

    const [{ data: job }, { data: comments }] = (await Promise.all([
      jobRes.json(),
      commentsRes.status === 404 ? { data: [] } : commentsRes.json(),
    ])) as [{ data: APIJobType }, { data: Array<APIJobCommentType> }];

    return { data: { ...job, comments }, status: jobRes.status };
  } catch (e) {
    console.log(e);
    return { error: { message: "An error occured" } };
  }
};

export const fetchJobs = async () => {
  try {
    const res = await fetch(`${API_URL}jobs/`);

    if (!res.ok) {
      return {
        error: {
          message: "An error occured fetching jobs",
        },
        status: res.status,
      };
    }

    const { data } = (await res.json()) as {
      data: {
        results: Array<APIJobType>;
        count: number;
        page: number;
        next: boolean;
        prev: boolean;
      };
    };
    return { data };
  } catch (e) {
    console.log(e);
    return { error: { message: "An error occured" } };
  }
};
