'use client';

import bookmark from '@/../public/assets/icons/bookmark.svg';
import dashboard from '@/../public/assets/icons/dashboard.svg';
import comment from '@/../public/assets/icons/comment.svg';
import lecture from '@/../public/assets/icons/lecture.svg';
import search from '@/../public/assets/icons/search.svg';
import rtan from '@/../public/assets/icons/signin-rtan.svg';

import { useModalContext } from '@/context/useModalContext';
import { setAuth } from '@/redux/slice/auth.slice';
import { useAppDispatch } from '@/redux/storeConfig';
import { signupModalType } from '@/types/signup.types';
import { loginSchema } from '@/validators/auth/login.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, useSession } from 'next-auth/react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../atoms/button';
import FormSpan from '../atoms/formSpan';
import Input from '../atoms/input';
import InputContainer from '../atoms/InputContainer';
import Label from '../atoms/label';
import InputField from '../molecules/InputField';
import SignupModal from './signupModal';

const SignIn = () => {
  const [signInError, setSignInError] = useState<string>('');
  const { data: session } = useSession();

  const { open } = useModalContext();
  const dispatch = useAppDispatch();
  const handleSignupModalOpen = () => {
    open(<SignupModal signupModalType={signupModalType.USER} />, false);
  };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const result = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setSignInError(
        '가입되지 않은 이메일이거나 비밀번호가 일치하지 않습니다.',
      );
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (session) {
      const { trackName, trackRole, accessToken, loginPeriod } = session.user;
      dispatch(
        setAuth({
          accessToken,
          trackName: trackName || '',
          trackRole: trackRole || 'USER',
          period: String(loginPeriod) || '',
        }),
      );

      router.push('/');
    }
  }, [dispatch, router, session]);

  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          className="flex w-[500px] items-center justify-center"
        >
          <div className="flex w-full flex-col items-center justify-center py-[148px]">
            <div className="flex w-full items-center justify-center pb-[20px]">
              <figure>
                <Image src={rtan} height={154} width={154} alt="르탄이" />
              </figure>
            </div>
            <div className="flex h-[32px] w-full items-center justify-center pb-[20px] pt-[36px]">
              <p className="text-2xl font-bold">르탄이의 아카이브</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center pt-[20px]">
              <section className="mx-auto">
                {/*이메일*/}
                <InputContainer>
                  <InputField>
                    <Label htmlFor="username">이메일</Label>
                    <Input
                      {...register('username')}
                      placeholder="ex.123@email.com"
                      className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                    />
                  </InputField>
                </InputContainer>
                <span className="flex h-[20px] text-sm text-primary-400">
                  {errors.username?.message}
                </span>
              </section>

              <section className="mx-auto">
                {/*비밀번호*/}
                <InputContainer>
                  <InputField>
                    <Label htmlFor="password">비밀번호</Label>
                    <Input
                      {...register('password')}
                      placeholder="비밀번호 입력"
                      type="password"
                      className="bold h-[20px] w-full bg-blue-50 text-sm font-medium placeholder:text-gray-300 focus:outline-none"
                      autoComplete="current-password"
                    />
                  </InputField>
                </InputContainer>
                <span className="h-[20px] text-sm text-primary-400">
                  {errors.password?.message}
                </span>
                {signInError && (
                  <FormSpan variant="error">{signInError}</FormSpan>
                )}
              </section>
            </div>
            <div className="flex h-[64px] w-full items-center justify-center py-[20px]">
              <Button size="sm" className="w-[360px]" type="submit">
                로그인
              </Button>
            </div>
            <div className="flex h-[56px] w-[360px] items-center justify-center">
              <button onClick={handleSignupModalOpen}>
                <p className="text-sm text-gray-500 underline">회원가입</p>
              </button>
            </div>
          </div>
        </form>

        <div className="flex-1 bg-custom-gradient shadow-signInBox">
          <h1 className="p-4 text-center text-white">Right Side</h1>
        </div>
      </div>
    </>
  );
};

export default SignIn;
