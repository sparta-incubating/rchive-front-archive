'use client';

import Button from '@/components/atoms/button';
import SelectAccountPage from '@/components/pages/selectAccountPage';
import { signOut } from 'next-auth/react';
import React from 'react';

const Wait = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login', redirect: true });
  };
  return (
    <div>
      <p>테스트용 페이지</p>
      <p>apm이나 pm 승인이 안되면 아카이브 로그인 막기</p>
      <Button onClick={handleLogout} variant="submit">
        로그아웃
      </Button>
      <SelectAccountPage />
    </div>
  );
};

export default Wait;
