import { NavBar } from "@/app/(user)/sections";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>  <NavBar />
            <main className="relative overflow-hidden h-screen mt-10  sm:px-6 lg:px-8">
              {children}
            </main>
    </>
  );
}
