import { Dispatch } from 'react';

export const API_POST_URL: string = '/api/posts';

export type Post = {
  title?: string;
  body?: string;
  slug: string;
  isDraft: boolean;
  isPrivate: boolean;
  categories?: string;
  tags?: string;
  postedDate?: string;
  editDate?: string;
  authorID?: string;
}

export type IPostState = {
  posts?: Post[] | null;
  post?: Post | null;
  loading?: boolean | null;
};

export type PostAction =
  | {
    type: 'NEW_POST_SUCCESS',
    payload: {
      post: Post
    }
  } | {
    type: 'NEW_POST_ERROR',
    payload: {
      name: string,
      message: string,
    }
  } | {
    type: 'FETCH_ALL_POSTS',
    payload: {
      posts: Post[];
    }
  };

export interface IPostContext {
  state: IPostState;
  dispatch: Dispatch<PostAction>;
}
