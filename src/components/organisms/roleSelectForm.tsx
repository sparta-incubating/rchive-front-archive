'use client';

import { postRoleApply } from '@/api/server/authApi';
import Button from '@/components/atoms/button';

import { RoleFormSchema } from '@/types/role.types';
import { roleSchema } from '@/validators/auth/role.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import SelectFormBox from './selectFormBox';
import useGetPeriod from '@/hooks/useGetPeriod';
import useTrackName from '@/hooks/useTrackName';

interface RoleSelectFormProps {
  trackRole: string;
  children: ReactNode;
}

const RoleSelectForm = ({ trackRole, children }: RoleSelectFormProps) => {
  const {
    control,
    handleSubmit,
    watch,

    formState: { errors, isValid },
  } = useForm<RoleFormSchema>({
    resolver: zodResolver(roleSchema),
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      trackRole,
      trackName: '',
      period: '',
    },
  });

  const { trackNameOptions } = useTrackName();

  const period = useGetPeriod(watch('trackName'), trackRole);

  const onSubmit = async (data: RoleFormSchema) => {
    const response = await postRoleApply(data);
    if (response.status === 200) {
      window.location.href = '/role/result';
    }
  };

  return (
    <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
      <section className="m-auto flex h-[577px] w-[520px] flex-col items-center justify-center gap-5 rounded-[12px] bg-white pb-7 pt-14">
        {children}
        <Controller
          name="trackName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectFormBox
              className="w-[360px]"
              options={trackNameOptions}
              label={'트랙'}
              onSelect={onChange}
              value={value}
            />
          )}
        />
        {errors.trackName && (
          <p className="text-red-500">{errors.trackName.message}</p>
        )}

        {trackRole === 'STUDENT' && period && (
          <>
            <Controller
              name="period"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SelectFormBox
                  className="w-[360px]"
                  options={period}
                  label={'기수'}
                  onSelect={onChange}
                  value={value!}
                />
              )}
            />
            {errors.period && (
              <p className="text-red-500">{errors.period.message}</p>
            )}
          </>
        )}

        <Button
          variant="primary"
          className="mt-4 w-[360px]"
          disabled={!isValid}
        >
          완료
        </Button>
      </section>
    </form>
  );
};

export default RoleSelectForm;
