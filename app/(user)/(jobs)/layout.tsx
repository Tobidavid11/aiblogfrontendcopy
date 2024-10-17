import { NavBar } from "@/app/(user)/sections";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavBar />
      <main className="relative overflow-hidden h-dvh md:h-[calc(100vh_-72px)]">{children}</main>
    </>
  );
}
