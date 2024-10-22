import { API_BASE_URL } from "./constants";

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(num);
}

export default function makeFetch<T>(
  auth: boolean,
  path: string,
  accessToken: string | null = null,
  init: RequestInit = {},
): () => Promise<T | { message: string; statusCode: number }> {
  return async function () {
    try {
      const shouldAddContentType = ["POST", "PATCH"].includes(
        init.method || "",
      );

      const headers = {
        ...(auth && accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
        ...(shouldAddContentType ? { "Content-Type": "application/json" } : {}),
        ...init.headers,
      };

      const res = await fetch(`${API_BASE_URL}${path}`, {
        ...init,
        headers,
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      return await res.json();
    } catch (error) {
      console.error("Error making fetch request:", error);
      return { message: "Failed to make request", statusCode: 500 };
    }
  };
}
