import Input from '@/components/atoms/input';
import InputContainer from '@/components/atoms/InputContainer';
import Label from '@/components/atoms/label';
import InputField from '@/components/molecules/InputField';

import { ChangeModalProps } from '@/types/profile.types';
import { profileNicknameSchema } from '@/validators/auth/profile.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ChangeSuccessModal from './changeSuccessModal';
import ProfileChangeForm from '@/components/organisms/profileChangeForm';
import { useMyPageUpdate } from '@/api/mypage/useMutation';

const NicknameChangeModal = ({ onClose }: ChangeModalProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
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

  const { updateNicknameMutate } = useMyPageUpdate();

  const onSubmit = async (data: z.infer<typeof profileNicknameSchema>) => {
    try {
      await updateNicknameMutate.mutateAsync(data.nickname);
      setIsSuccessful(true);
    } catch (error) {
      setErrorMessage('이미 사용 중인 닉네임입니다.');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {!isSuccessful ? (
          <ProfileChangeForm
            labels={{
              main: '닉네임 변경',
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
                {errors.nickname?.message || errorMessage}
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
