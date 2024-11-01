import { NavBar } from "@/app/(user)/sections";
import "../../globals.css";
import { Toaster } from "@/components/ui/toaster";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="mt-0 bg-white md:bg-[#fafafa]">{children}</main>
      <Toaster />
    </>
  );
}
