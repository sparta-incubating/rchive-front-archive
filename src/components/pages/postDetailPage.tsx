'use client';

import PostDetailCategoryGroup from '@/components/molecules/postDetail/postDetailCategoryGroup';
import NotionContainer from '@/components/molecules/postDetail/notionContainer';
import VideoContainer from '@/components/molecules/postDetail/videoContainer';
import useSocialButtonPosition from '@/hooks/useSocialButtonPosition';
import { useMemo, useState } from 'react';
import { postFetchData, PostListResponse } from '@/types/posts.types';
import PostDetailTag from '@/components/molecules/postDetail/postDetailTag';
import MorePost from '@/components/molecules/postDetail/morePost';
import SocialButtonGroup from '../molecules/postDetail/socialButtonGroup';

interface PostDetailProps {
  postData: postFetchData;
  postListData: PostListResponse;
}

const TITLE_OPTIONS = {
  VIDEO: '영상자료',
  CONTENT: '노션자료',
};

const PostDetail = ({ postData, postListData }: PostDetailProps) => {
  const initialView = useMemo(() => {
    if (postData.videoLink && postData.contentLink) {
      return TITLE_OPTIONS.VIDEO;
    } else if (postData.videoLink) {
      return TITLE_OPTIONS.VIDEO;
    } else {
      return TITLE_OPTIONS.CONTENT;
    }
  }, [postData.videoLink, postData.contentLink]);

  const [currentView, setCurrentView] = useState(initialView);
  const { containerRef, fixedPosition } = useSocialButtonPosition();

  return (
    <div className="mx-auto w-full max-w-[1152px]">
      <div className="relative m-6 w-full" ref={containerRef}>
        <section className="flex flex-col">
          <div className="mx-auto my-2 min-w-[800px]">
            {postData.videoLink && postData.contentLink && (
              <PostDetailCategoryGroup
                currentState={currentView}
                setCurrentState={setCurrentView}
              />
            )}

            {postData.videoLink && (
              <div
                className={
                  currentView === TITLE_OPTIONS.VIDEO ? 'block' : 'hidden'
                }
              >
                <div className="flex flex-col gap-[35px]">
                  <VideoContainer videoLink={postData.videoLink} />
                </div>
              </div>
            )}
            {postData.contentLink && (
              <div
                className={
                  currentView === TITLE_OPTIONS.CONTENT ? 'block' : 'hidden'
                }
              >
                <NotionContainer notionLink={postData.contentLink!} />
              </div>
            )}

            <div className="mt-9">
              {!!postData.tagList && <PostDetailTag tags={postData.tagList!} />}
            </div>
          </div>
        </section>

        {/** */}
        <div
          className="fixed"
          style={{
            top: `${fixedPosition.top}px`,
            left: `${fixedPosition.left}px`,
          }}
        >
          <SocialButtonGroup />
        </div>
        {/** */}
      </div>
      {/*spacer*/}
      <div className="h-[62px]"></div>

      {/*관련 category content*/}
      <MorePost
        category={postData.postType.value}
        postListData={postListData}
      />

      {/*spacer*/}
      <div className="h-[64px]"></div>
    </div>
  );
};

export default PostDetail;
