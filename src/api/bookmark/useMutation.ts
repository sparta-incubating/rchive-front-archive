import { queryClient } from '@/provider/tanstackQueryProvider/TanstackQueryProvider';
import { useMutation } from '@tanstack/react-query';
import { BOOKMARK_QUERY_KEYS } from './keys.constant';
import { addBookMark, deleteBookMark } from './bookmarkApi';

export const useBookmarkUpdate = () => {
  //북마크 생성
  const postBookmarkMutate = useMutation({
    mutationFn: addBookMark,
    // onSuccess: () =>
    //   queryClient.invalidateQueries({
    //     queryKey: [BOOKMARK_QUERY_KEYS.BOOKMARK],
    //   }),
    onError: (error) => {
      console.log('북마크 생성 실패:', error);
    },
  });

  //북마크 삭제
  const deleteBookMarkMutate = useMutation({
    mutationFn: deleteBookMark,
    // onSuccess: () =>
    //   queryClient.invalidateQueries({
    //     queryKey: [BOOKMARK_QUERY_KEYS.BOOKMARK],
    //   }),
    onError: (error) => {
      console.log('북마크 삭제 실패:', error);
    },
  });

  //북마크 전체 삭제
  const deleteAllBookMarkMutate = useMutation({
    mutationFn: deleteBookMark,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [BOOKMARK_QUERY_KEYS.BOOKMARK],
      }),
    onError: (error) => {
      console.log('북마크 삭제 실패:', error);
    },
  });

  return {
    postBookmarkMutate,
    deleteBookMarkMutate,
    deleteAllBookMarkMutate,
  };
};
