export type trackRole = 'PM' | 'APM' | 'ADMIN' | 'STUDENT' | 'TUTOR' | '';

export type LastConnectRoleDataType = {
  trackId: number;
  trackRole: trackRole;
  trackName: string;
  trackLabel: string;
  period: number;
};
export type LastConnectRoleResponseType = {
  status: number;
  message: string;
  data: LastConnectRoleDataType;
};
export type MyRoleResponse = {
  status: number;
  data: {
    roleResList: MyRoleDataType;
    nickname?: string;
    profileImg: string;
  };
};

export type MyRoleDataType = {
  trackId: number;
  trackRoleEnum: trackRole;
  trackName: string;
  trackLabel: string;
  period: number;
};

export type SelectProfileRole = {
  trackId: number;
  trackRoleEnum: string;
  trackName: string;
  trackLabel: string;
  period: number;
};
