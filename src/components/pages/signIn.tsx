'use client';

import bookmark from '@/../public/assets/icons/bookmark-rtan.svg';
import dashboard from '@/../public/assets/icons/signin-dashboard.svg';
import comment from '@/../public/assets/icons/comment-rtan.svg';
import lecture from '@/../public/assets/icons/lecture-rtan.svg';
import search from '@/../public/assets/icons/search-rtan.svg';
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
    }
  };

  useEffect(() => {
    if (session?.user) {
      const {
        trackName,
        trackRole,
        accessToken,
        loginPeriod,
        myRoles = [],
        nickname,
        username,
        profileImg,
        birth,
        email,
      } = session.user;

      dispatch(
        setAuth({
          accessToken,
          trackName: trackName || '',
          trackRole: trackRole || '',
          period: String(loginPeriod) || '',
          nickname: nickname || '',
          username: username || '',
          birth: birth || '',
          profileImg: profileImg || '',
          myRoles: myRoles || [],
          email: email || '',
        }),
      );

      if (myRoles.length > 1) {
        router.push('/wait');
      } else {
        router.push('/');
      }
    } else {
      router.push('/login');
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
            <div className="flex w-full items-center justify-center">
              <figure className="h-[174px] pb-[20px]">
                <Image src={rtan} height={154} width={154} alt="르탄이" />
              </figure>
            </div>
            <div className="flex h-[32px] w-full items-center justify-center pb-[26px] pt-[36px]">
              <p className="text-2xl font-bold">르탄이의 아카이브</p>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-[20px] p-[20px]">
              {/*이메일*/}
              <div className="h-[84px] w-[360px]">
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
              </div>
              {/*이메일*/}
              <div className="h-[84px] w-[360px]">
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
                <div>
                  {errors.password?.message ? (
                    <span className="h-[20px] text-sm text-primary-400">
                      {errors.password?.message}
                    </span>
                  ) : signInError ? (
                    <FormSpan variant="error">{signInError}</FormSpan>
                  ) : null}
                </div>
              </div>
              {/*이메일*/}
            </div>
            <div className="flex h-[104px] w-full items-center justify-center py-[20px]">
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

        <div className="flex flex-1 items-center justify-center bg-archive-gradient shadow-signInBox">
          <section>
            <div className="relative">
              <div className="absolute bottom-[380px] right-[0px] z-20 h-[463px] w-[242px]">
                <Image
                  src={search}
                  height={243}
                  width={107}
                  alt="test"
                  className="h-[107px] w-[243px] pt-[13.8px]"
                />
                <Image
                  src={lecture}
                  height={243}
                  width={107}
                  alt="test"
                  className="h-[107px] w-[243px] pt-[13.8px]"
                />
                <Image
                  src={comment}
                  height={243}
                  width={107}
                  alt="test"
                  className="h-[107px] w-[243px] pt-[13.8px]"
                />
                <Image
                  src={bookmark}
                  height={243}
                  width={107}
                  alt="test"
                  className="h-[107px] w-[243px] pt-[13.8px]"
                />
              </div>
              {/*문구 */}
              <div className="z-10 pl-[38px]">
                <p className="text-2xl font-bold text-gray-700">
                  강의 자료를 찾는 가장 쉬운 방법!
                </p>
                <p className="text-2xl font-bold text-gray-700">
                  르탄이의 아카이브에서 자료들을 찾아보세요
                </p>
              </div>
              {/*문구 */}
              {/*대시보드*/}
              <div className="z-20">
                <Image src={dashboard} height={814} width={739} alt="test" />
              </div>

              {/*대시보드*/}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default SignIn;
