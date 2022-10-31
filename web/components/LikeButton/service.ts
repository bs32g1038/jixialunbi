import { commonSplitApi } from '@/apis';

const apis = commonSplitApi.injectEndpoints({
  endpoints: (build) => ({
    createLike: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '创建喜欢',
        url: '/api/likes/create',
        method: 'post',
        data,
      }),
    }),
    deleteLike: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '删除喜欢',
        url: '/api/likes/delete',
        method: 'post',
        data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useCreateLikeMutation, useDeleteLikeMutation } = apis;
