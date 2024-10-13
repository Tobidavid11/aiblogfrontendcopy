import { NavBar } from "@/app/(user)/sections";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>  <NavBar />
      
      
        {children}
    </>
  );
}
