import { auth } from '@/auth';
import RoleSelectForm from '@/components/organisms/roleSelectForm';
import RoleContainerPage from '@/components/pages/roleContainerPage';
import RoleWait from '@/components/pages/roleResult/roleWait';
import { RoleResultEnum } from '@/types/role.types';
import { isAPMEmail } from '@/utils/utils';
import { serverAxios } from '@/utils/axios/serverAxios';

const RoleResultPage = async () => {
  const session = await auth();
  const email = session?.user.email;
  const trackRole = isAPMEmail(String(email)) ? 'APM' : 'STUDENT';

  // 권한 신청 결과 조회 endpoint
  const getRoleApplyResult = async () => {
    try {
      const response = await serverAxios.get('/apis/v1/role/result');

      return response.data.data;
    } catch (error) {
      throw new Error('권한 신청 결과 조회에 실패했습니다.');
    }
  };
  const roleApplyResult = await getRoleApplyResult();

  return (
    <>
      {trackRole === 'STUDENT' ? (
        <RoleContainerPage>
          <section className="m-auto flex h-[577px] w-[520px] flex-col items-center justify-center gap-5 rounded-[12px] bg-white pb-7 pt-5">
            {roleApplyResult === RoleResultEnum.WAIT && (
              <>
                <span className="text-center text-xl font-medium text-gray-900">
                  현재 승인대기 상태입니다.
                </span>
                <RoleWait />
              </>
            )}

            {roleApplyResult === RoleResultEnum.REJECT && (
              <RoleSelectForm trackRole={trackRole}>
                <span className="text-center text-xl font-medium text-gray-900">
                  승인이 거절되었습니다.
                </span>
                <span className="text-sm text-gray-900">
                  해당하는 트랙과 기수를 다시 선택해주세요.
                </span>
              </RoleSelectForm>
            )}

            {roleApplyResult === RoleResultEnum.APPROVE && (
              <>
                <span className="text-center text-xl font-medium text-gray-900">
                  가입 승인이 완료되었습니다.
                </span>
                <RoleWait />
              </>
            )}
          </section>
        </RoleContainerPage>
      ) : (
        <RoleContainerPage>
          <section className="m-auto flex w-[520px] flex-col items-center gap-5 rounded-[12px] bg-white pb-7 pt-5">
            {(roleApplyResult === RoleResultEnum.REJECT ||
              roleApplyResult === RoleResultEnum.WAIT) && (
              <div className="flex w-[520px] flex-col items-center gap-5 rounded-[12px] bg-white pb-7 pt-14">
                <span className="text-center text-xl font-medium text-gray-900">
                  백오피스에 문의하세요.
                </span>
                <RoleWait />
              </div>
            )}
          </section>
        </RoleContainerPage>
      )}
    </>
  );
};

export default RoleResultPage;
