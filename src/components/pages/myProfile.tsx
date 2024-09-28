'use client';

import AccountInfo from '@/components/pages/accountInfo';
import NicknameChangeModal from '@/components/pages/profile/nicknameChangeModal';
import PasswordChangeModal from '@/components/pages/profile/passwordChangeModal';
import PhoneChangeModal from '@/components/pages/profile/phoneChangeModal';
import RandomProfileModal from '@/components/pages/profile/randomProfileModal';

import RoleChangeModal from '@/components/pages/profile/roleChangeModal';

import UserInfo from '@/components/pages/userInfo';
import { useMyPageUpdate } from '@/hooks/useMutation';
import { useUserInfoDataQuery } from '@/hooks/useQuery';
import { useRouter } from 'next/navigation';

import { useState } from 'react';
import ProgressModal from './progressModal';

const MyProfile = () => {
  const { userData, isError, isPending } = useUserInfoDataQuery();
  const { deleteUserMutate } = useMyPageUpdate();
  const [modalType, setModalType] = useState<string | null>(null);
  const router = useRouter();

  const {
    email,
    username,
    profileImg,
    trackName,
    period,
    trackRole,
    phone,
    nickname,
  } = userData?.data ?? '';
  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  //수정 예정
  const handleDelete = async () => {
    alert('진짜 회원탈퇴 하시겠습니까?');
    try {
      await deleteUserMutate.mutateAsync();
      router.push('/');
    } catch (error) {
      alert('회원탈퇴 실패');
    }
  };

  if (isError) {
    return <div>에러입니다.</div>;
  }

  if (isPending) {
    return <div>대기중입니다.</div>;
  }
  return (
    <div className="mx-auto flex h-screen w-full flex-col items-center gap-[40px] bg-gray-50 py-[56px]">
      {/*프로필 */}
      <h1 className="w-[1151px] text-3xl font-semibold">프로필 관리</h1>
      {/*회원 정보 */}
      <UserInfo
        profileImg={profileImg}
        username={username}
        trackName={trackName.value}
        period={period}
        trackRole={trackRole}
        nickname={nickname}
        handleChangeRole={() => openModal('role')}
        handleChangeImage={() => openModal('image')}
        handleChangeNickname={() => openModal('nickname')}
      />
      {/*계정 정보 */}
      <AccountInfo
        email={email}
        phone={phone}
        handleChangePassword={() => openModal('password')}
        handleChangePhoneNumber={() => openModal('phone')}
      />
      {/*모달 */}
      {modalType === 'password' && <PasswordChangeModal onClose={closeModal} />}
      {modalType === 'phone' && (
        <PhoneChangeModal onClose={closeModal} username={username} />
      )}
      {modalType === 'role' && (
        <RoleChangeModal onClose={closeModal} trackRole={trackRole} />
      )}
      {modalType === 'image' && (
        <RandomProfileModal
          onClose={closeModal}
          profileImg={profileImg}
          trackRole={trackRole}
        />
      )}

      {modalType === 'nickname' && <NicknameChangeModal onClose={closeModal} />}
      {/*회원탈퇴 */}
      {trackRole === 'STUDENT' && (
        <button
          onClick={handleDelete}
          className="w-[1152px] text-right text-[18px] font-medium text-gray-55"
        >
          회원 탈퇴
        </button>
      )}
    </div>
  );
};

export default MyProfile;
