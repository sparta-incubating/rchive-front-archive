import Image from 'next/image';
import { PropsWithChildren } from 'react';

const EmptyPage = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full min-h-[594px] w-[1152px]">
      <section className="m-auto flex flex-col items-center">
        <div className="relative h-52 w-52">
          <Image src={'/assets/icons/noDataRtan.png'} alt={'noDataRtan'} fill />
        </div>
        <span className="text-center text-lg font-semibold">
          “{children}”에 관련된 자료가 없어요.
        </span>
      </section>
    </div>
  );
};

export default EmptyPage;
