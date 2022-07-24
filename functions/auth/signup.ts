import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import validator from 'validator';
import { AuthError, IAuthUser } from '../../src/contexts/auth/AuthTypes';
import { dbHelper, genericError } from '../utils';

const signup = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    if (event.httpMethod === 'POST' && (event.body)?.includes('email')) {
      let { email, username, password, verifiedPassword }: IAuthUser = JSON.parse(event.body);
      let errorsArray: AuthError[] = [];

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

      const { client, q } = dbHelper(false, true);

      // TODO: MOVE THESE CONSTANTS OUT
      const FAUNA_COLL_USERS: string = 'users';
      const FAUNA_INDEX_USERS_EMAIL: string = 'users_by_email';
      const FAUNA_ALL_USERS: string = 'all_users';

      const FAUNA_COLL_POSTS: string = 'posts';
      const FAUNA_ALL_POSTS: string = 'all_posts';

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

      await client.query(
        q.If(
          q.Exists(q.Index(FAUNA_ALL_USERS)),
          null,
          q.CreateIndex({
            name: FAUNA_ALL_USERS,
            permissions: { read: 'public' },
            source: q.Collection(FAUNA_COLL_USERS),
          })
        )
      );

      await client.query(
        q.If(
          q.Exists(q.Collection(FAUNA_COLL_POSTS)),
          null,
          q.CreateCollection({ name: FAUNA_COLL_POSTS })
        )
      );

      await client.query(
        q.If(
          q.Exists(q.Index(FAUNA_ALL_POSTS)),
          null,
          q.CreateIndex({
            name: FAUNA_ALL_POSTS,
            permissions: { read: 'public' },
            source: q.Collection(FAUNA_COLL_POSTS),
          })
        )
      );

      await client.query(
        q.If(
          q.Exists(q.Role('crud_posts')),
          null,
          q.CreateRole({
            name: 'crud_posts',
            membership: [
              {
                resource: q.Collection(FAUNA_COLL_USERS),
              }
            ],
            privileges: [
              {
                resource: q.Collection(FAUNA_COLL_POSTS),
                actions: {
                  create: true,
                  read: true,
                  delete: true,
                  write: true,
                  history_read: true,
                  history_write: true,
                }
              }
            ]
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
    }
    return genericError();
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    };
  }
};

export default signup;
