import { ChangeEvent, FC, useContext, useState } from 'react';
import { Post } from '../../contexts/posts/PostTypes';
import { PostContext } from '../../contexts/posts/PostContext';

const CreateEditPost: FC = () => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>): void => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <>
      <h1>Create A Post</h1>
      <form>
        <input type="text" name="title" placeholder="Post Title" value={title} onChange={handleChange} />
        <textarea name="body" value={body} onChange={handleChange} />        
      </form>
    </>
  )
};

export default CreateEditPost;
