import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import faunadb from 'faunadb';
import jwt from 'jsonwebtoken';

const urlHelper = (event: HandlerEvent) => {
  const path = event.path.replace(/\/api\/+/, '');
  const segments = path.split('/').filter(segment => segment);
  const endpoint = segments[segments.length - 1];
  return endpoint;
};

const dbHelper = (isAuthenticated: boolean = true, needsAdminPrivileges: boolean = false) => {
  const client = new faunadb.Client({
    secret: isAuthenticated ?
      process.env.AUTH_SECRET as string :
      needsAdminPrivileges ?
        process.env.FAUNADB_ADMIN_SECRET as string :
        process.env.FAUNADB_SERVER_SECRET as string
    ,
    keepAlive: isAuthenticated
  });
  const q = faunadb.query;

  return { client, q };
};

const authHelper = async (event: HandlerEvent, response: any): Promise<HandlerResponse> => {
  let hashedToken: string = process.env['TOKEN'] as string;

  if (hashedToken) {
    await jwt.verify(hashedToken, process.env['NETLIFY_JWT_SECRET'] as string, (err) => {
      event.headers = {
        ...event.headers,
        'Authorization': `Bearer ${hashedToken}`,
      };
    });
    return response(event);
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ isAuthenticated: false })
  };
};

const genericError = () => {
  return {
    statusCode: 500,
    body: JSON.stringify({ message: 'Server error' })
  }
}

export { urlHelper, dbHelper, authHelper, genericError };