import { PropsWithChildren } from 'react';

const PostDetailHeaderText = ({ children }: PropsWithChildren) => {
  return <span className="text-md font-medium text-gray-500">{children}</span>;
};

export default PostDetailHeaderText;
