import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

const useQueryParams = (basePath: string = '/') => {
  const router = useRouter();

  return useCallback(
    (
      key: string,
      value: string | number | undefined,
      setCurrentPage: (page: number) => void,
    ) => {
      const query = new URLSearchParams(window.location.search);

      if (value && !(key === 'tutorId' && value === 'all')) {
        query.set(key, String(value));
      } else {
        query.delete(key);
      }

      if (key !== 'page') {
        setCurrentPage(1);
        query.set('page', '1');
      }

      router.push(`${basePath}?${query.toString()}`);
    },
    [router, basePath],
  );
};

export default useQueryParams;
