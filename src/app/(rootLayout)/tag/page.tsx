import { getPostForTag } from '@/api/server/postsApi';
import { auth } from '@/auth';
import CustomError from '@/components/pages/customError';
import MainPage from '@/components/pages/mainPage';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constatns/posts.constant';
import { SearchTagParamsType } from '@/types/posts.types';
import axios from 'axios';
import PostListForTag from '@/components/pages/postListForTag';

interface CategorySearchPageProps {
  searchParams: SearchTagParamsType;
}

const TagSearchPage = async ({ searchParams }: CategorySearchPageProps) => {
  const searchParamsData: SearchTagParamsType = {
    tagId: searchParams.tagId,
    tagName: searchParams.tagName,
    postType: searchParams.postType ?? '',
    page: searchParams.page ?? '',
    size: searchParams.size ?? '',
  };

  const session = await auth();

  const period = session?.user.loginPeriod;
  const trackName = session?.user.trackName;

  const query = new URLSearchParams();

  query.set('tagId', searchParamsData.tagId);
  query.set('tagName', searchParamsData.tagName);
  query.set('page', searchParamsData.page || DEFAULT_PAGE);
  query.set('size', searchParamsData.size || DEFAULT_PAGE_SIZE);
  if (searchParamsData.postType && searchParams.postType !== 'all') {
    query.set('category', searchParamsData.postType);
  }

  try {
    const postListResponse = await getPostForTag(
      trackName || '',
      Number(period),
      query.toString(),
    );

    return (
      <MainPage>
        <PostListForTag
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

export default TagSearchPage;
