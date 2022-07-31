import { dbHelper, genericError, nap } from '../utils';
import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import axios from 'axios';
import validator from 'validator';
import { API_AUTH_URL, AuthError, AuthUser } from './types';
import { API_USERS_URL } from '../users/types';

const signup = async (event: HandlerEvent): Promise<HandlerResponse> => {
  try {
    let countQuery = await axios.get(`${process.env['URL']}${API_USERS_URL}/count`)
      .then(res => res.data.count)
      .catch(err => console.log(err));

    if (event.httpMethod !== 'POST') {
      return genericError();
    }
    let { email, username, password, verifiedPassword }: AuthUser = JSON.parse(event?.body as any); // TODO: kill this any
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
        q.Exists(q.Role('contributors')),
        null,
        q.CreateRole({
          name: 'contributors',
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

    let signupLock = (countQuery > 0 && process.env['LIMIT_SIGNUPS']) ? true : false;

    console.log('context is', process.env['CONTEXT']);

    let signupQuery = signupLock ? { message: 'Signups are disabled at this time.' } : await client.query(
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
      .then(async () => { if (process.env['CONTEXT'] !== 'dev') await nap(2000); })
      .then(async () => {
        return await axios.post(`${process.env['URL']}${API_AUTH_URL}/login`, { email, password })
          .then(res => res.data);
      })
      .catch((err: any) => {
        const error: string = err.description.includes('document is not unique') ? 'User email already exists.' : err.description;
        return {
          message: error
        };
      });
    return {
      statusCode: 200,
      body: JSON.stringify(signupQuery)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error })
    };
  }
};

export default signup;
