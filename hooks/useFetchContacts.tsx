import { contactType } from "@/Types/ContactsType";
import { useNotification } from "@/context/NotificationContext";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import { useAuth } from "@/store/AuthStore";
import { useContacts } from "@/store/ContactsStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

export default function useFetchContacts() {
  const { user } = useAuth();
  const { error: errNotification } = useNotification();
  const { setContacts } = useContacts();
  const {
    data: returnedContacts,
    isLoading,
    error,
    refetch: fetchContacts,
  } = useQuery<contactType[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/api/user/contacts");
      return res.data?.res ?? [];

    },
    enabled: !!user,
    staleTime: 1000 * 100, // 100 sec
  });

  useEffect(() => {
    if (returnedContacts) setContacts(returnedContacts);
  }, [returnedContacts, setContacts]);

  useEffect(() => {
    if (error) {
      const errMsg = axios.isAxiosError(error)
        ? (error.response?.data?.message ?? "Error while fetching contacts")
        : "Error while fetching contacts";
      errNotification(errMsg);
    }
  }, [error, errNotification]);
  return {
    returnedContacts,
    fetchContacts,
    isLoading,
  };
}
