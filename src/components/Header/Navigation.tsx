"use client";
import Link from "next/link";
import Logout from "../Logout";

type NavigationProps = {
  onLinkClick?: () => void;
};

export default function Navigation({ onLinkClick }: NavigationProps) {
  return (
    <nav className="flex flex-col h-full px-4 py-3 justify-between text-2xl">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4">
        <Link
          href="/dashboard"
          onClick={onLinkClick}
          className="hover:underline"
        >
          Dashboard
        </Link>
        <Link href="/data" onClick={onLinkClick} className="hover:underline">
          Data
        </Link>
      </div>
      <div className="sm:hidden">
        <Logout />
      </div>
    </nav>
  );
}
