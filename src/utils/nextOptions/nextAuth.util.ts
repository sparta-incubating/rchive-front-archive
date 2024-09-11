import { auth, signOut } from '@/auth';
import { trackRole } from '@/types/auth.types';

export const serverSession = async () => {
  const session = await auth();

  const period = session?.user.loginPeriod as number;
  const trackName = session?.user.trackName as string;
  const trackLabel = session?.user.trackLabel as string;
  const trackRole = session?.user.trackRole as trackRole;
  const trackId = session?.user.trackId as number;
  const accessToken = session?.user.accessToken as string;
  const refreshToken = session?.user.refreshToken as string;

  return {
    period,
    trackName,
    trackLabel,
    trackRole,
    trackId,
    accessToken,
    refreshToken,
  };
};

export const updateAccessToken = async (accessToken: string) => {
  const session = await auth();

  if (session && session.user) {
    session.user.accessToken = accessToken;
  }

  return session;
};

export const logout = async () => {
  'use server';
  await signOut();
};
