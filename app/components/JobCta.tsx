import React from "react";
import Image from "next/image"
const Job = () => {
  return (
    <div className="relative w-full h-[181px] bg-[#FCF4AA] flex justify-between items-center rounded-lg overflow-hidden">
      <div className="pl-6 py-8 pr-4 md:pr-0">
        <h1 className="font-sans text-[40px] font-bold leading-[48px] text-[#171717]">
          Jobs
        </h1>
        <p className="font-sans text-lg font-normal leading-[20.8px] text-[#737373] mt-2  ">
          Find tasks, complete actions, and earn rewards
        </p>
      </div>
      <div className="relative h-full ">
       <Image
       src="/images/jobcta.png"
       width={218}
       height={181}
       className="relative min-h-[181px] min-w-[218px] "
       alt="jobcta"/>
      </div>
    </div>
  );
};

export default Job;
