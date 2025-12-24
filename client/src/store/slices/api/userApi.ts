import type { User } from "@/types/userType";
import { apiSlice } from "../apiSlice";

interface LoginInput {
  email: string;
  password: string;
}

interface RegisterInput extends LoginInput {
  name: string;
}

interface AvatarUploadInput {
  image_url: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
      }),
    }),

    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/users/get-user-info",
        method: "GET",
      }),
    }),

    uploadAvatar: builder.mutation({
      query: (data: AvatarUploadInput) => ({
        url: "/users/upload-avatar",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation
} = authApiSlice;
