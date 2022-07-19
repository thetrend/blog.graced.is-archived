import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import jwt from 'jsonwebtoken';
import { AuthError, IAuthUser } from '../../src/contexts/auth/AuthTypes';
import { dbHelper } from '../utils';

const login = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    let { email, password }: IAuthUser = JSON.parse(event.body as string);

    let errorsArray: AuthError[] = [];

    let { client, q } = dbHelper(false);
    const FAUNA_INDEX_USERS_EMAIL: string = 'users_by_email';

    let loginQuery = await client.query(
      q.Login(
        q.Match(
          q.Index(FAUNA_INDEX_USERS_EMAIL),
          email
        ),
        { password }
      )
    )
      .then((res: any) => {
        process.env['TOKEN'] = jwt.sign(
          { faunaSecret: res.secret },
          process.env['NETLIFY_JWT_SECRET'] as string,
          { expiresIn: '1h' }
        );
        process.env['AUTH_SECRET'] = res.secret;
        return { 
          token: process.env['TOKEN'],
          isAuthenticated: true,
        };
      })
      .catch((err: any) => {
        errorsArray.push({
          name: 'login',
          message: err.message.includes('ECONNRESET') ?
            'Server failure' : 
            err.message
        });
        return {
          errors: errorsArray,
          isAuthenticated: false,
        };      
      });

    return {
      statusCode: 200,
      body: JSON.stringify(loginQuery)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error as string
    };
  }
};

export default login;
