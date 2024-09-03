import { z } from 'zod';

export const PASSWORD_REG = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
export const BIRTHDATE_REG =
  /^(19|20)\d\d(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/;

export const NICKNAME_REG = /^[a-zA-Z가-힣0-9]+$/;

export const signupSchema = z
  .object({
    email: z.string().email({ message: '올바른 이메일을 입력해주세요.' }),
    username: z.string().min(1, '이름을 입력해주세요.'),
    password: z
      .string()
      .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
      .refine(
        (value) => PASSWORD_REG.test(value),
        '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
      ),
    passwordConfirm: z.string(),
    phone: z.string().min(8, '휴대폰 인증은 필수입니다.'),
    authCode: z.string().min(6, '휴대폰 인증은 필수입니다.'),
    nickname: z
      .string()
      .min(2, { message: '닉네임 중복확인은 필수입니다.' })
      .max(10, { message: '닉네임은 2자 이상 10자 이하만 입력 가능합니다.' })
      .refine(
        (value) => NICKNAME_REG.test(value),
        '공백, 특수문자는 사용할 수 없습니다.',
      ),
    profileImg: z.string().default('default'),
    birth: z
      .string()
      .min(8, '생년월일을 입력해주세요.')
      .refine(
        (value) => BIRTHDATE_REG.test(value),
        '생년월일을 다시 확인해 주세요.',
      ),
    age: z.boolean().refine((value) => value, {
      message: '만 14세 이상이어야 합니다.',
    }),
    service: z.boolean().refine((value) => value, {
      message: '서비스 약관에 동의해주세요.',
    }),
    privacy: z.boolean().refine((value) => value, {
      message: '개인정보 처리방침에 동의해주세요.',
    }),
    ad: z.boolean(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });
