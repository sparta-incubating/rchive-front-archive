import { useProfileUpdate } from '@/api/profile/useMutation';
import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import PasswordContainer from '@/components/atoms/PasswordContainer';
import InputField from '@/components/molecules/InputField';

import { ChangeModalProps } from '@/types/profile.types';
import { profilePasswordSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangeSuccessModal from './changeSuccessModal';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';

const PasswordChangeModal = ({ onClose }: ChangeModalProps) => {
  const [pwErrorMsg, setpwErrorMsg] = useState<string>('');
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<z.infer<typeof profilePasswordSchema>>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(profilePasswordSchema),
    defaultValues: {
      originPassword: '',
      newPassword: '',
      passwordConfirm: '',
    },
  });

  const { updatePasswordMutate } = useProfileUpdate();

  const onSubmit = async (data: z.infer<typeof profilePasswordSchema>) => {
    try {
      await updatePasswordMutate.mutateAsync(data);
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
              main: '비밀번호 변경하기',
              sub: '',
            }}
            onClose={onClose}
            isValid={isValid}
          >
            <section>
              <InputContainer>
                <InputField>
                  <Label htmlFor="originPassword">현재 비밀번호</Label>
                  <Input
                    {...register('originPassword')}
                    placeholder="현재 비밀번호 입력"
                    type="password"
                    className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                  />
                </InputField>
              </InputContainer>
              <span className="text-sm text-primary-400">
                {errors.originPassword?.message || pwErrorMsg}
              </span>
            </section>
            <section>
              <PasswordContainer>
                <InputField variant="secondary">
                  <Label htmlFor="newPassword">새 비밀번호</Label>
                  <Input
                    {...register('newPassword')}
                    type="password"
                    placeholder="6자 이상, 숫자와 영문자 조합"
                    className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                  />
                </InputField>
                <div className="border" />
                <Input
                  {...register('passwordConfirm')}
                  type="password"
                  placeholder="비밀번호 재입력"
                  className="my-[28px] h-[20px] w-[320px] bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                />
              </PasswordContainer>
              {errors.passwordConfirm && (
                <span className="text-sm text-primary-400">
                  {errors.passwordConfirm.message}
                </span>
              )}
            </section>
          </ProfileChangeForm>
        ) : (
          <ChangeSuccessModal label="비밀번호 변경" onClose={onClose} />
        )}
      </form>
    </>
  );
};

export default PasswordChangeModal;
