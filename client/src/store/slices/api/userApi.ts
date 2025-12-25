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

interface UpdateEmailInput {
  email: string;
}

interface UpdateNameInput {
  name: string;
}

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data: RegisterInput) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    login: builder.mutation({
      query: (data: LoginInput) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),

    currentUser: builder.query<User, void>({
      query: () => ({
        url: "/users/get-user-info",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    uploadAvatar: builder.mutation({
      query: (data: AvatarUploadInput) => ({
        url: "/users/upload-avatar",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateEmail: builder.mutation({
      query: (data: UpdateEmailInput) => ({
        url: "/users/update-email",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    updateName: builder.mutation({
      query: (data: UpdateNameInput) => ({
        url: "/users/update-name",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserQuery,
  useUploadAvatarMutation,
  useUpdateEmailMutation,
  useUpdateNameMutation,
} = authApiSlice;
