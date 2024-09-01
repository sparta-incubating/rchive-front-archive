import { auth } from '@/auth';
import { client } from '@/utils/axios/clientAPI';

//프로필 조회
export const getProfile = async () => {
  const session = await auth();

  const trackName = session?.user.trackName;
  const loginPeriod = session?.user.loginPeriod;
  console.log(trackName, loginPeriod, '??????????????????????????????????');

  try {
    const res = await client.get(
      `/apis/v1/profile?trackName=${trackName}&period=${loginPeriod}`,
    );
    return res.data;
  } catch (error) {
    throw new Error('프로필 조회에 실패했습니다. 다시 시도해주세요');
  }
};
