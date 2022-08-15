import { FC } from 'react';
import { Post } from './types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';

const PostSnippet: FC<{ post: Post }> = ({ post }) => {
  return (
    <>
      {post.title && <h3>{post.title}</h3>}
      {post.body && <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{post.body!}</ReactMarkdown>}
      <br />
    </>
  )
}

export default PostSnippet;
