import {
  getMailCheck,
  getNicknameCheck,
  postSignup,
} from '@/api/client/authApi';
import { useProfileUpdate } from '@/api/signup/useMutation';

import { Admin, User } from '@/class/signup';
import SignUpCompleteModal from '@/components/pages/signUpCompleteModal';
import { useModalContext } from '@/context/useModalContext';
import {
  authCodeType,
  GenderEnum,
  OAuthEnum,
  SignupFormSchema,
  signupModalType,
  UserRoleEnum,
} from '@/types/signup.types';
import { formatDate } from '@/utils/utils';
import { signupSchema } from '@/validators/auth/signup.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const DEFAULT_VALUE = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
  birth: '',
  phone: '',
  authCode: '',
  profileImg: 'default',
  nickname: '',
  ad: false,
  age: false,
  privacy: false,
  service: false,
};

const useSignupForm = (signupType: signupModalType) => {
  const [isEmailUnique, setIsEmailUnique] = useState<boolean | undefined>(
    undefined,
  );
  const [isNicknameUnique, setIsNicknameUnique] = useState<boolean | undefined>(
    undefined,
  );

  /*미확인 시  */
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [nicknameChecked, setNicknameChecked] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [isErrorMsg, setIsErrorMsg] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);

  const { open } = useModalContext();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
    getValues,
    setValue,
  } = useForm<SignupFormSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: DEFAULT_VALUE,
  });

  const onSubmit = async (data: SignupFormSchema) => {
    if (!emailChecked && !phoneVerified && !nicknameChecked) {
      setEmailError('이메일 중복 확인은 필수입니다.');
      setNicknameError('닉네임 중복 확인은 필수입니다.');
      setIsErrorMsg('휴대폰 인증번호 확인은 필수입니다.');
      return;
    }
    if (!emailChecked) {
      setEmailError('이메일 중복 확인은 필수입니다.');
      return;
    }
    if (!phoneVerified) {
      setIsErrorMsg('휴대폰 인증번호 확인은 필수입니다.');
      return;
    }
    if (!nicknameChecked) {
      setNicknameError('닉네임 중복 확인은 필수입니다.');
      return;
    }
    try {
      const signUpFormData = createSignupForm(signupType, data);
      await postSignup(signUpFormData);
      open(<SignUpCompleteModal />);
    } catch (error) {
      throw new Error('회원가입 오류 발생');
    }
  };

  const checkEmail = async (email: string) => {
    try {
      const data = await getMailCheck(email);
      setIsEmailUnique(data.data);
      setEmailChecked(true);
      setEmailError(null);
    } catch (error) {
      console.error('Error checking email uniqueness', error);
      setIsEmailUnique(false);
      setEmailChecked(false);
    }
  };

  const checkNickname = async (nickname: string) => {
    try {
      const data = await getNicknameCheck(nickname);
      setIsNicknameUnique(data.data);
      setNicknameChecked(true);
      setNicknameError(null);
    } catch (error) {
      console.error('Error checking nickname uniqueness', error);
      setIsNicknameUnique(false);
      setNicknameChecked(false);
    }
  };

  const email = watch('email');
  useEffect(() => {
    setIsEmailUnique(undefined);
  }, [email]);

  const nickname = watch('nickname');
  useEffect(() => {
    setIsNicknameUnique(undefined);
  }, [nickname]);

  /**휴대폰 인증로직 추가 */
  const { checkPhoneAuthMutate } = useProfileUpdate();

  const authCheck = async (authInfo: authCodeType) => {
    try {
      await checkPhoneAuthMutate.mutateAsync(authInfo);
      setIsErrorMsg('인증이 완료되었습니다.');
      setPhoneVerified(true);
    } catch (error) {
      setIsErrorMsg('인증 번호가 일치하지 않습니다.');
      setPhoneVerified(false);
    }
  };

  return {
    handleSubmit,
    onSubmit,
    register,
    getValues,
    setValue,
    errors,
    watch,
    control,
    checkEmail,
    isEmailUnique,
    isValid,
    emailChecked,
    authCheck,
    isErrorMsg,
    setIsErrorMsg,
    phoneVerified,
    emailError,
    nicknameError,
    checkNickname,
    isNicknameUnique,
  };
};

const createSignupForm = (
  signupType: signupModalType,
  data: SignupFormSchema,
) => {
  if (signupType === signupModalType.MANAGER) {
    return new Admin(
      OAuthEnum.LOCAL,
      data.email,
      data.password,
      data.username,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      data.profileImg,
      data.nickname,
      UserRoleEnum.MANAGER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
    );
  } else {
    return new User(
      OAuthEnum.LOCAL,
      data.email,
      data.password,
      data.username,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      data.profileImg,
      data.nickname,
      UserRoleEnum.MANAGER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
    );
  }
};
export default useSignupForm;
