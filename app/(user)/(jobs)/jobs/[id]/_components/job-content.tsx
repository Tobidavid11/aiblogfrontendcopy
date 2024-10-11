import { JobType } from "@/types/job";

interface JobContentProps {
  job: JobType;
}

const JobContent = ({ job }: JobContentProps) => {
  const { title, user, content } = job;
  return (
    <div className="space-y-4 pb-3 border-b border-neutral-200">
      <div className="space-y-4 pb-3 border-dashed-b">
        <h1 className="text-[32px] leading-[1.2] font-bold">{title}</h1>
        <div className="flex text-sm gap-1 leading-[1.36] text-neutral-400 items-center">
          <p>{user.name}</p>
          <span className="bg-neutral-300 w-1.5 h-1.5 rounded-full" />
          <p>4 mins read</p>
        </div>
      </div>

      <p className="text-neutral-600 leading-[1.6]">{content}</p>

      <div className="flex gap-2 items-center flex-wrap">
        <p className="flex items-center font-medium bg-[#FCF4AA] text-black text-sm px-2 py-1 leading-[1.6] rounded-full w-fit">
          <span>Replies</span>
          <span className="ml-1 p-1 leading-none bg-white rounded-full text-neutral-600">1.5k</span>
        </p>

        <div className="text-sm px-2 py-1 font-medium bg-neutral-50 rounded-full">Nigeria</div>

        <div className="text-sm px-2 py-1 font-medium bg-neutral-50 rounded-full flex gap-1 items-center">
          <span className="w-2 h-2 bg-[#0984E3] rounded-full" />
          <span>Custom</span>
        </div>
      </div>
    </div>
  );
};

export default JobContent;
