import { PostListResponse } from '@/types/posts.types';
import { createServerAPI } from '@/utils/axios/serverAPI';
import { cache } from 'react';

export const getPostList = cache(
  async (trackName: string, period: number, queryString: string) => {
    const serverAPI = await createServerAPI();
    return serverAPI.get<PostListResponse>(
      `/apis/v1/posts/search?trackName=${trackName}&loginPeriod=${period}&${queryString}`,
    );
  },
);

export const getNoSearchKeywordPostList = cache(
  async (trackName: string, period: number, queryString: string) => {
    const serverAPI = await createServerAPI();
    return serverAPI.get(
      `/apis/v1/posts/category?trackName=${trackName}&loginPeriod=${period}&${queryString}`,
    );
  },
);

export const getPost = cache(
  async (postId: number, trackName: string, period: number) => {
    const serverAPI = await createServerAPI();
    return await serverAPI.get(
      `/apis/v1/posts/${postId}?trackName=${trackName}&period=${period}`,
    );
  },
);

export const getPostForTag = cache(
  async (trackName: string, period: number, queryString: string) => {
    const serverAPI = await createServerAPI();
    return await serverAPI.get(
      `/apis/v1/posts/tags/search?trackName=${trackName}&loginPeriod=${period}&${queryString}`,
    );
  },
);

export const getPostPeriod = async (trackName: string) => {
  const serverAPI = await createServerAPI();
  return serverAPI.get(`/apis/v1/role/track/period?trackName=${trackName}`);
};
