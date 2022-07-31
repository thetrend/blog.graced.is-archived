import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { dbHelper } from '../utils';

const countUsers = async (event: HandlerEvent): Promise<HandlerResponse> => {
  const { client, q } = dbHelper(false, true, false);

  let countQuery = await client.query(
    q.Count(q.Paginate(q.Documents(q.Collection('users'))))
  )
    .then((res: any) => res.data[0])
    .catch(err => console.error(err));
  return {
    statusCode: 200,
    body: JSON.stringify({ count: countQuery })
  };
};

export default countUsers;
