import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { dbHelper } from '../utils';

const countUsers = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const { client, q } = dbHelper(false, true, false);

  let countQuery = await client.query(
    q.If(
      q.Exists(q.Collection('users')),
      q.Count(
        q.Paginate(
          q.Documents(
            q.Collection('users')
          )
        )
      ),
      0,
    )
  )
    .then((res: any) => res.data ? res.data[0] : 0)
    .catch(err => err);
  return {
    statusCode: 200,
    body: JSON.stringify({ count: countQuery })
  };
};

export default countUsers;
