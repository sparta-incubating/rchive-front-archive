'use client';

import { useQuery } from '@tanstack/react-query';
import { getBookmarkList } from './bookmarkApi';
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
