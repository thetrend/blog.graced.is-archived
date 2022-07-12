import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import validator from 'validator';
import { dbHelper, genericError } from '../utils';

// TODO: move this out to a higher level for FE-compatible usage
interface NewUser {
  email: string;
  username: string;
  password: string;
  verifiedPassword: string;
};

interface errorMessage {
  name: 'email' | 'username' | 'password' | 'verifiedPassword' | 'login';
  message: string;
};

const signup = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    if (event.httpMethod === 'POST' && (event.body)?.includes('email')) {
      let { email, username, password, verifiedPassword }: NewUser = JSON.parse(event.body);
      let errorsArray: errorMessage[] = [];

      if (!email) {
        errorsArray.push({
          name: 'email',
          message: 'Email address is required.'
        });
      }

      if (!username) {
        errorsArray.push({
          name: 'username',
          message: 'Username is required.'
        });
      } else {
        if (username.length < 2 || !validator.matches(username, /^[0-9a-zA-Z_-\s]+$/)) {
          errorsArray.push({
            name: 'username',
            message: 'Minimum username must be 2 characters and alphanumeric. Underscores, hyphens, and spaces are also allowed.'
          });
        }
      }

      if (!password) {
        errorsArray.push({
          name: 'password',
          message: 'Password is required.'
        });
      } else {
        if (!validator.isStrongPassword(password)) {
          errorsArray.push({
            name: 'password',
            message: 'Password is too weak. See minimum requirements.'
            // TODO: Docs on what makes a strong password - make them visible on FE
          });
        }
      }

      if (verifiedPassword !== password) {
        errorsArray.push({
          name: 'verifiedPassword',
          message: 'Passwords do not match.'
        });
      }

      if (errorsArray.length > 0) {
        return {
          statusCode: 200,
          body: JSON.stringify(errorsArray)
        };
      }

      const { client, q } = dbHelper(false);

      const FAUNA_COLL_USERS: string = 'users';
      const FAUNA_INDEX_USERS_EMAIL: string = 'users_by_email';

      await client.query(
        q.If(
          q.Exists(q.Collection(FAUNA_COLL_USERS)),
          null,
          q.CreateCollection({ name: FAUNA_COLL_USERS })
        )
      );

      await client.query(
        q.If(
          q.Exists(q.Index(FAUNA_INDEX_USERS_EMAIL)),
          null,
          q.CreateIndex({
            name: FAUNA_INDEX_USERS_EMAIL,
            permissions: { read: 'public' },
            source: q.Collection(FAUNA_COLL_USERS),
            terms: [{
              field: ['data', 'email']
            }],
            unique: true,
          })
        )
      );

      let signupQuery = await client.query(
        q.Create(
          q.Collection(FAUNA_COLL_USERS),
          {
            credentials: { password },
            data: {
              email,
              username,
              registerDate: Date.now()
            }
          }
        )
      )
        .then((res: any) => {
          return res.data as string;
        })
        .catch((err: any) => {
          return err.description.includes('document is not unique') ? 'User email already exists.' as string : err.description as string;
        });

      return {
        statusCode: 200,
        body: JSON.stringify({ message: signupQuery })
      };
    } else {
      return genericError();
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error as string
    };
  }
};

export default signup;
