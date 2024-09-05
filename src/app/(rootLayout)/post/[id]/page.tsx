import { getNoSearchKeywordPostList, getPost } from '@/api/server/postsApi';
import { auth } from '@/auth';
import axios from 'axios';
import React from 'react';
import PostDetail from '@/components/pages/postDetailPage';
import CustomError from '@/components/pages/customError';
import { postFetchData } from '@/types/posts.types';
import PostDetailHeader from '@/components/molecules/postDetail/postDetailHeader';
import DetailPage from '@/components/pages/detailPage';
import MainHeader from '@/components/molecules/mainHeader';

export const revalidate = 0;

const Post = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const session = await auth();
  const trackName = session?.user.trackName;
  const period = session?.user.loginPeriod;

  try {
    const response = await getPost(
      Number(postId),
      trackName || '',
      Number(period),
    );

    const postData = response.data.data as postFetchData;

    const postListResponse = await getNoSearchKeywordPostList(
      trackName || '',
      Number(period),
      `category=${postData.postType}&page=1&size=4`,
    );

    return (
      <DetailPage theme="light">
        <div className="w-full border-b border-gray-100">
          <div className="relative mx-auto flex w-[1152px] flex-col">
            <MainHeader />
            <PostDetailHeader
              title={postData.title}
              tutor={postData.tutor}
              uploadedAt={postData.uploadedAt}
            />
          </div>
        </div>

        <div className="relative mx-auto flex w-[1152px] flex-col">
          <PostDetail
            postData={postData}
            postListData={postListResponse.data}
          />
        </div>
      </DetailPage>
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const data = error?.response?.data;
      const status = error?.response?.status;

      return <CustomError errorData={{ status, data }}></CustomError>;
    }
  }
};

export default Post;
