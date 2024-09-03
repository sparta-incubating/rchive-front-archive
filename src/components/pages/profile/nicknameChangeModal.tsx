import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';

import { ChangeModalProps } from '@/types/profile.types';
import {
  profileNicknameSchema,
  profilePasswordSchema,
} from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangeSuccessModal from './changeSuccessModal';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { useMyPageUpdate } from '@/api/mypage/useMutation';

const NicknameChangeModal = ({ onClose }: ChangeModalProps) => {
  const [pwErrorMsg, setpwErrorMsg] = useState<string>('');
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof profileNicknameSchema>>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(profileNicknameSchema),
    defaultValues: {
      nickname: '',
    },
  });

  const { updatePasswordMutate } = useMyPageUpdate();

  const onSubmit = async (data: z.infer<typeof profileNicknameSchema>) => {
    try {
      // await updatePasswordMutate.mutateAsync(data);
      console.log(data);
      setIsSuccessful(true);
    } catch (error) {
      setpwErrorMsg('비밀번호가 일치하지 않습니다.');
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isSuccessful ? (
          <ProfileChangeForm
            labels={{
              main: '닉네임 변경하기',
              sub: '',
            }}
            onClose={onClose}
            isValid={isValid}
          >
            <section>
              <InputContainer>
                <InputField>
                  <Label htmlFor="originPassword">새 닉네임</Label>
                  <Input
                    {...register('nickname')}
                    placeholder="닉네임 입력"
                    type="nickname"
                    className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                  />
                </InputField>
              </InputContainer>
              <span className="text-sm text-primary-400">
                {errors.nickname?.message}
              </span>
            </section>
          </ProfileChangeForm>
        ) : (
          <ChangeSuccessModal label="닉네임 변경" onClose={onClose} />
        )}
      </form>
    </>
  );
};

export default NicknameChangeModal;
