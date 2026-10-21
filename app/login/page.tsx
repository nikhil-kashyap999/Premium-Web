"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Input from "@/components/Input/Input";
import Field from "@/components/Input/FieldWrapper";
import PasswordField from "@/components/Input/PasswordField";
import { useAuth } from "@/store/AuthStore";
import { useNotification } from "@/context/NotificationContext";
import axios from "axios";
import { baseUrl } from "@/constants/App-constants";
import axiosInstance from "@/lib/axiosInterceptor/axios";

// ── Types ──────────────────────────────────────────────────────────────────────
type LoginFormData = {
  username: string;
  password: string;
};

// ── Main component ─────────────────────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const { error: errorNotification } = useNotification();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({});

  useEffect(() => {
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });
  }, []);

  // ── Submit ───────────────────────────────────────────────────────────────────
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setServerError(null);
    try {
      const res = await axiosInstance.post("/api/auth/login", {
        username: data.username,
        password: data.password,
      });
      const { user } = res.data ?? {};
      setAuth(user);
      router.replace("/chat");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err.response) {
          setServerError("Network error. Please try again.");
          errorNotification("Network error. Please try again.");
          return;
        }
        const message = err.response.data?.message;
        setServerError(message ?? "Something went wrong.");
        if (err.response.status >= 500) {
          errorNotification("Server error. Please try again later.");
        }
      } else {
        setServerError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  if (!mounted) return null;

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

      <div
        className={`relative w-full max-w-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]
          ${animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
      >
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
                Login
              </h1>
              <p className="text-xs" style={{ color: "rgba(160,210,170,0.4)" }}>
                Login into your account
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

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
              noValidate
            >
              {/* Username */}
              <Field label="Username" error={errors.username?.message}>
                <Input
                  placeholder="e.g. nightowl"
                  hasError={!!errors.username}
                  {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "Minimum 3 characters" },
                    maxLength: { value: 20, message: "Maximum 20 characters" },
                    pattern: {
                      value: /^[a-zA-Z0-9_]+$/,
                      message: "Only letters, numbers, underscores",
                    },
                  })}
                />
              </Field>

              {/* Password */}
              <Field label="Password" error={errors.password?.message}>
                <PasswordField
                  placeholder="Min. 8 characters"
                  hasError={!!errors.password}
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                      message: "Needs uppercase, lowercase, and a number",
                    },
                  })}
                />
              </Field>

              <div className="w-full flex justify-end">
                <a
                  className="text-xs text-[#82dc96a6] underline cursor-pointer"
                  href="/forget-password"
                >
                  Forget Password?
                </a>
              </div>

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
                    Loggin...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Footer */}
            <p
              className="text-center text-xs"
              style={{ color: "rgba(160,210,170,0.35)" }}
            >
              Don't have an account?{" "}
              <a
                href="/register"
                className="transition-colors duration-150"
                style={{ color: "rgba(130,220,150,0.65)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "rgba(160,240,175,0.9)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(130,220,150,0.65)")
                }
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
