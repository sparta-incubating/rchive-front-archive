import { PostListResponse } from '@/types/posts.types';
import { cache } from 'react';
import { serverAxios } from '@/utils/axios/serverAxios';

export const getPostList = cache(
  async (trackName: string, period: number, queryString: string) => {
    return serverAxios.get<PostListResponse>(
      `/apis/v1/posts/search?trackName=${trackName}&selectPeriod=${period}&${queryString}`,
    );
  },
);

export const getNoSearchKeywordPostList = cache(
  async (trackName: string, period: number, queryString: string) => {
    return serverAxios.get(
      `/apis/v1/posts/category?trackName=${trackName}&selectPeriod=${period}&${queryString}`,
    );
  },
);

export const getPost = cache(
  async (postId: number, trackName: string, period: number) => {
    return await serverAxios.get(
      `/apis/v1/posts/${postId}?trackName=${trackName}&period=${period}`,
    );
  },
);

export const getPostForTag = cache(
  async (trackName: string, period: number, queryString: string) => {
    return await serverAxios.get(
      `/apis/v1/posts/tags/search?trackName=${trackName}&selectPeriod=${period}&${queryString}`,
    );
  },
);
