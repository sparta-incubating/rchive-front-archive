'use client';

import Button from '../atoms/button';
import Modal from '../atoms/modal';
import SignupHeader from '../molecules/signupHeader';
import { useModalContext } from '@/context/useModalContext';

const SignUpCompleteModal = () => {
  const { close } = useModalContext();
  return (
    <Modal inboardClassName="w-[520px]">
      <div className="my-7 w-full px-7">
        <SignupHeader />
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <span className="text-xl font-medium">
            회원가입이 완료되었습니다.
          </span>
          <Button variant="primary" className="w-[360px]" onClick={close}>
            확인
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpCompleteModal;
