"use client";
import React, { useState } from "react";
import Input from "@/components/Input/Input";
import Field from "@/components/Input/FieldWrapper";
import { useForm } from "react-hook-form";
import PasswordField from "@/components/Input/PasswordField";
import { useRouter } from "next/navigation";
import CodeInput from "@/components/Input/CodeInput";

type EmailFormData = {
  email: string;
};

type ResetFormData = {
  OTP: number;
  newPassword: string;
};

type Step = "email" | "reset";

export default function Page() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [loading, setLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  // ---- Step 1: Email form ----
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<EmailFormData>({});

  const onSubmitEmail = async (data: EmailFormData) => {
    setServerError(null);
    setLoading(true);
    try {
    //   const res = await fetch("/api/auth/forgot-password/send-otp", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email: data.email }),
    //   });

    //   if (!res.ok) {
    //     const errData = await res.json().catch(() => null);
    //     throw new Error(errData?.message || "Failed to send OTP");
    //   }

      setEmail(data.email);
      setStep("reset");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ---- Step 2: OTP + New Password form ----
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors },
  } = useForm<ResetFormData>({});

  const onSubmitReset = async (data: ResetFormData) => {
    setServerError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          otp: data.OTP,
          newPassword: data.newPassword,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.message || "Failed to reset password");
      }

      router.push("/login");
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
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

      <div
        key={step}
        className="relative w-full max-w-sm transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in"
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
                {step === "email" ? "Forget Password" : "Reset Password"}
              </h1>
              <p className="text-xs" style={{ color: "rgba(160,210,170,0.4)" }}>
                {step === "email"
                  ? "Enter your email to receive an OTP"
                  : `OTP sent to ${email}`}
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

            {step === "email" ? (
              <form
                onSubmit={handleSubmitEmail(onSubmitEmail)}
                className="flex flex-col gap-4"
                noValidate
              >
                <Field label="Email" error={emailErrors.email?.message}>
                  <Input
                    placeholder="you@example.com"
                    hasError={!!emailErrors.email}
                    {...registerEmail("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                </Field>

                <SubmitButton loading={loading} label="Send OTP" />
              </form>
            ) : (
              <form
                onSubmit={handleSubmitReset(onSubmitReset)}
                className="flex flex-col gap-4"
                noValidate
              >
                <Field label="OTP" error={resetErrors.OTP?.message}>
                  {/* <Input
                    placeholder="e.g. 123456"
                    hasError={!!resetErrors.OTP}
                    {...registerReset("OTP", {
                      required: "OTP is required",
                      minLength: { value: 6, message: "Minimum 6 characters" },
                      maxLength: { value: 6, message: "Maximum 6 characters" },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers",
                      },
                    })}
                  /> */}
                  <CodeInput/>

                </Field>

                <Field
                  label="New Password"
                  error={resetErrors.newPassword?.message}
                >
                  <PasswordField
                    placeholder="Min. 8 characters"
                    hasError={!!resetErrors.newPassword}
                    {...registerReset("newPassword", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Minimum 8 characters" },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                        message: "Needs uppercase, lowercase, and a number",
                      },
                    })}
                  />
                </Field>

                <SubmitButton loading={loading} label="Change Password" />

                <button
                  type="button"
                  className="text-xs text-neutral-500 hover:text-neutral-300 duration-150"
                  onClick={() => {
                    setServerError(null);
                    setStep("email");
                  }}
                >
                  ← Change email
                </button>
              </form>
            )}

            {step === "email" && (
              <button
                type="button"
                className="bg-neutral-950 hover:bg-black duration-150 border border-neutral-800 rounded-xl p-3 text-xs"
                onClick={() => router.back()}
              >
                Go Back
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SubmitButton({
  loading,
  label,
}: {
  loading: boolean;
  label: string;
}) {
  return (
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
          Please wait...
        </span>
      ) : (
        label
      )}
    </button>
  );
}