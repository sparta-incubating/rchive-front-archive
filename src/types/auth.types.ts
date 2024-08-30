import { TrackType } from './posts.types';

export type trackRole = 'PM' | 'APM' | 'ADMIN' | 'STUDENT' | 'TUTOR' | '';

export type LastConnectRoleDataType = {
  trackId: number;
  trackRole: trackRole;
  trackName: TrackType;
  period: number;
};
export type LastConnectRoleResponseType = {
  status: number;
  message: string;
  data: LastConnectRoleDataType;
};
