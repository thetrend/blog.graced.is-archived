import { HandlerEvent } from '@netlify/functions';

import { genericError, urlHelper } from '../utils';
import countUsers from './countUsers';

const handler = async (event: HandlerEvent) => {
  try {
    const endpoint = urlHelper(event);

    let response;

    switch (endpoint) {
      case 'count':
        response = countUsers(event);
        break;
      default:
        // TODO: redirect this to /api/users/me which will show the authenticated user's profile
        response = {
          statusCode: 200,
          body: JSON.stringify({ message: 'hello world' })
        }
    }
    return response;
  } catch (error) {
    return genericError();
  }
};

export { handler };
