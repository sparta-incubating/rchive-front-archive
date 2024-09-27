import { PostListResponse } from '@/types/posts.types';
import PostListContainer from '@/components/organisms/postList/postListContainer';
import { useRouter } from 'next/navigation';

interface MorePostProps {
  category: string;
  categoryId: string;
  postListData: PostListResponse;
}

const MorePost = ({ category, categoryId, postListData }: MorePostProps) => {
  const router = useRouter();
  const handleClickMore = () => {
    router.push(`/?postType=${categoryId}&page=1`);
  };

  return (
    <section className="flex flex-col gap-3.5 border-t border-gray-100 pt-[52px]">
      <div className="flex items-center justify-between">
        <span className="text-center text-2xl font-bold">{category}</span>
        <button
          onClick={handleClickMore}
          className="text-md text-center font-bold text-gray-500"
        >
          더보기
        </button>
      </div>
      <PostListContainer postListData={postListData} />
    </section>
  );
};
export default MorePost;
