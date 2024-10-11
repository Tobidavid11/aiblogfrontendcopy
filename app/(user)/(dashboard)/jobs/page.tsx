import { JobCard } from "@/components/job";
import { JobDummyData } from "@/data/mock/job";

const Jobs = () => {
  return (
    <div className="containerHeight overflow-scroll custom-scroll pb-6">
      {JobDummyData.map((item, index) => (
        <JobCard key={index} job={item} />
      ))}
    </div>
  );
};

export default Jobs;
