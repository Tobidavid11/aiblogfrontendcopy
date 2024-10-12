import { JobCard } from "@/components/job";
import { JobsHeader } from "@/components/job/jobs-header";
import { JobDummyData } from "@/data/mock/job";

const Jobs = () => {
  return (
    <div className="containerHeight overflow-scroll custom-scroll pb-6 space-y-6">
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
