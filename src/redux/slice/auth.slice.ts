import { RootState } from '@/redux/storeConfig';
import { MyRoleDataType, trackRole } from '@/types/auth.types';
import { TrackType } from '@/types/posts.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface authInitialType {
  accessToken: string;
  trackName: TrackType;
  trackRole: trackRole;
  period: string;
  nickname: string;
  username: string;
  birth: string;
  profileImg: string;
  myRoles: MyRoleDataType[];
}

const initialState: authInitialType = {
  accessToken: '',
  trackName: '' as TrackType,
  trackRole: '' as trackRole,
  period: '0',
  nickname: '',
  username: '',
  birth: '',
  profileImg: '',
  myRoles: [],
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<Partial<authInitialType>>) => {
      state.accessToken = action.payload.accessToken ?? state.accessToken;
      state.trackName = action.payload.trackName ?? state.trackName;
      state.trackRole = action.payload.trackRole ?? state.trackRole;
      state.period = action.payload.period ?? state.period;
      state.nickname = action.payload.nickname ?? state.nickname;
      state.username = action.payload.username ?? state.username;
      state.birth = action.payload.birth ?? state.birth;
      state.profileImg = action.payload.profileImg ?? state.profileImg;
      state.myRoles = action.payload.myRoles ?? state.myRoles;
    },
  },
});

export const { setAuth } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state;
export default AuthSlice.reducer;
