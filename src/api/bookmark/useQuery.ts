'use client';

import { useQuery } from '@tanstack/react-query';
import { getBookMarkList } from './bookmarkApi';
import { BOOKMARK_QUERY_KEYS } from './keys.constant';

export function useBookmarkQuery() {
  const {
    data: userData,
    isPending,
    isError,
  } = useQuery({
    queryKey: [BOOKMARK_QUERY_KEYS.BOOKMARK],
    queryFn: getBookMarkList,
  });

  return { userData, isPending, isError };
}
