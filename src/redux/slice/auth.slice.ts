import { RootState } from '@/redux/storeConfig';
import { MyRoleDataType, trackRole } from '@/types/auth.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authInitialType {
  accessToken: string;
  trackName: string;
  trackLabel: string;
  trackRole: trackRole;
  period: string;
  nickname: string;
  username: string;
  birth: string;
  profileImg: string;
  myRoles: MyRoleDataType[];
  roleData: boolean;
  email: string;
}

const initialState: authInitialType = {
  accessToken: '',
  trackName: '' as string,
  trackLabel: '' as string,
  trackRole: '' as trackRole,
  period: '0',
  nickname: '',
  username: '',
  birth: '',
  profileImg: '',
  myRoles: [],
  roleData: false,
  email: '',
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<authInitialType>) => {
      state.accessToken = action.payload.accessToken;
      state.trackName = action.payload.trackName;
      state.trackLabel = action.payload.trackLabel;
      state.trackRole = action.payload.trackRole;
      state.period = action.payload.period;
      state.nickname = action.payload.nickname;
      state.username = action.payload.username;
      state.birth = action.payload.birth;
      state.profileImg = action.payload.profileImg;
      state.myRoles = action.payload.myRoles;
      state.roleData = action.payload.roleData;
      state.email = action.payload.email;
    },
  },
});

export const { setAuth } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state;
export default AuthSlice.reducer;
