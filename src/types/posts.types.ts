import { SelectOptionType } from '@/types/signup.types';
import { TagType } from '@/types/tag.types';

export const postTypeList: SelectOptionType[] = [
  { value: 'Sparta_Lecture', label: '강의자료', selected: false },
  { value: 'Level_Challenge', label: '챌린지', selected: false },
  { value: 'Level_Standard', label: '스탠다드', selected: false },
  { value: 'Level_Basic', label: '베이직', selected: false },
  { value: 'Special_Lecture', label: '특강/실시간 세션', selected: false },
  { value: 'Project_Description', label: '과제해설', selected: false },
];

export type trackPeriodList = number[];

export type trackPeriodResponse = {
  message: string;
  status: number;
  data: { trackPeriodList: trackPeriodList };
};

export type TutorType = { tutorId: number; tutorName: string };

export const trackOptions: SelectOptionType[] = [
  {
    value: 'UNITY',
    label: 'Unity',
    selected: false,
  },
  {
    value: 'NODEJS',
    label: 'Node.js',
    selected: false,
  },
  {
    value: 'SPRING_JAVA',
    label: 'Spring(Java)',
    selected: false,
  },
  {
    value: 'SPRING_KOTLIN',
    label: 'Spring(Kotlin)',
    selected: false,
  },
  {
    value: 'REACT',
    label: 'React',
    selected: false,
  },
  {
    value: 'AI',
    label: 'AI',
    selected: false,
  },
  {
    value: 'ANDROID',
    label: 'Android',
    selected: false,
  },
  {
    value: 'IOS',
    label: 'IOS',
    selected: false,
  },
  {
    value: 'DATA',
    label: 'Data',
    selected: false,
  },
  {
    value: 'UXUI',
    label: 'UX/UI',
    selected: false,
  },
  {
    value: 'SPRING_DEEP',
    label: 'Spring(단기 심화)',
    selected: false,
  },
];

export type TrackType =
  | ''
  | 'UNITY'
  | 'NODEJS'
  | 'SPRING_JAVA'
  | 'SPRING_KOTLIN'
  | 'REACT'
  | 'AI'
  | 'ANDROID'
  | 'IOS'
  | 'DATA'
  | 'UXUI'
  | 'SPRING_DEEP';

export type PostType =
  | 'Sparta_Lecture'
  | 'Special_Lecture'
  | 'Level_Challenge'
  | 'Level_Standard'
  | 'Level_Basic'
  | 'Project_Description'
  | 'all';

export type CategoryType =
  | 'Sparta_Lecture'
  | 'Special_Lecture'
  | 'Project_Description'
  | 'Level_All'
  | 'all';

export type tutorApiType = {
  data: TutorType[];
  message: string;
  status: number;
};

export type postsEndPointFormData = {
  title: string;
  tutorId: number;
  contentLink: string;
  videoLink: string;
  tagNameList: string[];
  uploadedAt: string;
  postType: PostType;
  postPeriod: number;
  isOpened: boolean;
  thumbnailUrl: string;
  content: string;
};

export type postFetchData = {
  postId: string;
  title: string;
  tutor: string;
  videoLink: string;
  contentLink: string;
  isBookmarked: boolean;
  uploadedAt: string;
  postType: PostType;
  tagList: TagType[];
};

export type SearchParamsType = {
  postType: string | undefined;
  tutorId: string | undefined;
  page: string | undefined;
  size: string | undefined;
  title: string | undefined;
};

export type PostFilterType = {
  key: number;
  value: string;
};

export type PostListResponse = {
  status: number;
  message: string;
  data: {
    totalPages: number;
    totalElements: number;
    size: number;
    content: PostContentType[];
    number: number;
    sort: { empty: boolean; sorted: boolean; unsorted: boolean };
    numberOfElements: number;
    pageable: {
      sort: SortType;
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      unpaged: boolean;
    };
    first: boolean;
    last: boolean;
    empty: boolean;
  };
};

export type PostContentType = {
  postId: number;
  thumbnailUrl: string;
  title: string;
  postType: PostType;
  tutor: string;
  uploadedAt: string;
  tagList?: TagType[];
  contentLink?: string;
  isBookmarked: boolean;
};

export type SortType = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

export type PostTabType = {
  id: PostType;
  title: string;
};
export type CategoryTabType = {
  id: CategoryType;
  title: string;
};

export enum OrderByEnum {
  NEW = 'new',
  POPULAR = 'popular',
}
