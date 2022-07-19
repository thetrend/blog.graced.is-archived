import { Dispatch } from 'react';

export const API_POST_URL: string = '/api/posts';

export interface IPost {
  title?: string;
  body?: string;
  slug: string;
  isDraft: boolean;
  isPrivate: boolean;
  categories?: string;
  tags?: string;
}
