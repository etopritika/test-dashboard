"use client";

import useAuthStore from "@/store/auth-store";
import Logout from "../Logout";

export default function UserInfo() {
  const currentUser = useAuthStore((state) => state.currentUser);

  return (
    <div className="flex items-center space-x-4">
      <span>Welcome, {currentUser?.name}!</span>
      <div className="hidden sm:block">
        <Logout />
      </div>
    </div>
  );
}
