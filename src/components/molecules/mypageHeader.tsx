const MyPageHeader = () => {
  return (
    <header className="mx-auto flex h-[100px] border-b-4 border-gray-50 bg-white px-[144px]">
      <h1 className="justify-content flex h-[102px] w-[128px] items-center p-[18px] text-xl font-normal hover:cursor-pointer">
        북마크 목록
      </h1>
      <h1 className="justify-content flex h-[102px] w-[128px] items-center border-b-2 border-gray-900 p-[18px] text-xl font-medium hover:cursor-pointer">
        프로필 관리
      </h1>
    </header>
  );
};

export default MyPageHeader;
