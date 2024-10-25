/* eslint-disable react/display-name */
import { cn } from "@/lib/utils";
import { memo } from "react";

export const SectionTitle = memo(
	({ title, className }: { title: string; className?: string }) => {
		return (
			<h3
				className={cn(
					"font-medium text-base sm:text-lg capitalize border-b border-[#E5E5E5] pb-2 text-[#171717]",
					className,
				)}
			>
				{title}
			</h3>
		);
	},
);
