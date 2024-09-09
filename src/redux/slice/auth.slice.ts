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
  email: string;
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
  email: '',
};

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<authInitialType>) => {
      state.accessToken = action.payload.accessToken;
      state.trackName = action.payload.trackName;
      state.trackRole = action.payload.trackRole;
      state.period = action.payload.period;
      state.nickname = action.payload.nickname;
      state.username = action.payload.username;
      state.birth = action.payload.birth;
      state.profileImg = action.payload.profileImg;
      state.myRoles = action.payload.myRoles;
      state.email = action.payload.email;
    },
  },
});

export const { setAuth } = AuthSlice.actions;
export const selectAuth = (state: RootState) => state;
export default AuthSlice.reducer;
