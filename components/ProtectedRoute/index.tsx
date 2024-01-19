"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      localStorage.setItem("token", session?.user?.token);
    }
    if (!session && status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [session, status, router]);

  // Render the protected content or null if the session is loading
  return status === "authenticated" ? <>{children}</> : null;
};

export default ProtectedRoute;
