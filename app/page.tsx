"use client";
import { useEffect } from "react";
import { useAuth } from "@/store/AuthStore";
import LoadingPage from "@/components/LoadingPage/LoadingPage";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import { useRouter } from "next/navigation";
import { useNotification } from "@/context/NotificationContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const { error: errNotification } = useNotification();

  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/auth/me");
      return res.data.data;
    },
    retry: false,
    staleTime: 60_000,
  });
  useEffect(() => {
    if (error) {
      const errMsg = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "Authentication Failed")
        : "Authentication Failed";

      errNotification(errMsg);
      router.replace("/landing");
      return;
    }

    if (data) {
      setAuth(data);
      router.replace("/chat");
    }
  }, [data, error]);

  return <LoadingPage />;
}
