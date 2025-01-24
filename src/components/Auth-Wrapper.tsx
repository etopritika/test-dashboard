"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/auth-store";

interface AuthWrapperProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
}

function AuthWrapper({
  children,
  redirectIfAuthenticated = false,
}: AuthWrapperProps) {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.currentUser);

  useEffect(() => {
    if (!currentUser && !redirectIfAuthenticated) {
      router.replace("/login");
    } else if (currentUser && redirectIfAuthenticated) {
      router.replace("/dashboard");
    }
  }, [currentUser, router, redirectIfAuthenticated]);

  if (!currentUser && !redirectIfAuthenticated) {
    return null;
  }

  if (currentUser && redirectIfAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthWrapper;
