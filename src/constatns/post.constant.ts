import { CategoryTabType } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';

export const postTabArr: CategoryTabType[] = [
  {
    id: 'all',
    title: '전체',
  },
  {
    id: 'Sparta_Lecture',
    title: '강의자료',
  },
  {
    id: 'Project_Description',
    title: '과제해설',
  },
  {
    id: 'Special_Lecture',
    title: '특강/실시간 세션',
  },
  {
    id: 'Level',
    title: '수준별강의',
  },
];

export const tutorMockData: SelectOptionType[] = [
  { value: '', label: '전체', selected: false },
  { value: 'test1', label: '김김김', selected: false },
  { value: 'test2', label: '권권권', selected: false },
  { value: 'test3', label: '이이이', selected: false },
  { value: 'test4', label: '수수수', selected: false },
  { value: 'test5', label: '양양양', selected: false },
];
