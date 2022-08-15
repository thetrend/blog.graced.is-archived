import { FC, useContext } from 'react';
import PostSnippet from './PostSnippet';
import { PostContext } from './PostContext';

const Posts: FC = () => {
  const { state, dispatch } = useContext(PostContext);
  const { posts } = state;

  return (
    <>
      {posts?.map((post, key) => <PostSnippet key={key} post={post} />)}
    </>
  );
};

export default Posts;
