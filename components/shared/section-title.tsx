/* eslint-disable react/display-name */
import { memo } from "react";

export const SectionTitle = memo(({ title }: { title: string }) => {
  return (
    <h3 className="font-medium text-base sm:text-lg capitalize border-b border-[#E5E5E5] pb-2 text-[#171717]">
      {title}
    </h3>
  );
});
