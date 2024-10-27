import { JobCard } from "@/components/job";
import { JobsHeader } from "@/components/job/jobs-header";
import { JobDummyData } from "@/data/mock/job";

const Jobs = () => {
  return (
    <div className="h-screen md:containerHeight overflow-scroll custom-scroll pb-32 md:pb-40">
      <JobsHeader />
      <div>
        {JobDummyData.map((item, index) => (
          <JobCard key={index} job={item} />
        ))}
      </div>
    </div>
  );
};
export default Jobs;
