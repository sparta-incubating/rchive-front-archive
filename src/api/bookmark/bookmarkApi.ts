import { client } from '@/utils/axios/clientAPI';

//북마크 목록 조회
export const getBookmarkList = async () => {
  try {
    const res = await client.get(`/apis/v1/profile/bookmark`);
    return res.data;
  } catch (error) {
    throw new Error('북마크 목록 조회에 실패했습니다. 다시 시도해주세요.');
  }
};

//북마크 생성
export const addBookMark = async (postId: number) => {
  try {
    const res = await client.post(`/apis/v1/posts/${postId}/bookmark`);
    return res.data;
  } catch (error) {
    throw new Error('북마크 생성에 실패했습니다.');
  }
};
//북마크 삭제
export const deleteBookMark = async (postId: number) => {
  try {
    const res = await client.delete(`/apis/v1/posts/${postId}/bookmark`);
    return res.data;
  } catch (error) {
    throw new Error('북마크 삭제에 실패했습니다.');
  }
};
