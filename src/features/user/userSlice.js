import { blogscapeApi } from '../../API/apiSlice';

export const userSlice = blogscapeApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) => [{ type: 'Users', id: arg }],
    }),
    getMyProfile: builder.query({
      query: () => ({
        url: '/me/profile',
        method: 'GET',
      }),
      providesTags: ['myProfile'],
    }),
    updateMyProfile: builder.mutation({
      query: (profile) => ({
        url: '/me/profile',
        method: 'PUT',
        data: profile,
      }),
      invalidatesTags: ['myProfile'],
    }),
    updateMySocialMedia: builder.mutation({
      query: (socialMedia) => ({
        url: '/me/social-media',
        method: 'PUT',
        data: socialMedia,
      }),
      invalidatesTags: ['myProfile'],
    }),
    updateMyPassword: builder.mutation({
      query: (password) => ({
        url: '/me/password',
        method: 'PUT',
        data: password,
      }),
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
  useUpdateMySocialMediaMutation,
  useUpdateMyPasswordMutation,
} = userSlice;
export const selectUserResult = userSlice.endpoints.getUserById.select();
export const selectMyProfileResult = userSlice.endpoints.getMyProfile.select();
