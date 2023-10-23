import { ApiSlice } from "./ApiSlice";

import User from "@/models/User";
import { IUser, UserWithoutPassword } from "@/interfaces/Formik/IUser";

export const UserSlice = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user: IUser) => ({
        url: "/users",
        method: "POST",
        body: { ...UserWithoutPassword(user) },
      }),
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getAllUserByKeyword: builder.query({
      query: (keyword: string) => ({
        url: `/users/${keyword}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation({
      query: (user: IUser) => ({
        url: "/users",
        method: "PUT",
        body: { ...UserWithoutPassword(user) },
      }),
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useLazyGetAllUsersQuery,
  useGetAllUserByKeywordQuery,
  useLazyGetAllUserByKeywordQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = UserSlice;
