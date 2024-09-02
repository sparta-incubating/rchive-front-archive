import { LastConnectRoleDataType, trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';

declare module 'next-auth' {
  // user 타입확장
  interface User {
    accessToken: string;
    refreshToken: string;
    trackId?: number;
    trackRole?: trackRole;
    trackName?: TrackType;
    loginPeriod?: number;
    roleApply?: boolean;
    roleError?: string;
    nickname?: string;
    myRoles?: LastConnectRoleDataType[];
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
    error?: 'tokenErrors';
  }
}
