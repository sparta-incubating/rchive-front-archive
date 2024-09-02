'use client';

import React, { useEffect, useRef, useState } from 'react';
import TagName from '@/components/atoms/post/tagNameProps';

interface TagNameGroupProps {
  tags: string[];
}

const TagNameGroup = ({ tags }: TagNameGroupProps) => {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let totalWidth = 0;
    const newVisibleTags: string[] = [];

    if (containerRef.current) {
      const container = containerRef.current;

      tags.forEach((tag) => {
        const tagElement = document.createElement('span');
        tagElement.style.position = 'absolute';
        tagElement.style.whiteSpace = 'nowrap';
        tagElement.textContent = tag;
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
  }, [tags]);

  return (
    <section
      className="flex w-[270px] gap-3 overflow-hidden"
      ref={containerRef}
    >
      {visibleTags.map((tag) => (
        <TagName href={'#'} key={tag}>
          {tag}
        </TagName>
      ))}
    </section>
  );
};

export default TagNameGroup;
