import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { IPost } from '../../src/contexts/posts/PostTypes';
import { dbHelper, genericError } from '../utils';

const createPost = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    if (event.httpMethod === 'POST' && (event.body)?.includes('slug')) {
      let { title, body, slug, isDraft, isPrivate, categories, tags }: IPost = JSON.parse(event.body);

      const { client, q } = dbHelper();

      // TODO: MOVE THESE CONSTANTS OUT
      const FAUNA_COLL_POSTS: string = 'posts';

      let createPostQuery = await client.query(
        q.Create(
          q.Collection(FAUNA_COLL_POSTS),
          {
            data: {
              title,
              body,
              isDraft: isDraft ? true : false,
              isPrivate: isPrivate ? true : false,
              slug,
              categories,
              tags,
              postedDate: Date.now(),
              editDate: null,
              authorID: q.Identity(),
            }
          }
        )
      )
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => {
          return err.description as string;
        });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: createPostQuery })
      };
    }
    return genericError();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    };
  }
};

export default createPost;
