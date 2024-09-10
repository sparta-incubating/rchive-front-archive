import MyPageHeader from '@/components/molecules/mypageHeader';
import MainPage from '@/components/pages/mainPage';
import MyProfile from '@/components/pages/myProfile';
import React from 'react';

const MyPage = () => {
  return (
    <MainPage>
      <MyPageHeader />
      <MyProfile />
    </MainPage>
  );
};

export default MyPage;
