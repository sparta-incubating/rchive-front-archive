'use client';

import React, { useEffect, useRef, useState } from 'react';
import TagName from '@/components/atoms/post/tagNameProps';
import { TagType } from '@/types/tag.types';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/constatns/posts.constant';

interface TagNameGroupProps {
  tagList: TagType[];
}

const TagNameGroup = ({ tagList }: TagNameGroupProps) => {
  const [visibleTags, setVisibleTags] = useState<TagType[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let totalWidth = 0;
    const newVisibleTags: TagType[] = [];

    if (containerRef.current) {
      const container = containerRef.current;

      tagList.forEach((tag) => {
        const tagElement = document.createElement('span');
        tagElement.style.position = 'absolute';
        tagElement.style.whiteSpace = 'nowrap';
        tagElement.textContent = tag.tagName;
        container.appendChild(tagElement);

        const tagWidth = tagElement.offsetWidth;
        container.removeChild(tagElement);

        if (totalWidth + tagWidth + newVisibleTags.length * 12 <= 270) {
          newVisibleTags.push(tag);
          totalWidth += tagWidth;
        }
      });

      setVisibleTags(newVisibleTags);
    }
  }, [tagList]);

  return (
    <section
      className="flex w-[270px] gap-3 overflow-hidden"
      ref={containerRef}
    >
      {visibleTags.map((tag) => (
        <TagName
          href={`/tag?tagId=${tag.tagId}&tagName=${tag.tagName}&page=${DEFAULT_PAGE}&size=${DEFAULT_PAGE_SIZE}`}
          key={tag.tagId}
        >
          {tag.tagName}
        </TagName>
      ))}
    </section>
  );
};

export default TagNameGroup;
