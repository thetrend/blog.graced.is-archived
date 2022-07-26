import { ChangeEvent, FC, useContext, useState } from 'react';
import { Post } from './types';
import { PostContext } from './PostContext';
import classNames from 'classnames';

const ManagePost: FC = () => {
  const { state, dispatch } = useContext(PostContext);
  const [formData, setFormData] = useState<Post>({
    title: '',
    body: '',
    slug: '',
    isPrivate: false,
    isDraft: false,
    categories: '',
    tags: '',
  });

  const { title, body, slug, isPrivate, isDraft, categories, tags } = formData;

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void => 
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className={classNames("w-8/12 m-auto flex flex-col")}>
      <h1>Create A Post</h1>
      <form>
        <input type="text" name="title" placeholder="Post Title" value={title} onChange={handleChange} />
        <textarea name="body" placeholder="Post Content" value={body} onChange={handleChange} />
      </form>
    </div>
  )
};

export default ManagePost;
