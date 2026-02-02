"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoaderPage from "@/components/common/LoaderPage";
import { useAuth } from "@/features/auth/hooks/useAuth";

type PrortectedRoutesProps = {
  children: React.ReactNode;
  allowedUsers: "admin" | "customer";
};
const ProtectedRoutes = ({
  children,
  allowedUsers = "customer",
}: PrortectedRoutesProps) => {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isLoading,
    isVerifying,
    verifyAuth,
    isRefreshing,
  } = useAuth();

  // check user auth
  useEffect(() => {
    if (isVerifying) {
      verifyAuth();
    }
  }, [verifyAuth, isVerifying]);

  // redirect if is not verifying and user is not authenticated to login page
  useEffect(() => {
    if (!isVerifying && !isAuthenticated && !isRefreshing)
      router.replace("/auth/login");

    if (user && user.role !== allowedUsers) router.replace("/");
  }, [isVerifying, isAuthenticated, router, user, allowedUsers, isRefreshing]);

  // if is verifying or loading show loader
  if (isVerifying || isLoading || isRefreshing) return <LoaderPage />;

  return children;
};

export default ProtectedRoutes;
