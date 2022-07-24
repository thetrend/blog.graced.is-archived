import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import postReducer from './postReducer';
import { PostAction, IPostState } from './PostTypes';

export type ContextProps = {
  children?: ReactNode;
};

export const initialPostState: IPostState = {
  posts: null,
  post: null,
  loading: true,
};

export const PostContext = createContext<{ state: IPostState, dispatch: Dispatch<PostAction>; }>({ state: initialPostState, dispatch: () => null });

export const PostContextProvider = ({ children }: ContextProps) => {
  const [state, dispatch] = useReducer(postReducer, initialPostState);
  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
