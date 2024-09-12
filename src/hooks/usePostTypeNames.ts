import { getPostTypeNames } from '@/api/client/categoryApi';
import { CategoryTabType, PostTypeResponse } from '@/types/posts.types';
import { SelectOptionType } from '@/types/signup.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const usePostTypeNames = () => {
  const [postTypeOptions, setPostTypeOptions] = useState<SelectOptionType[]>(
    [],
  );

  const [categoryData, setCategoryData] = useState<CategoryTabType[]>([]);

  const { data: postTypeNames } = useQuery<PostTypeResponse>({
    queryKey: ['postTypeNames'],
    queryFn: getPostTypeNames,
  });

  useEffect(() => {
    if (postTypeNames?.data) {
      setPostTypeOptions(
        postTypeNames.data
          .filter((postType) => postType.key !== 'Level_All')
          .map((postType) => ({
            value: postType.key,
            label: postType.value,
            selected: false,
          })),
      );
    }
  }, [postTypeNames]);

  useEffect(() => {
    if (postTypeNames?.data) {
      if (postTypeNames?.data) {
        setCategoryData([
          { id: 'all', title: '전체' },
          ...postTypeNames.data
            .filter(
              (postType) =>
                postType.key !== 'Level_Challenge' &&
                postType.key !== 'Level_Standard' &&
                postType.key !== 'Level_Basic',
            )
            .map(
              (item) =>
                ({
                  id: item.key,
                  title: item.value,
                }) as CategoryTabType,
            ),
        ]);
      }
    }
  }, [postTypeNames]);

  return { postTypeOptions, postTypeNames, categoryData };
};

export default usePostTypeNames;
