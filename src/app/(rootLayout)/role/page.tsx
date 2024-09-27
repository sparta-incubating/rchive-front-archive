import RoleSelectForm from '@/components/organisms/roleSelectForm';
import RoleContainerPage from '@/components/pages/roleContainerPage';
import { TRACK_ROLE } from '@/constatns/signup.constant';

const RolePage = () => {
  return (
    <RoleContainerPage>
      <RoleSelectForm trackRole={TRACK_ROLE}>
        <span className="text-center text-xl font-medium text-gray-900">
          트랙 및 기수 선택
        </span>
      </RoleSelectForm>
    </RoleContainerPage>
  );
};

export default RolePage;
