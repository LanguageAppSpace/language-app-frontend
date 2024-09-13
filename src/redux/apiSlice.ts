import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut, AuthState } from "@redux/auth/authSlice";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "@redux/store";
import camelcaseKeys from "camelcase-keys";
import snakecaseKeys from "snakecase-keys";

const getAccessToken = (state: RootState): string | null => {
  let accessToken: AuthState["accessToken"] = state.auth.accessToken;
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken");
  }
  return accessToken;
};

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken = getAccessToken(state);
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
    args.body = snakecaseKeys(args.body, { deep: true });
  }
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.username;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
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
});
