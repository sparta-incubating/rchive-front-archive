import {
  getAllMyRoles,
  getLastConnectRole,
  getMyProfile,
  getRoleApplyStatus,
  getRoleInfo,
} from '@/api/server/authApi';
import { authConfig } from '@/auth.config';
import {
  MyRoleDataType,
  RoleResponseType,
  trackRole,
} from '@/types/auth.types';

import NextAuth from 'next-auth';
import axiosAPI from './utils/axios/axiosAPI';

export const { handlers, auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;

        // 여기서 추가 정보를 가져옵니다
        try {
          // 이때는 session이 없으므로 token 직접 주입
          const response = await getLastConnectRole(user.accessToken);

          const { trackId, trackRole, trackName, period } = response.data.data;
          token.trackId = trackId;
          token.trackRole = trackRole;
          token.trackName = trackName.key;
          token.trackLabel = trackName.value;
          token.loginPeriod = period;

          // 프로필 조회
          const profileResponse = await getMyProfile(
            trackName.key,
            trackRole === 'PM' ? 0 : period,
            user.accessToken,
          );

          token.username = profileResponse?.data.data.username;
          token.birth = profileResponse?.data.data.birth;
          token.phone = profileResponse?.data.data.phone;
          token.profileImg = profileResponse?.data.data.profileImg;
          token.email = profileResponse?.data.data.email;

          const myRoleResponse = await getAllMyRoles(user.accessToken);
          token.myRole = myRoleResponse?.data.data.roleResList;
          token.roleData = false;
        } catch (error) {
          // 권한이 없을때
          // 권한 신청이 있는지 조회
          // 여기도 마찬가지로 session이 없음.
          const roleInfo = await getRoleInfo<RoleResponseType>(
            user.accessToken,
          );

          if (roleInfo.data.data.roleResList.length > 0) {
            //여기가 권한이 있다.
            const { data: roleData } = roleInfo.data;
            token.trackRole = roleData.roleResList[0].trackRoleEnum;
            token.roleData = true;
            const myRoleResponse = await getAllMyRoles(user.accessToken);
            token.myRole = myRoleResponse?.data.data.roleResList;
          } else {
            //권한이없다.
            const roleResponse = await getRoleApplyStatus(user.accessToken);
            const { data } = roleResponse.data;
            token.roleApply = data;
            token.roleData = false;
          }
        }
      }

      // update 함수 호출시 실행되는 부분
      if (trigger === 'update' && session) {
        token = {
          ...token,
          accessToken: session.user.accessToken,
          sub: session.user.accessToken,
          refreshToken: session.user.refreshToken,
          trackRole: session.user.trackRole,
          trackName: session.user.trackName,
          trackLabel: session.user.trackLabel,
          loginPeriod: session.user.loginPeriod,
          username: session.user.username,
          birth: session.user.birth,
          phone: session.user.phone,
          profileImg: session.user.profileImg,
          myRole: [...session.user.myRoles],
          email: session.user.email,
          roleData: session.user.roleData,
        };

        return token;
      }

      return token;
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.user.roleError = token.roleError as string | undefined;
      session.user.trackId = token.trackId as number;
      session.user.trackRole = token.trackRole as trackRole;
      session.user.trackName = token.trackName as string;
      session.user.trackLabel = token.trackLabel as string;
      session.user.loginPeriod = token.loginPeriod as number;
      session.user.roleApply = token.roleApply as boolean;
      session.user.nickname = token.nickname as string;
      session.user.username = token.username as string;
      session.user.birth = token.birth as string;
      session.user.profileImg = token.profileImg as string;
      session.user.myRoles = token.myRole as MyRoleDataType[];
      session.user.email = token.email as string;
      session.user.roleData = token.roleData as boolean;

      return session;
    },
  },
  events: {
    async signOut(token) {
      let refreshToken;
      let accessToken;
      if (
        'session' in token &&
        token.session &&
        'refreshToken' in token.session
      ) {
        refreshToken = token.session.refreshToken;
      } else if (
        'token' in token &&
        token.token &&
        'refreshToken' in token.token
      ) {
        refreshToken = token.token.refreshToken;
      }

      if (
        'session' in token &&
        token.session &&
        'accessToken' in token.session
      ) {
        accessToken = token.session.accessToken;
      } else if (
        'token' in token &&
        token.token &&
        'accessToken' in token.token
      ) {
        accessToken = token.token.accessToken;
      }

      await axiosAPI.delete('/apis/v1/users/logout', {
        headers: {
          Cookie: `Refresh=${refreshToken}`,
          Authorization: `Bearer ${accessToken}`,
        },
      });
    },
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name:
        process.env.NEXT_PUBLIC_RUN_MODE === 'production'
          ? `__Secure-next-auth.session-token.archive`
          : `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      },
    },
  },
});
