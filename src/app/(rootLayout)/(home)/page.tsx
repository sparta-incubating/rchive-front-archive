import React from 'react';
import MainPage from '@/components/pages/mainPage';
import PostList from '@/components/pages/postList';
import { SearchParamsType } from '@/types/posts.types';
import { auth } from '@/auth';
import axios from 'axios';
import CustomError from '@/components/pages/customError';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constatns/posts.constant';
import { getNoSearchKeywordPostList, getPostList } from '@/api/server/postsApi';

export const revalidate = 60;

interface PostProps {
  searchParams: SearchParamsType;
}

const page = async ({ searchParams }: PostProps) => {
  const searchParamsData: SearchParamsType = {
    postType: searchParams.postType ?? '',
    startDate: searchParams.startDate ?? '',
    endDate: searchParams.endDate ?? '',
    searchPeriod: searchParams.searchPeriod ?? '',
    isOpened: searchParams.isOpened ?? '',
    tutorId: searchParams.tutorId ?? '',
    page: searchParams.page ?? '',
    size: searchParams.size ?? '',
    title: searchParams.title ?? '',
  };

  const session = await auth();

  const period = 1;
  const trackName = session?.user.trackName;

  const query = new URLSearchParams();
  if (searchParamsData.postType && searchParams.postType !== 'all')
    query.set('postType', searchParamsData.postType);
  if (searchParamsData.startDate)
    query.set('startDate', searchParamsData.startDate);
  if (searchParamsData.endDate) query.set('endDate', searchParamsData.endDate);
  if (searchParamsData.searchPeriod)
    query.set('searchPeriod', searchParamsData.searchPeriod);
  if (searchParamsData.isOpened && searchParams.isOpened !== 'all')
    query.set('isOpened', searchParamsData.isOpened);
  if (searchParamsData.tutorId) query.set('tutorId', searchParamsData.tutorId);
  if (searchParamsData.title) query.set('title', searchParamsData.title);
  query.set('page', searchParamsData.page || DEFAULT_PAGE);
  query.set('size', searchParamsData.size || DEFAULT_PAGE_SIZE);

  let postListResponse;
  try {
    if (!searchParamsData.title) {
      postListResponse = await getNoSearchKeywordPostList(
        trackName || '',
        Number(period),
        query.toString(),
      );
    } else {
      postListResponse = await getPostList(
        trackName || '',
        Number(period),
        query.toString(),
      );
    }

    return (
      <MainPage>
        <PostList
          searchParams={searchParamsData}
          postListData={postListResponse.data}
        />
      </MainPage>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error?.response?.data;
      const status = error?.response?.status;

      return <CustomError errorData={{ status, data }}></CustomError>;
    }
  }
};

export default page;
