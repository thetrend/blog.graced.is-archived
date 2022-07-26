import { dbHelper } from '../utils';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { AuthError, AuthUser, FAUNA_USERS_EMAIL_INDEX } from './types';

const login = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    let { email, password }: AuthUser = JSON.parse(event.body as string);

    let errorsArray: AuthError[] = [];

    let { client, q } = dbHelper(false);

    let loginQuery = await client.query(
      q.Login(
        q.Match(
          q.Index(FAUNA_USERS_EMAIL_INDEX),
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
