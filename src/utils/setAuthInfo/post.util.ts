import { PostType, TrackType } from '@/types/posts.types';

export const getNameCategory = (postType: PostType) => {
  switch (postType) {
    case 'Sparta_Lecture':
      return '강의자료';
    case 'Project_Description':
      return '과제해설';
    case 'Level_Basic':
      return '베이직';
    case 'Level_Standard':
      return '스텐다드';
    case 'Special_Lecture':
      return '특강/실시간 세션';
    default:
      return '첼린지';
  }
};

export const getTrackName = (postType: TrackType) => {
  switch (postType) {
    case 'UNITY':
      return 'Unity';
    case 'NODEJS':
      return 'Node.js';
    case 'SPRING_JAVA':
      return 'Spring(Java)';
    case 'SPRING_KOTLIN':
      return 'Spring(Kotlin)';
    case 'REACT':
      return 'React';
    case 'AI':
      return 'AI';
    case 'ANDROID':
      return 'Android';
    case 'IOS':
      return 'IOS';
    case 'DATA':
      return 'Data';
    case 'UXUI':
      return 'UX/UI';
    case 'SPRING_DEEP':
      return 'Spring(단기 심화)';
    default:
      return 'Unknown';
  }
};
