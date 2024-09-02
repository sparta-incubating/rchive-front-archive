import { PropsWithChildren } from 'react';

const PostInfoText = ({ children }: PropsWithChildren) => {
  return <span className="text-sm font-medium text-gray-500">{children}</span>;
};
export default PostInfoText;
