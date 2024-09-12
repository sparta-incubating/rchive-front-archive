'use client';

import { useQuery } from '@tanstack/react-query';
import { getBookmarkList, getSearchBookMark } from './bookmarkApi';
import { BOOKMARK_QUERY_KEYS } from './keys.constant';

export function useBookmarkQuery() {
  const {
    data: bookmarkList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [BOOKMARK_QUERY_KEYS.BOOKMARK],
    queryFn: getBookmarkList,
  });

  return { bookmarkList, isPending, isError };
}

export function useSearchBookmarkQuery(keyword: string) {
  const {
    data: searchList,
    isPending,
    isError,
  } = useQuery({
    queryKey: [BOOKMARK_QUERY_KEYS.BOOKMARK],
    queryFn: () => getSearchBookMark(keyword),
  });

  return { searchList, isPending, isError };
}
