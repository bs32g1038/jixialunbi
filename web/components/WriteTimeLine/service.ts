import { commonSplitApi } from '@/apis';

const apis = commonSplitApi.injectEndpoints({
  endpoints: (build) => ({
    createTimeLine: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '添加时间线',
        url: '/api/post-time-line/create',
        method: 'post',
        data,
      }),
    }),
    fetchTimeLine: build.query<any, { id: number }>({
      query: (data) => ({
        name: '获取单个时间线',
        url: '/api/post-time-line/get',
        method: 'get',
        params: data,
      }),
    }),
    fetchTimeLines: build.query<any, any>({
      query: (data) => ({
        name: '获取时间线',
        url: '/api/post-time-line/getAll',
        method: 'get',
        data,
      }),
    }),
    updateTimeLine: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '更新时间线',
        url: '/api/post-time-line/update',
        method: 'post',
        data,
      }),
    }),
    deleteTimeLine: build.mutation<any, { id: number }>({
      query: (data) => ({
        name: '删除时间线',
        url: '/api/post-time-line/delete',
        method: 'post',
        data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLazyFetchTimeLinesQuery,
  useLazyFetchTimeLineQuery,
  useCreateTimeLineMutation,
  useUpdateTimeLineMutation,
  useDeleteTimeLineMutation,
} = apis;
