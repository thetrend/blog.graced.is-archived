import { dbHelper } from '../utils';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';
import jwt from 'jsonwebtoken';
import { AuthUser, FAUNA_USERS_EMAIL_INDEX } from './types';

const login = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    let { email, password }: AuthUser = JSON.parse(event.body as string);


    let { client, q } = dbHelper(false, true);

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
      });

    return {
      statusCode: 200,
      body: JSON.stringify(loginQuery)
    };
  } catch (error: any) {
    let errorMessage = {
      name: 'login',
      message: error.description || error
    };
    return {
      statusCode: 200,
      body: JSON.stringify({
        error: errorMessage
      })
    };
  }
};

export default login;
