import Link from 'next/link';

const MainHeader = () => {
  return (
    <header className="flex justify-between px-36">
      <Link href="/">
        <h1 className="text-md font-bold text-primary-400">
          르탄이의 아카이브
        </h1>
      </Link>
    </header>
  );
};

export default MainHeader;
