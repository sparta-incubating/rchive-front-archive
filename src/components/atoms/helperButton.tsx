import { ComponentProps } from 'react';
import Image from 'next/image';

const HelperButton = ({ ...props }: ComponentProps<'button'>) => {
  return (
    <div className="fixed bottom-[225px] right-[60px]">
      <button
        className="relative flex w-[117px] items-center rounded-[38px] border border-primary-400 bg-white px-6 py-2"
        {...props}
      >
        <span className="text-sm font-semibold text-primary-400">문의하기</span>
        <div className="absolute -right-[20px] bottom-0">
          <div className="relative h-[59px] w-[56px]">
            <Image
              src={'/assets/icons/questionIcon.svg'}
              alt={'질문 버튼 아이콘'}
              fill
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default HelperButton;
