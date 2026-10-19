import { useNotification } from "@/context/NotificationContext";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import { useAuth } from "@/store/AuthStore";
import axios from "axios";
import { useRouter } from "next/navigation";

function useLogout() {
  const { clearAuth } = useAuth();
  const router = useRouter();
  const { success, error: errNotification } = useNotification();

  const logout = async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      success("Logout Successful");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message: errMsg } = err.response?.data ?? "Error in logout";
        errNotification(errMsg);
      }
    } finally {
      clearAuth();
      router.replace("/login");
    }
  };
  return logout;
}

export default useLogout;
