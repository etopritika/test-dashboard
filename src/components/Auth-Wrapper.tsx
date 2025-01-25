"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthWrapperProps {
  children: React.ReactNode;
  redirectIfAuthenticated?: boolean;
}

function AuthWrapper({
  children,
  redirectIfAuthenticated = false,
}: AuthWrapperProps) {
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth-storage");
    const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

    setCurrentUser(parsedAuth?.state?.currentUser || null);

    if (!parsedAuth?.state?.currentUser && !redirectIfAuthenticated) {
      router.replace("/login");
    } else if (parsedAuth?.state?.currentUser && redirectIfAuthenticated) {
      router.replace("/dashboard");
    }
  }, [redirectIfAuthenticated, router]);

  if (currentUser === null && !redirectIfAuthenticated) {
    return null;
  }

  if (currentUser && redirectIfAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthWrapper;
