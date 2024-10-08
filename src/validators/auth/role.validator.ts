import { z } from 'zod';
import { trackEnum } from '../commons';

export const roleSchema = z
  .object({
    trackRole: z.string().optional(),
    trackName: z.string(),
    period: z.string().optional(),
  })
  .refine(
    (data) => {
      return !(data.trackRole === 'STUDENT' && !data.period);
    },
    {
      message: '기수를 선택해주세요.',
      path: ['period'],
    },
  );
