'use client';

import Button from '@/components/atoms/button';

import SelectAccountPage from '@/components/pages/selectAccountPage';
import { signOut } from 'next-auth/react';

const Wait = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login', redirect: true });
  };

  return <SelectAccountPage />;
};

export default Wait;
