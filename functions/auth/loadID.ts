import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { dbHelper, genericError } from '../utils';

const loadID = async (): Promise<HandlerResponse> => {
  try {
    const { client, q } = dbHelper();

    let loadQuery = await client.query(
      q.CurrentIdentity()
    )
      .then(async (res: any) => res.id);
    return {
      statusCode: 200,
      body: JSON.stringify({ id: loadQuery })
    };
  } catch (err: any) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: err.name })
    };
  }
};

export default loadID;