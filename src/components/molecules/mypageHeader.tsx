'use client';

import { useRouter } from 'next/navigation';

interface MyPageHeaderProps {
  isActive: string;
  setIsActive: React.Dispatch<React.SetStateAction<string>>;
}

const MyPageHeader = ({ isActive, setIsActive }: MyPageHeaderProps) => {
  const router = useRouter();

  const handleProfileClick = () => {
    setIsActive('프로필 관리');
    router.push('/mypage');
  };

  const handleBookmarkClick = () => {
    setIsActive('북마크 관리');
    router.push('/bookmark');
  };

  return (
    <header className="z-0 mx-auto flex h-[100px] w-full justify-center bg-white px-[144px] shadow-myPageBottomShadow">
      <button
        className={`justify-content flex w-[128px] items-center p-[18px] text-xl ${isActive === '북마크 관리' ? 'border-b-2 border-gray-900 font-semibold' : 'font-normal text-gray-400'}`}
        onClick={handleBookmarkClick}
      >
        북마크 목록
      </button>
      <button
        className={`justify-content flex w-[128px] items-center p-[18px] text-xl ${isActive === '프로필 관리' ? 'border-b-2 border-gray-900 font-semibold' : 'font-normal text-gray-400'}`}
        onClick={handleProfileClick}
      >
        프로필 관리
      </button>
    </header>
  );
};
export default MyPageHeader;
