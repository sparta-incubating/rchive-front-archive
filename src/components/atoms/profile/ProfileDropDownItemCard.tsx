import ProfileImage from '@/components/atoms/profile/profileImage';
import ProfileRoleBadge from '@/components/atoms/profile/profileRoleBadge';

interface ProfileDropDownItemCardProps {
  profileImage: string;
  nickname: string;
  role: string;
  track: string;
  selected: boolean;
}

const ProfileDropDownItemCard = ({
  profileImage,
  nickname,
  role,
  track,
  selected,
}: ProfileDropDownItemCardProps) => {
  return (
    <div className="flex items-center gap-4">
      <ProfileImage imageUrl={profileImage} size="lg" />
      <div className="flex flex-col">
        <div className="flex gap-4">
          <span className="text-md font-medium text-gray-900">{nickname}</span>
          <ProfileRoleBadge variant={selected ? 'selected' : 'default'}>
            {role}
          </ProfileRoleBadge>
        </div>
        <span className="text-sm font-medium text-[#8D949A]">{track}</span>
      </div>
    </div>
  );
};

export default ProfileDropDownItemCard;
