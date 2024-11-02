import { JobCard } from "@/components/job";
import { JobsHeader } from "@/components/job/jobs-header";
import { fetchJobs } from "@/lib/jobs";

const Jobs = async () => {
  const { data, error } = await fetchJobs();

  if (error) {
    return <p>{error.message}</p>;
  }
  return (
    <div className="h-screen md:containerHeight overflow-scroll custom-scroll pb-32 md:pb-40">
      <JobsHeader />
      <div>
        {data.results.map((item, index) => (
          <JobCard key={index} job={item} />
        ))}
      </div>
    </div>
  );
};
export default Jobs;
