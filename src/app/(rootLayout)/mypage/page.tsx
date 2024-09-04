'use client';

import { useMyPageUpdate } from '@/api/mypage/useMutation';
import { useUserInfoDataQuery } from '@/api/mypage/useQuery';
import ProfileLayout from '@/components/atoms/profileLayout';
import MyPageHeader from '@/components/molecules/mypageHeader';
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

  return (
    <>
      <div className="mx-auto flex h-screen w-full flex-col items-center justify-center gap-[40px] bg-gray-50">
        <MyPageHeader />
        {/*프로필 */}
        <ProfileLayout variant="userInfo">
          <UserInfo
            profileImg={profileImg}
            username={username}
            trackName={trackName}
            period={period}
            trackRole={trackRole}
            nickname={nickname}
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
        {modalType === 'password' && (
          <PasswordChangeModal onClose={closeModal} />
        )}
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
        {trackRole === 'STUDENT' && (
          <button onClick={handleDelete} className="w-[1152px] border">
            <p className="text-right text-[18px] font-medium text-gray-55">
              회원 탈퇴
            </p>
          </button>
        )}
      </div>
    </>
  );
};

export default Profile;
