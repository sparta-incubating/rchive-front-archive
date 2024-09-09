'use client';

import refresh from '@/../public/assets/icons/refresh-button.svg';
import { useMyPageUpdate } from '@/api/mypage/useMutation';

import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import {
  RANDOM_MANAGER_IMAGES,
  RANDOM_USER_IMAGES,
} from '@/constatns/mypage.constant';

import { RandomProfileModalProps } from '@/types/profile.types';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const RandomProfileModal = ({
  onClose,
  profileImg,
  trackRole,
}: RandomProfileModalProps) => {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [initImg, setInitImg] = useState<string>(profileImg);
  const [selectImg, setSelectImg] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const randomManager = RANDOM_MANAGER_IMAGES;
  const randomUser = RANDOM_USER_IMAGES;

  const { updateProfileInfoMutate } = useMyPageUpdate();

  const handleRandomImg = () => {
    setSelectImg(
      (prevSelectImg) =>
        (prevSelectImg + 1) %
        (trackRole === 'STUDENT' ? randomUser.length : randomManager.length),
    );
    setIsValid(true);
  };

  const profileInfo = {
    profileImg: initImg,
  };

  const onSubmit = async () => {
    try {
      updateProfileInfoMutate.mutate(profileInfo);
    } catch (error) {
      setErrorMessage('프로필 변경에 실패했습니다.');
    }
  };

  useEffect(() => {
    if (trackRole === 'STUDENT') {
      setInitImg(randomUser[selectImg]);
    } else {
      setInitImg(randomManager[selectImg]);
    }
  }, [selectImg, trackRole, randomManager, randomUser]);

  return (
    <>
      <form onSubmit={onSubmit}>
        <ProfileChangeForm
          labels={{
            main: '랜덤 프로필 변경',
            sub: '원하시는 프로필로 변경해 보세요.',
          }}
          onClose={onClose}
          isValid={isValid}
        >
          <figure>
            <Image
              src={`/assets/icons/${initImg}.svg`}
              height={160}
              width={160}
              alt="랜덤프로필"
            />
          </figure>
          {/* 리프레시버튼 */}
          <button onClick={handleRandomImg} type="button">
            <div className="flex h-[18px] flex-row justify-center gap-[4px]">
              <Image src={refresh} width={16} height={16} alt="리프레시 버튼" />
              <p className="text-xs text-gray-400">랜덤 프로필 설정</p>
            </div>
          </button>
          {/* 리프레시버튼 */}
          <span className="text-sm text-primary-400">{errorMessage}</span>
        </ProfileChangeForm>
      </form>
    </>
  );
};

export default RandomProfileModal;
