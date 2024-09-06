import Link from 'next/link';
import HeaderProfileContainer from '@/components/molecules/profile/headerProfileContainer';

const MainHeader = () => {
  return (
    <header className="flex h-[68px] items-center justify-between">
      <Link href="/">
        <h1 className="text-md font-bold text-primary-400">
          르탄이의 아카이브
        </h1>
      </Link>

      <HeaderProfileContainer />
    </header>
  );
};

export default MainHeader;
