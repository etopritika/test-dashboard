"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth-store";
import { removeUserCookie } from "@/lib/actions";

const LogoutButton: React.FC = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await removeUserCookie();
    logout();
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition w-full"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
