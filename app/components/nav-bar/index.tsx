"use client";

import { Marcellus, Marhey } from "next/font/google";
import iconBell from "@/public/assets/icons/bell.svg";
import iconPencil from "@/public/assets/icons/pencil.svg";
import imgProfile from "@/public/assets/nav-profile.png";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "Jobs", href: "/jobs" },
];

const NavBar = () => {
  const pathname = usePathname();
  return (
    <header className="px-8 py-4 w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map(({ href, name }) => (
            <Link
              href={href}
              key={name}
              data-active={pathname === href}
              className="py-2.5 px-3 text-xl leading-[1.4] data-[active=true]:font-bold data-[active=true]:text-[#FDC316] hover:text-[#FDC316] relative group transition-colors"
            >
              {name}
              <span
                aria-hidden
                className="absolute -bottom-[16px] bg-[#FDC316] h-1.5 w-full rounded-t-[10px] left-0 hidden group-data-[active=true]:block"
              >
                {/* bottom indicator for active link */}
              </span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex gap-5 items-center">
          <label
            className="p-3 rounded-full w-[376px] border-neutral-200 bg-neutral-50 shadow-sm xl:flex gap-2 items-center hidden"
            aria-label="Search"
          >
            <Search className="w-6 h-6 text-[#919BA7] shrink-0" />
            <input
              type="text"
              className="w-full bg-transparent placeholder-gray-500 leading-[1.6] font-medium focus-visible:outline-none"
              placeholder="Find..."
            />
          </label>

          <Link
            href="#"
            className="py-3 px-4 hidden lg:flex items-center gap-2 bg-[#FDC316] hover:bg-[#FDC316]/70 transition-colors rounded-full"
          >
            <Image src={iconPencil} width={18} height={18} alt="" />
            <span className="leading-[1.4]">Write to earn</span>
          </Link>

          <div className="flex gap-4 items-center">
            <button
              className="rounded-full p-2 border hover:bg-neutral-100 transition-colors"
              aria-label="Notifications"
              title="Notifications"
            >
              <Image src={iconBell} width={24} height={24} alt="" />
            </button>

            <Link
              href="#"
              aria-label="Profile"
              className="relative w-10 h-10 group/nav-profile"
              title="Profile"
            >
              <Image src={imgProfile} fill alt="" className="rounded-full" />
              <span
                className="group-hover/nav-profile:opacity-100 opacity-0 bg-black/10 absolute inset-0 rounded-full transition-opacity"
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const marcellusFont = Marcellus({ weight: "400", subsets: ["latin"] });
const marheyFont = Marhey({ weight: "400", subsets: ["latin"] });
const Logo = () => {
  return (
    <p className="text-5xl leading-none">
      <span className={marheyFont.className}>d</span>
      <span className={cn("text-[#FDC316]", marcellusFont.className)}>Rello</span>
    </p>
  );
};
export default NavBar;
