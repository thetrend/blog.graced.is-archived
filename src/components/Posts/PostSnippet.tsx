import { FC } from 'react';
import { Post } from './types';

const PostSnippet: FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </>
  )
}

export default PostSnippet;
