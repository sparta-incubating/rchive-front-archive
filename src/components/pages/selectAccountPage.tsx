'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import SelectTrackHeader from '../molecules/selectTrackHeader';
import SelectTrackAccount from '../molecules/selectTrackAccount';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useAppSelector } from '@/redux/storeConfig';

import { useGetRoleQuery } from '@/api/mypage/useQuery';

import PageNation from '../atoms/pageNation';

const SelectAccountPage = () => {
  const { data, isPending } = useGetRoleQuery();
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
  // useEffect(() => {
  //   if (trackName && period) {
  //     const foundRole = roleList.find(
  //       (role: RoleList) =>
  //         role.trackName === trackName && role.period === Number(period),
  //     );
  //     if (foundRole) {
  //       setClickedId(foundRole.trackId);
  //     }
  //   }
  // }, [trackName, period, roleList]);

  /*프로필 선택 */

  if (isPending) {
    return <div>로딩중</div>;
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-archive-gradient">
      <section className="flex h-[730px] w-[1200px] items-center justify-center rounded-[40px] border bg-white p-[10px] shadow-archiveShadow">
        <section className="h-[690px] w-[1157px] rounded-[40px] bg-blue-50">
          <SelectTrackHeader />
          <SelectTrackAccount paginatedRoleList={paginatedRoleList} />
          <PageNation
            currentPage={currentPage}
            totalElements={roleList.length}
            size={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </section>
      </section>
    </main>
  );
};

export default SelectAccountPage;
