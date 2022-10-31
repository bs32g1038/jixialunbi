import { createApi } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios from '../libs/axios';
import type { AxiosRequestConfig } from 'axios';
import { HYDRATE } from 'next-redux-wrapper';

const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: '' }
  ): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig['method'];
      data?: AxiosRequestConfig['data'];
      params?: AxiosRequestConfig['params'];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, notification }: any) => {
    const result = await axios({ url: baseUrl + url, method, data, params, notification } as any);
    return { data: result.data.data };
  };

let baseUrl = '';
if (typeof window !== 'undefined') {
  baseUrl = '';
} else {
  baseUrl = 'http://localhost:3000';
}

export const commonSplitApi = createApi({
  reducerPath: 'rootApi',
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  baseQuery: axiosBaseQuery({
    baseUrl,
  }),
  endpoints: (build) => ({
    fetchPosts: build.query<
      any,
      {
        categoryId?: number;
        authorId?: number;
        isHot?: boolean;
        id?: number;
        type?: string;
        query?: string;
      }
    >({
      query: (d) => {
        const { type, query, ...data } = d;
        if (type === 'search') {
          return {
            name: '搜索帖子列表',
            url: '/api/posts-search',
            method: 'get',
            params: { query },
          };
        }
        return {
          name: '获取帖子列表',
          url: '/api/posts',
          method: 'get',
          params: data,
        };
      },
    }),
    fetchPostById: build.query<any, { postId: number }>({
      query: (data) => ({
        name: '获取单个帖子',
        url: '/api/posts/' + data.postId,
        method: 'get',
      }),
    }),
    updatePost: build.mutation<any, any>({
      query: (data) => ({
        name: '更新帖子',
        url: '/api/posts/update',
        method: 'post',
        data,
      }),
    }),
    createPost: build.mutation<any, any>({
      query: (data) => ({
        name: '创建帖子',
        url: '/api/posts/create',
        method: 'post',
        data,
        notification: true,
      }),
    }),
    deletePost: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '删除文章',
        url: '/api/posts/delete',
        method: 'post',
        data,
      }),
    }),
    fetchCategories: build.query<any[], void>({
      query: () => ({
        name: '获取分类列表',
        url: '/api/categories',
        method: 'get',
      }),
    }),
    createCategory: build.mutation<any, any>({
      query: (data) => ({
        name: '创建分类',
        url: '/api/category/create',
        method: 'post',
        data,
      }),
    }),
    updateCategory: build.mutation<any, any>({
      query: (data) => ({
        name: '更新分类',
        url: '/api/category/update',
        method: 'post',
        data,
      }),
    }),
    fetchUserById: build.query<any, { userId: number }>({
      query: (data) => ({
        name: '获取用户通过ID',
        url: '/api/users/' + data.userId,
        method: 'get',
      }),
    }),
    createCollection: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '创建文章收藏',
        url: '/api/likes/create',
        method: 'post',
        data,
      }),
    }),
    deleteCollection: build.mutation<any, { postId: number }>({
      query: (data) => ({
        name: '删除文章收藏',
        url: '/api/post-collection/create',
        method: 'post',
        data,
      }),
    }),
    getLoginUser: build.query<any, void>({
      query: (data) => ({
        name: '获取登录用户信息',
        url: '/api/users/profile',
        method: 'get',
        data,
      }),
    }),
    getUserById: build.query<any, any>({
      query: (data) => ({
        name: '获取用户信息',
        url: '/api/users/' + data?.id,
        method: 'get',
      }),
    }),
    updateUser: build.mutation<any, any>({
      query: (data) => ({
        name: '更新用户信息',
        url: '/api/users/' + data.id,
        method: 'post',
        data,
      }),
    }),
    register: build.mutation<any, any>({
      query: (data) => ({
        name: '注册用户',
        url: '/api/register',
        method: 'post',
        data,
        notification: true,
      }),
    }),
    login: build.mutation<any, any>({
      query: (data) => ({
        name: '登录用户',
        url: '/api/login',
        method: 'post',
        data,
        notification: true,
      }),
    }),

    fetchComments: build.query<any, { postId: number }>({
      query: (data) => ({
        name: '获取评论列表',
        url: '/api/comments',
        method: 'get',
        params: data,
      }),
    }),
    createComment: build.mutation<any, any>({
      query: (data) => ({
        name: '创建评论',
        url: '/api/comments/create',
        method: 'post',
        data,
      }),
    }),
    sendEmail: build.mutation<any, void>({
      query: (data) => ({
        name: '发送验证邮件',
        url: '/api/users/send-email',
        method: 'post',
        data,
        notification: true,
      }),
    }),
    activeEmail: build.mutation<any, any>({
      query: (data) => ({
        name: '激活邮件',
        url: '/api/users/active-email',
        method: 'post',
        data,
      }),
    }),
    fetchNotifications: build.query<
      {
        id: number;
        senderId: number;
        receiverId: number;
        targetId: number;
        type: number;
        title: string;
        content: string;
        read: string;
      }[],
      { receiverId: number }
    >({
      query: (data) => ({
        name: '获取通知列表',
        url: '/api/notifications',
        method: 'get',
        params: data,
      }),
    }),
    updateNotifications: build.mutation<any, { id: number }>({
      query: (data) => ({
        name: '获取通知列表',
        url: '/api/notifications',
        method: 'post',
        data,
      }),
    }),
  }),
});

export const {
  useFetchPostsQuery,
  useLazyFetchPostsQuery,
  useFetchCategoriesQuery,
  useFetchPostByIdQuery,
  useLazyFetchPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useFetchUserByIdQuery,
  useLazyFetchUserByIdQuery,
  useCreateCollectionMutation,
  useDeleteCollectionMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetLoginUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useFetchCommentsQuery,
  useCreateCommentMutation,
  useUpdateUserMutation,
  useGetUserByIdQuery,
  useLazyGetUserByIdQuery,
  useSendEmailMutation,
  useActiveEmailMutation,
  useFetchNotificationsQuery,
  useUpdateNotificationsMutation,
} = commonSplitApi;

export const { fetchPosts, fetchCategories } = commonSplitApi.endpoints;
