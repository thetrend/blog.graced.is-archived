import { FC } from 'react';
import { Post } from '../../contexts/posts/PostTypes';

const PostSnippet: FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </>
  )
}

export default PostSnippet;
