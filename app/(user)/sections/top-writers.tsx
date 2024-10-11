import { TopWriterCard } from "@/components/writers";
import topWriters from "@/data/mock/top-writers";

const TopWriters = () => {
  return (
    <div className="h-full overflow-scroll custom-scroll pr-2 pt-2">
      <div className="flex flex-col space-y-6 pb-12">
        {topWriters.map((writer, index) => (
          <TopWriterCard key={index} item={writer} />
        ))}
      </div>
    </div>
  );
};

export default TopWriters;
