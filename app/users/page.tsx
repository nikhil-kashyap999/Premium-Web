"use client";

import { useAuth } from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

// ---- Types ----
// Apne actual UserRole enum se replace karo (e.g. from '@/types/user-role.enum')
type UserRole = "admin" | "moderator" | "user";

async function test() {
  const res = await axios.get("/api/auth/test");
  console.log(res);
}
// ---- API fetcher ----
async function fetchUsers(): Promise<any[]> {
  try {
    const res = await axios.get("/api/auth/all", {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users",
      );
    }

    throw new Error("Failed to fetch users");
  }
}

// ---- Role badge styling ----
const roleStyles: Record<UserRole, string> = {
  admin: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  moderator: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  user: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

function RoleBadge({ role }: { role: UserRole }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${roleStyles[role]}`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isActive ? "bg-green-400" : "bg-red-400"
        }`}
      />
      <span className={isActive ? "text-green-400" : "text-red-400"}>
        {isActive ? "Active" : "Inactive"}
      </span>
    </span>
  );
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminUsersPage() {
  // const { token } = useAuth();
  const {
    data: users,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: fetchUsers,
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50">Users</h1>
            <p className="text-sm text-zinc-400 mt-1">
              {users
                ? `${users.length} total users`
                : "Manage registered users"}
            </p>
          </div>
          <button
            onClick={() => refetch()}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={() => test()}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-zinc-800 bg-zinc-900 hover:bg-zinc-800 transition-colors"
          >
            test
          </button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-zinc-400 text-sm">Loading users...</p>
          </div>
        )}

        {/* Error state */}
        {isError && (
          <div className="rounded-xl border border-red-900/50 bg-red-950/20 p-6 text-center">
            <p className="text-red-400 text-sm font-medium">
              Could not load users
            </p>
            <p className="text-red-400/70 text-xs mt-1">
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
            <button
              onClick={() => refetch()}
              className="mt-4 px-4 py-2 text-xs font-medium rounded-lg border border-red-800 hover:bg-red-900/30 transition-colors"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && users?.length === 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-12 text-center">
            <p className="text-zinc-400 text-sm">No users found.</p>
          </div>
        )}

        {/* Table */}
        {!isLoading && !isError && users && users.length > 0 && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/80">
                    <th className="text-left font-medium text-zinc-400 px-4 py-3 whitespace-nowrap">
                      User
                    </th>
                    <th className="text-left font-medium text-zinc-400 px-4 py-3 whitespace-nowrap">
                      Email
                    </th>
                    <th className="text-left font-medium text-zinc-400 px-4 py-3 whitespace-nowrap">
                      Role
                    </th>
                    <th className="text-left font-medium text-zinc-400 px-4 py-3 whitespace-nowrap">
                      Status
                    </th>
                    <th className="text-left font-medium text-zinc-400 px-4 py-3 whitespace-nowrap">
                      Joined
                    </th>
                    <th className="text-left font-medium text-zinc-400 px-4 py-3 whitespace-nowrap">
                      ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {users.map((user: any) => (
                    <tr
                      key={user._id}
                      className="hover:bg-zinc-800/40 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden bg-zinc-800 shrink-0">
                            {user.avatarUrl ? (
                              <Image
                                src={user.avatarUrl}
                                alt={user.username}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-xs font-medium text-zinc-400">
                                {user.username.slice(0, 2).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <span className="font-medium text-zinc-100">
                            {user.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-zinc-400">{user.email}</td>
                      <td className="px-4 py-3">
                        <RoleBadge role={user.role} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge isActive={user.isActive} />
                      </td>
                      <td className="px-4 py-3 text-zinc-400 whitespace-nowrap">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-zinc-500 font-mono text-xs">
                        {user._id.slice(-8)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
