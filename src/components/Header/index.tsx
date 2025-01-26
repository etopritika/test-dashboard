"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import UserInfo from "./User-Info";
import { ChartNoAxesCombined, Menu } from "lucide-react";
import Link from "next/link";
import Sidebar from "./Sidebar";

export default function Header() {
  const pathname = usePathname();
  const shouldHideHeader = pathname === "/login";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (shouldHideHeader) {
    return null;
  }

  return (
    <>
      <header className="w-full text-white py-3 flex justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 sm:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <div className="hidden sm:flex text-lg font-semibold space-x-6 items-center">
          <Link href={"/dashboard"}>
            <ChartNoAxesCombined size={40} />
          </Link>
          <Navigation />
        </div>

        <UserInfo />
      </header>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
}
