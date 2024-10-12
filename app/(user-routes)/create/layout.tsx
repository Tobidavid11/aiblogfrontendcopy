import { NavBar } from "@/app/(user)/sections";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function CreatePostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <NavBar /> */}
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
}
