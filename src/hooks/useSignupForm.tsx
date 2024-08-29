import { getMailCheck, postSignup } from '@/api/client/authApi';
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
  username: '',
  password: '',
  passwordConfirm: '',
  phone: '',
  authCode: '',
  birth: '',
  // phoneConfirm: false,
  ad: false,
  age: false,
  privacy: false,
  service: false,
};

const useSignupForm = (signupType: signupModalType) => {
  const [isEmailUnique, setIsEmailUnique] = useState<boolean | undefined>(
    undefined,
  );

  /*미확인 시  */
  const [emailChecked, setEmailChecked] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);
  const [isErrorMsg, setIsErrorMsg] = useState<string | null>(null);
  /*회원가입 실패  */

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
    // if (!emailChecked || !phoneVerified) {
    //   alert('이메일 중복 및 휴대폰 인증을 마무리 하세요');
    //   console.log(emailChecked, '이메일 중복');
    //   console.log(phoneVerified, '휴대폰 인증');
    //   return null;
    // }
    const signUpFormData = createSignupForm(signupType, data);
    await postSignup(signUpFormData);
    open(<SignUpCompleteModal />);
  };

  const checkEmail = async (email: string) => {
    try {
      const data = await getMailCheck(email);
      setIsEmailUnique(data.data);
      setEmailChecked(true);
    } catch (error) {
      console.error('Error checking email uniqueness', error);
      setIsEmailUnique(false);
      setEmailChecked(false);
    }
  };

  const email = watch('email');
  useEffect(() => {
    setIsEmailUnique(undefined);
  }, [email]);

  /**휴대폰 인증로직 추가 */
  const { checkPhoneAuthMutate } = useProfileUpdate();

  const authCheck = async (authInfo: authCodeType) => {
    try {
      await checkPhoneAuthMutate.mutateAsync(authInfo);
      setIsErrorMsg('인증이 완료됐습니다.');
      setPhoneVerified(true);
    } catch (error) {
      setPhoneVerified(false);
      setIsErrorMsg('인증 번호가 일치하지 않습니다.');
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
      data.username,
      data.password,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      UserRoleEnum.MANAGER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
      '',
    );
  } else {
    return new User(
      OAuthEnum.LOCAL,
      data.email,
      data.username,
      data.password,
      formatDate(data.birth),
      data.phone,
      GenderEnum.NONE,
      UserRoleEnum.USER,
      data.age,
      data.service,
      data.privacy,
      data.ad,
      '',
      '',
    );
  }
};
export default useSignupForm;
