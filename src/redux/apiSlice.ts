import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "@/redux/auth/authSlice";
import type {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/redux/store";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

interface RefreshResponse {
  access: string;
  refresh?: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

interface AuthExtraOptions {
  requiresAuth?: boolean;
}

type AuthBaseQuery = BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  AuthExtraOptions
>;

const authenticationError: FetchBaseQueryError = {
  status: "CUSTOM_ERROR",
  error: "Unable to restore authentication.",
};

let refreshPromise: Promise<FetchBaseQueryError | undefined> | null = null;

async function refreshSession(
  api: BaseQueryApi,
  extraOptions: AuthExtraOptions
): Promise<FetchBaseQueryError | undefined> {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    api.dispatch(logOut());
    return authenticationError;
  }

  const result = await baseQuery(
    {
      url: "/user/token/refresh/",
      method: "POST",
      body: { refresh: refreshToken },
    },
    { ...api, signal: new AbortController().signal },
    extraOptions
  );

  if (localStorage.getItem("refreshToken") !== refreshToken) {
    return authenticationError;
  }
  if (result.error) {
    return camelcaseKeys(result.error, { deep: true });
  }

  const data = result.data as RefreshResponse | undefined;
  if (typeof data?.access !== "string" || !data.access.trim()) {
    return authenticationError;
  }

  if (typeof data.refresh === "string" && data.refresh.trim()) {
    localStorage.setItem("refreshToken", data.refresh);
  }
  const username = (api.getState() as RootState).auth.username;
  api.dispatch(setCredentials({ accessToken: data.access, username }));
}

function restoreSession(
  api: BaseQueryApi,
  extraOptions: AuthExtraOptions
): Promise<FetchBaseQueryError | undefined> {
  if (!refreshPromise) {
    refreshPromise = refreshSession(api, extraOptions).finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
}

const baseQueryWithCredentials: AuthBaseQuery = (args, api, extraOptions) => {
  if (
    extraOptions?.requiresAuth !== false &&
    !(api.getState() as RootState).auth.accessToken
  ) {
    return { error: authenticationError };
  }
  return baseQuery(args, api, extraOptions);
};

const baseQueryWithReauth: AuthBaseQuery = async (args, api, extraOptions) => {
  if (
    typeof args !== "string" &&
    args.body &&
    !(args.body instanceof FormData)
  ) {
    args.body = snakecaseKeys(args.body, { deep: true }) as Record<
      string,
      unknown
    >;
  }

  const isProtected = extraOptions?.requiresAuth !== false;
  if (isProtected && !(api.getState() as RootState).auth.accessToken) {
    const error = await restoreSession(api, extraOptions);
    if (error) {
      return { error };
    }
  }

  const requestToken = (api.getState() as RootState).auth.accessToken;
  let result = await baseQueryWithCredentials(args, api, extraOptions);
  if (
    isProtected &&
    typeof result.error?.status === "number" &&
    [401, 403].includes(result.error.status)
  ) {
    const currentToken = (api.getState() as RootState).auth.accessToken;
    if (!currentToken || currentToken === requestToken) {
      const error = await restoreSession(api, extraOptions);
      if (error) {
        return { error };
      }
    }
    result = await baseQueryWithCredentials(args, api, extraOptions);
  }

  return camelcaseKeys(result, { deep: true });
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Lessons", "Sections", "Streak", "Profile"],
});
