'use client';

import { useGetRoleQuery } from '@/api/mypage/useQuery';
import { useCallback, useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import PageNation from '../atoms/pageNation';
import { TrackType } from '@/types/posts.types';
import { useAppSelector } from '@/redux/storeConfig';

type RoleList = {
  trackId: number;
  trackRoleEnum: string;
  trackName: string;
  period: number;
};

type SelectTrackAccountProps = {
  onGetId: (trackName: TrackType, period: number) => void;
};

const SelectTrackAccount = ({ onGetId }: SelectTrackAccountProps) => {
  const { data, isPending } = useGetRoleQuery();
  const [clickedId, setClickedId] = useState<number | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const { period, trackName } = useAppSelector((state) => state.authSlice);

  /*페이지 네이션 */
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const itemsPerPage = 6;

  const updateQueryParams = useCallback(
    (key: string, value: string | number | undefined) => {
      const query = new URLSearchParams(searchParams.toString());
      if (value && !(key === 'trackId' && value === 'all')) {
        query.set(key, String(value));
      } else {
        query.delete(key);
      }

      if (key !== 'page') {
        query.set('page', '1');
      }

      router.push(`${pathname}?${query.toString()}`);
    },
    [router, searchParams, pathname],
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateQueryParams('page', page);
    },
    [updateQueryParams],
  );

  const roleList = useMemo(() => data?.data?.roleResList || [], [data]);

  const paginatedRoleList = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return roleList.slice(startIndex, startIndex + itemsPerPage);
  }, [roleList, currentPage, itemsPerPage]);

  useEffect(() => {
    if (!searchParams.has('page')) {
      const query = new URLSearchParams(searchParams.toString());
      query.set('page', '1');
      router.replace(`${pathname}?${query.toString()}`);
    }
  }, [searchParams, router, pathname]);
  /*페이지 네이션 */

  /*프로필 선택 */
  useEffect(() => {
    if (trackName && period) {
      const foundRole = roleList.find(
        (role: RoleList) =>
          role.trackName === trackName && role.period === Number(period),
      );
      if (foundRole) {
        setClickedId(foundRole.trackId);
      }
    }
  }, [trackName, period, roleList]);

  const handleClick = useCallback(
    (trackName: TrackType, period: number, trackId: number) => {
      setClickedId(trackId);
      onGetId(trackName, period);
    },
    [onGetId],
  );
  /*프로필 선택 */

  if (isPending) {
    return <div>로딩중</div>;
  }

  return (
    <main className="w-full border py-[100px]">
      <div className="h-auto border px-[40px]">
        <div className="grid grid-cols-3 gap-[42px] border px-[40px]">
          {paginatedRoleList.map((items: RoleList) => (
            <button
              key={items.trackId}
              onClick={() =>
                handleClick(trackName, items.period, items.trackId)
              }
            >
              <div
                className={`flex h-[83px] w-[254px] items-center gap-[12px] rounded-[16px] px-[20px] text-2xl font-bold ${
                  clickedId === items.trackId
                    ? `border border-point-color bg-primary-50 text-point-color`
                    : `border text-gray-400`
                }`}
              >
                <p className="flex h-[42px] w-[70px] items-center justify-center rounded-[16px] bg-white">
                  {items.trackRoleEnum}
                </p>
                <p className="w-[130px] border text-center">{`${items.trackName} ${items.period}기`}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <PageNation
        currentPage={currentPage}
        totalElements={roleList.length}
        size={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default SelectTrackAccount;
