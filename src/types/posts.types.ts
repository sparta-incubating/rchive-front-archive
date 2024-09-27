import { TagType } from '@/types/tag.types';
import { postsSchema } from '@/validators/posts/posts.validator';
import { z } from 'zod';

export type PostsFormSchema = z.infer<typeof postsSchema>;

export type trackPeriodList = number[];

export type trackPeriodResponse = {
  message: string;
  status: number;
  data: { trackPeriodList: trackPeriodList };
};

export type TutorType = { tutorId: number; tutorName: string };

type TrackType = {
  key: string;
  value: string;
};

export type TractTypeResponse = {
  status: number;
  message: string;
  data: { trackNameList: TrackType[] };
};

type PostType = {
  key: string;
  value: string;
};

export type PostTypeResponse = {
  status: number;
  message: string;
  data: PostType[];
};

export type tutorApiType = {
  data: TutorType[];
  message: string;
  status: number;
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

export type SearchTagParamsType = {
  tagId: string;
  tagName: string;
  postType: string | undefined;
  page: string | undefined;
  size: string | undefined;
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
  id: string;
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

export type CategoryType =
  | 'Sparta_Lecture'
  | 'Special_Lecture'
  | 'Project_Description'
  | 'Level_All'
  | 'all';
