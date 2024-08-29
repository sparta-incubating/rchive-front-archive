export type trackRole = 'PM' | 'APM' | 'USER';

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

export type TrackType =
  | ''
  | 'UNITY'
  | 'NODEJS'
  | 'SPRING_JAVA'
  | 'SPRING_KOTLIN'
  | 'REACT'
  | 'AI'
  | 'ANDROID'
  | 'IOS'
  | 'DATA'
  | 'UXUI'
  | 'SPRING_DEEP';
