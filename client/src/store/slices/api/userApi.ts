import { apiSlice } from "../apiSlice";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "/users/register",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/users/login",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApiSlice;
