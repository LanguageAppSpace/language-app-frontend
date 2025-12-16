import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "@/redux/auth/authSlice";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "@/redux/store";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

interface RefreshResponse {
  access: string;
  refresh: string;
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

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  if (typeof args !== "string" && args.body) {
    args.body = snakecaseKeys(args.body, { deep: true }) as Record<
      string,
      unknown
    >;
  }
  let result = await baseQuery(args, api, extraOptions);
  if (
    result.error &&
    typeof result.error.status === "number" &&
    [401, 403].includes(result.error.status)
  ) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      api.dispatch(logOut());
      return result;
    }

    const refreshResult = await baseQuery(
      {
        url: "/user/token/refresh/",
        method: "POST",
        body: { refresh: refreshToken },
      },
      api,
      extraOptions
    );
    const refreshData = refreshResult.data as RefreshResponse;

    if (refreshData) {
      const { refresh, access } = refreshData;
      const username = (api.getState() as RootState).auth.username;
      api.dispatch(setCredentials({ accessToken: access, username }));
      localStorage.setItem("refreshToken", refresh);
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      return result;
    }
  }
  if (result) {
    result = camelcaseKeys(result, { deep: true });
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ["Lessons", "Sections"],
});
