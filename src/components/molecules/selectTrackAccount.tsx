'use client';

import { useGetRoleQuery } from '@/api/profile/useQuery';
import { useState } from 'react';

type RoleList = {
  trackId: number;
  trackRoleEnum: string;
  trackName: string;
  period: number;
};

type SelectTrackAccountProps = {
  onGetId: (id: number) => void; // 부모로 전달할 콜백 함수 타입 정의
};

const SelectTrackAccount = ({ onGetId }: SelectTrackAccountProps) => {
  const { data, isPending, isError } = useGetRoleQuery();
  const [clickedId, setClickedId] = useState<number | null>(null);

  if (isPending) {
    return <div>로딩중</div>;
  }

  const roleList = data?.data?.roleResList;
  console.log(data);
  console.log(roleList, '프로필 조회');

  const handleClick =
    (id: number) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault(); // 선택적: 기본 동작 방지
      setClickedId(id);
      onGetId(id); // 부모 컴포넌트로 ID 전달
    };

  return (
    <>
      <main className="w-full border py-[100px]">
        {/*계정 랩 */}
        <div className="h-[202px] border px-[40px]">
          {/*계정  선택랩*/}
          <div className="flex grid h-full grid-cols-3 justify-center gap-[78px] border px-[40px]">
            {/*계정 */}
            {roleList.map((items: RoleList) => (
              <button key={items.trackId} onClick={handleClick(items.trackId)}>
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
            {/*계정 */}
          </div>
          {/*계정  */}
        </div>
        {/*계정 랩 */}
      </main>
    </>
  );
};

export default SelectTrackAccount;
