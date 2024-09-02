'use client';

import { useMyPageUpdate } from '@/api/profile/useMutation';
import { useUserInfoDataQuery } from '@/api/profile/useQuery';
import { useProfileUpdate } from '@/api/signup/useMutation';
import ProfileLayout from '@/components/atoms/profileLayout';
import MypageHeader from '@/components/molecules/mypageHeader';
import AccountInfo from '@/components/pages/accountInfo';
import PasswordChangeModal from '@/components/pages/profile/passwordChangeModal';
import PhoneChangeModal from '@/components/pages/profile/phoneChangeModal';
import RandomProfileModal from '@/components/pages/profile/randomProfileModal';

import RoleChangeModal from '@/components/pages/profile/roleChangeModal';
import ProgressModal from '@/components/pages/progressModal';
import UserInfo from '@/components/pages/userInfo';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

const Profile = () => {
  const { userData, isError, isPending } = useUserInfoDataQuery();
  const { deleteUserMutate } = useMyPageUpdate();
  const [modalType, setModalType] = useState<string | null>(null);
  const router = useRouter();

  const { email, username, profileImg, trackName, period, trackRole, phone } =
    userData?.data ?? '';
  const openModal = (type: string) => setModalType(type);
  const closeModal = () => setModalType(null);

  if (isError) {
    return <div>에러입니다.</div>;
  }

  if (isPending) {
    return (
      // <ProgressModal>
      //   <span>프로필을 불러오는 중</span>
      // </ProgressModal>
      <div>로딩중</div>
    );
  }

  const handleDelete = async () => {
    alert('진짜 회원탈퇴 하시겠습니까?');
    try {
      await deleteUserMutate.mutateAsync();
      router.push('/');
    } catch (error) {
      alert('회원탈퇴 실패');
    }
  };

  return (
    <>
      <MypageHeader />
      {/*프로필 */}
      <ProfileLayout variant="userInfo">
        <UserInfo
          profileImg={profileImg}
          username={username}
          trackName={trackName}
          period={period}
          trackRole={trackRole}
          handleChangeRole={() => openModal('role')}
          handleChangeImage={() => openModal('image')}
        />
      </ProfileLayout>
      <ProfileLayout variant="accountInfo">
        <AccountInfo
          email={email}
          phone={phone}
          handleChangePassword={() => openModal('password')}
          handleChangePhoneNumber={() => openModal('phone')}
        />
      </ProfileLayout>
      {modalType === 'password' && <PasswordChangeModal onClose={closeModal} />}
      {modalType === 'phone' && (
        <PhoneChangeModal onClose={closeModal} username={username} />
      )}
      {modalType === 'role' && (
        <RoleChangeModal onClose={closeModal} trackRole={trackRole} />
      )}
      {modalType === 'image' && (
        <RandomProfileModal onClose={closeModal} profileImg={profileImg} />
      )}
      {/*프로필 */}
      <button onClick={handleDelete}>
        <p className="text-gray-55 w-full text-right text-[18px] font-medium">
          회원 탈퇴
        </p>
      </button>
    </>
  );
};

export default Profile;
