import { blogscapeApi } from '../../API/apiSlice';

export const tagsSlice = blogscapeApi.injectEndpoints({
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: '/me/following',
        method: 'GET',
      }),
      providesTags: ['Tags'],
    }),
    createTag: builder.mutation({
      query: (tag) => ({
        url: '/tags',
        method: 'POST',
        data: tag,
      }),
      invalidatesTags: ['Tags'],
    }),
  }),
});

export const { useGetTagsQuery, useCreateTagMutation } = tagsSlice;
export const selectTagsResult = tagsSlice.endpoints.getTags.select();
