"use client";
import CodeInput from "@/components/Input/CodeInput";
import { useNotification } from "@/context/NotificationContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const router = useRouter();
  const { success, error } = useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const onComplete = async (OTP: string) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/verify-otp",
        { OTP },
        { withCredentials: true },
      );
      sessionStorage.clear();
      success(res.data.message);
      router.replace("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setServerError(
          error.response?.data?.message ?? "Error in OPT verification",
        );
      } else {
        setServerError("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    // onComplete();
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center px-4 max-h-[90vh] lg:max-h-screen"
      style={{ background: "#111c13" }}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(60,150,80,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative w-full max-w-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in">
        {/* Card */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(18,30,20,0.82)",
            border: "0.5px solid rgba(120,180,130,0.14)",
            boxShadow:
              "0 32px 64px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,0,0,0.3)",
          }}
        >
          {/* Top glow */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% -10%, rgba(80,190,110,0.09) 0%, transparent 70%)",
            }}
          />

          <div className="px-6 pt-8 pb-6 flex flex-col gap-6">
            {/* Heading */}
            <div className="flex flex-col gap-1">
              <h1
                className="text-xl font-semibold tracking-tight"
                style={{ color: "rgba(210,240,215,0.95)" }}
              >
                Email Verification
              </h1>
              <p className="text-xs" style={{ color: "rgba(160,210,170,0.4)" }}>
                Enter OTP
              </p>
            </div>

            {/* Server error */}
            {serverError && (
              <div
                className="rounded-xl px-4 py-2.5 text-xs"
                style={{
                  background: "rgba(255,80,80,0.08)",
                  border: "0.5px solid rgba(255,80,80,0.25)",
                  color: "rgba(255,140,140,0.85)",
                }}
              >
                {serverError}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
              <CodeInput length={6} onComplete={onComplete} />
              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: loading
                    ? "rgba(80,190,110,0.18)"
                    : "rgba(80,190,110,0.22)",
                  border: "0.5px solid rgba(130,220,150,0.3)",
                  color: "rgba(180,240,195,0.95)",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    e.currentTarget.style.background = "rgba(80,190,110,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(80,190,110,0.22)";
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin"
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{ animationDuration: "0.9s" }}
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="5.5"
                        stroke="rgba(130,220,150,0.2)"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M7 1.5 A5.5 5.5 0 0 1 12.5 7"
                        stroke="rgba(130,220,150,0.9)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Plase wait...
                  </span>
                ) : (
                  "Submit"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
