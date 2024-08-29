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

    console.log(result, 'result');

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
      <main className="m-auto w-screen">
        <section className="flex flex-row">
          {/*1 */}
          <aside className="h-screen w-[500px]">
            {/*르탄이*/}
            <figure className="mt-[183.5px] flex justify-center">
              <Image src={rtan} height={154} width={154} alt="르탄이" />
            </figure>
            {/*문구*/}
            <section className="h-[120px]">
              <section className="flex flex-col pb-[20px] pt-[36px]">
                <p className="flex justify-center text-2xl font-bold">
                  르탄이의 아카이브
                </p>
              </section>
            </section>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <section className="flex flex-col gap-5 pt-5">
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
                  <span className="text-sm text-primary-400">
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
                  <span className="text-sm text-primary-400">
                    {errors.password?.message}
                  </span>{' '}
                  {signInError && (
                    <FormSpan variant="error">{signInError}</FormSpan>
                  )}
                </section>
              </section>
              {/* 회원가입*/}
              <section className="flex justify-center py-5">
                <Button size="sm" className="w-[360px]" type="submit">
                  로그인
                </Button>
              </section>
            </form>
            <section className="mx-auto flex h-[53px] flex-row justify-center p-[16px] text-center">
              <span className="w-[120px] text-sm text-gray-500">
                <button onClick={handleSignupModalOpen}>회원가입</button>
              </span>
              {/* <div className="border" />
              <span className="w-[120px] text-sm text-gray-500">
                비밀번호 찾기
              </span> */}
            </section>
          </aside>

          {/*2 */}

          <section className="w-[calc(100%-500px)] bg-custom-gradient shadow-signInBox">
            <section className="flex items-center justify-center pt-[138px]">
              <section className="relative">
                <article className="absolute bottom-[445.52px] left-[508px] h-[351.48px] w-[237.79px]">
                  <Image
                    src={search}
                    alt="다양한 검색"
                    width={243}
                    height={106}
                    className="mb-[14px] rounded-[14px] shadow-rtanBox"
                  />
                  <Image
                    src={lecture}
                    alt="강의자료"
                    width={243}
                    height={107}
                    className="mb-[14px] rounded-[14px] shadow-rtanBox"
                  />
                  <Image
                    src={bookmark}
                    alt="북마크"
                    width={243}
                    height={107}
                    className="rounded-[14px] shadow-rtanBox"
                  />
                  <Image
                    src={comment}
                    alt="댓글"
                    width={243}
                    height={107}
                    className="rounded-[14px] shadow-rtanBox"
                  />
                </article>
                <article className="mb-[31px] h-[80px] w-[330px]">
                  <p className="text-2xl font-bold text-gray-700">
                    강의자료를 찾는 가장 쉬운방법!
                  </p>
                  <p className="text-2xl font-bold text-gray-700">
                    르탄이의 아카이브에서 자료들을 찾아보세요
                  </p>
                </article>
                <article className="h-[663px] w-[736.43px]">
                  <Image
                    src={dashboard}
                    alt="백오피스"
                    width={814}
                    height={739}
                  />
                </article>
              </section>
            </section>{' '}
          </section>
          {/*2 */}
        </section>
      </main>
    </>
  );
};

export default SignIn;
