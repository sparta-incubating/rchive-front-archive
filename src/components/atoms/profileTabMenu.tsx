import Link from 'next/link';
import { usePathname } from 'next/navigation';

const ProfileTabMenu = () => {
  const pathname = usePathname();

  const isBookmarkActive = pathname.startsWith('/bookmark');
  const isProfileActive = pathname.startsWith('/mypage');

  return (
    <header className="z-0 mx-auto flex h-[100px] w-full justify-center bg-white px-[144px] shadow-myPageBottomShadow">
      <section
        className={`justify-content flex w-[128px] items-center p-[18px] text-xl ${isBookmarkActive ? 'border-b-2 border-gray-900 font-semibold' : 'font-normal text-gray-400'}`}
      >
        <Link href="/bookmark">북마크 목록</Link>
      </section>
      <section
        className={`justify-content flex w-[128px] items-center p-[18px] text-xl ${isProfileActive ? 'border-b-2 border-gray-900 font-semibold' : 'font-normal text-gray-400'}`}
      >
        <Link href="/mypage">프로필 관리</Link>
      </section>
    </header>
  );
};

export default ProfileTabMenu;
