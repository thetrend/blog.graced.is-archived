import { Handler } from '@netlify/functions';
import { dbHelper } from '~NETLIFY/utils';

const handler: Handler = async (event, context) => {
  const { client, q } = dbHelper(false, true);
  await client.query(
    q.CreateDatabase({ name: 'test' })
  ).then(res => console.log(res)).catch(err => console.log(err));
  const env = process.env.NODE_ENV !== 'production' ?
  process.env.BRANCH === 'staging' ? 
    process.env.BRANCH :
    'development' :
  process.env.NODE_ENV;
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `bonjour ${env}` })
  };
};

export { handler };
