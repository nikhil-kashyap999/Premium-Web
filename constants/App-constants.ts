export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
export const baseUrl =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_URL
    : process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL;
