import MyPageHeader from '@/components/molecules/myPageHeader';
import BookMarkPage from '@/components/pages/bookMarkPage';
import MainPage from '@/components/pages/mainPage';
import React from 'react';

const BookMark = () => {
  return (
    <MainPage>
      <MyPageHeader />
      <BookMarkPage />
    </MainPage>
  );
};

export default BookMark;
