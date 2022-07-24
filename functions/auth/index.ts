import { HandlerEvent } from '@netlify/functions';

import { authHelper as authenticate, genericError, urlHelper } from '../utils';
import login from './login';
import loadID from './loadID';
import logout from './logout';
import signup from './signup';

const handler = async (event: HandlerEvent) => {
  try {
    const endpoint = urlHelper(event);

    let response;

    switch (endpoint) {
      case 'signup':
        response = signup(event);
        break;
      case 'login':
        response = login(event);
        break;
      case 'me':
        response = loadID(event);
        break;
      case 'logout':
        response = logout();
        break;
      default:
        response = genericError();
    }
    return response;
  } catch (error) {
    return genericError();
  }
};

export { handler };
