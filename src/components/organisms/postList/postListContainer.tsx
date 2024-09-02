import PostCard from '@/components/molecules/post/postCard';
import React from 'react';

const PostListContainer = () => {
  return (
    <section className="container mx-auto mb-14">
      <div className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <PostCard bookmark={true} tags={testTags} />
        <PostCard bookmark={false} tags={testTags2} />
        <PostCard bookmark={false} tags={testTags2} />
        <PostCard bookmark={true} tags={testTags} />
        <PostCard bookmark={false} tags={testTags} />
        <PostCard bookmark={false} tags={testTags2} />
        <PostCard bookmark={true} tags={testTags} />
        <PostCard bookmark={false} tags={testTags2} />
      </div>
    </section>
  );
};

export default PostListContainer;
const testTags = [
  'figma',
  'javascript',
  'java',
  'database',
  'spring boot',
  'react',
  'nextjs',
];

const testTags2 = [
  'figma',
  'javascript',
  'spring boot',
  'database',
  'java',
  'react',
  'nextjs',
];
