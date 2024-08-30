import profile from '@/../public/assets/icons/select-profile.svg';
import Image from 'next/image';

const SelectTrackHeader = () => {
  return (
    <main className="flex h-[154px] w-full items-center justify-center rounded-t-[40px] bg-blue-55 px-[10px] py-[40px]">
      {/*헤더 랩*/}
      <article className="flex h-[99px] w-[1077px] items-center gap-[20px]">
        {/*헤더 이미지*/}
        <figure className="h-[84px] w-[84px]">
          <Image src={profile} width={84} height={84} alt="프로필" />
        </figure>
        {/*헤더 이미지*/}

        {/*헤더 텍스트 */}
        <p className="flex flex-col">
          <span className="text-2xl font-bold leading-8 text-secondary-600">
            계정 선택
          </span>
          <span className="text-base font-medium">안녕하세요 000님</span>
          <span className="text-base font-medium">
            아카이빙을 시작할 계정을 선택하세요.
          </span>
        </p>
        {/*헤더 텍스트 */}
      </article>
      {/*헤더 랩*/}
    </main>
  );
};

export default SelectTrackHeader;
