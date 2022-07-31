import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import faunadb from 'faunadb';
import jwt from 'jsonwebtoken';

const urlHelper = (event: HandlerEvent) => {
  const path = event.path.replace(/\/api\/+/, '');
  const segments = path.split('/').filter(segment => segment);
  const endpoint = segments[segments.length - 1];
  return endpoint;
};

const dbHelper = (isAuthenticated: boolean = true, needsAdminPrivileges: boolean = false, needClient: boolean = false) => {
  const QUERY_DATABASE: string = process.env.DATABASE_TYPE || 'staging';
  const secret: string = needClient ? 
  `${process.env.FAUNADB_CLIENT_SECRET}:${QUERY_DATABASE}` :
  isAuthenticated ?
    `${process.env.AUTH_SECRET}:${QUERY_DATABASE}` :
    needsAdminPrivileges ?
      `${process.env.FAUNADB_ADMIN_SECRET}:${QUERY_DATABASE}:admin` :
      `${process.env.FAUNADB_SERVER_SECRET}:${QUERY_DATABASE}:server`;
  const client = new faunadb.Client({
    secret,
    domain: 'db.fauna.com',
    scheme: 'https',
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
  };
};

const nap = (duration: number) => {
  return new Promise ((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
};

export { urlHelper, dbHelper, authHelper, genericError, nap };
