import { NICKNAME_REG, PASSWORD_REG } from '@/validators/auth/signup.validator';
import { z } from 'zod';

export const profilePasswordSchema = z
  .object({
    originPassword: z
      .string()
      .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
      .refine(
        (value) => PASSWORD_REG.test(value),
        '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
      ),
    newPassword: z
      .string()
      .min(6, '영문, 숫자 조합으로 6자 이상 입력해 주세요.')
      .refine(
        (value) => PASSWORD_REG.test(value),
        '영문, 숫자 조합으로 6자 이상 입력해 주세요.',
      ),
    passwordConfirm: z.string(),
  })
  .refine(
    ({ newPassword, passwordConfirm }) => newPassword === passwordConfirm,
    {
      message: '비밀번호가 일치하지 않습니다. 다시 입력해 주세요.',
      path: ['passwordConfirm'],
    },
  );

export const profilePhoneSchema = z.object({
  phone: z.string().min(8, '휴대폰 인증은 필수 입니다.'),
  authCode: z.string().min(6, '인증번호는 필수 입니다.'),
});

export const profileNicknameSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: '닉네임 중복확인은 필수입니다.' })
    .max(10, { message: '닉네임은 2자 이상 10자 이하만 입력 가능합니다.' })
    .refine(
      (value) => NICKNAME_REG.test(value),
      '공백, 특수문자는 사용할 수 없습니다.',
    ),
});
