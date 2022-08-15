import { createContext, Dispatch, Reducer, useReducer } from 'react';
import ContextProps from '~SRC/ContextProps';

import { 
  PostTypes, 
  postReducer,
} from '~COMPONENTS/Posts';

export const initialPostState: PostTypes.PostState = {
  posts: [
    {
      title: 'This is a test post',
      body: 'This is a test post content https://facebook.com/',
      isPrivate: false,
      isDraft: false,
      slug: 'this-is-a-test-post'
    },
    {
      title: 'hello world',
      isPrivate: false,
      isDraft: false,
      slug: 'hello-world'
    }
  ],
  post: null,
  loading: false,
};

export const PostContext = createContext<{ state: PostTypes.PostState, dispatch: Dispatch<PostTypes.PostAction>; }>
  ({ state: initialPostState, dispatch: () => null });

export const PostProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(postReducer, initialPostState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
