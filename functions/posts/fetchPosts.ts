import { HandlerResponse } from '@netlify/functions';

import { dbHelper } from '../utils';

const fetchPosts = async (): Promise<HandlerResponse> => {
  try {
    let { client, q } = dbHelper(false);
    let fetchPostsQuery = await client.query(
      q.Map(
        q.Paginate(
          q.Match(
            q.Index('all_users') // TODO: refactor into posts
          )
        ),
        q.Lambda('X', q.Get(q.Var('X')))
      )
    )
      .then((res: any) => {
        return res.data;
      })
      .catch((err: any) => {
        return err;
      });
    return {
      statusCode: 200,
      body: JSON.stringify({ posts: fetchPostsQuery }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error as string
    };
  }
};

export default fetchPosts;
