import { useQuery } from '@tanstack/react-query';
import { getProfile } from './profileApi';
import { PROFILE_QUERY_KEYS } from './keys.constant';

export function useGetProfileQuery() {
  const { data, isPending, isError } = useQuery({
    queryKey: [PROFILE_QUERY_KEYS.PROFILE],
    queryFn: getProfile,
  });

  return { data, isPending, isError };
}
