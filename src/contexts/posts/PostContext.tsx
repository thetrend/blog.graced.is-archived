import { createContext, Dispatch, useReducer } from 'react';
import postReducer from './postReducer';
import { ContextProps } from '../ContextProps';
import { IPostState, PostAction } from './PostTypes';

export const initialPostState: IPostState = {
  posts: [
    {
      title: 'Hello World',
      body: 'This is a hard-coded test post.',
      slug: 'hello-world',
      isDraft: false,
      isPrivate: false,
      categories: 'dummy text',
      tags: 'hello world',
    },
    {
      title: 'this is a test',
      body: 'This is also a hard-coded test post. Lots of different information here.',
      slug: 'this-is-a-test',
      isDraft: false,
      isPrivate: false,
      categories: 'dummy text',
    }
  ],
  loading: false,
};

export const PostContext = createContext<{ state: IPostState, dispatch: Dispatch<PostAction>; }>({ state: initialPostState, dispatch: () => null });

export const PostProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(postReducer, initialPostState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
