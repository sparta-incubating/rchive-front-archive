import { MyRoleDataType, trackRole } from '@/types/auth.types';

declare module 'next-auth' {
  // user 타입확장
  interface User {
    accessToken: string;
    refreshToken: string;
    trackId?: number;
    trackRole?: trackRole;
    trackName?: string;
    trackLabel?: string;
    loginPeriod?: number;
    roleApply?: boolean;
    roleError?: string;
    nickname?: string;
    username?: string;
    birth?: string;
    phone?: string;
    profileImg?: string;
    myRoles?: MyRoleDataType[];
    roleData?: boolean;
  }

  // session 타입확장
  interface Session {
    user: User;
    error?: string;
  }
}

declare module 'next-auth/jwt' {
  // jwt 타입확장
  interface JWT {
    accessToken: string;
    refreshToken: string;
    trackId?: number;
    trackRole?: trackRole;
    trackName?: TrackType;
    loginPeriod?: number;
    roleApply?: boolean;
    nickname?: string;
    username?: string;
    birth?: string;
    phone?: string;
    profileImg?: string;
    myRoles?: MyRoleDataType[];
    email: string;
    error?: 'tokenErrors';
  }
}
