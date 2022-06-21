import { HandlerContext, HandlerEvent, HandlerResponse } from '@netlify/functions';

import { urlHelper } from '../utils';
import signup from './signup';

const handler = async (event: HandlerEvent, context: HandlerContext) => {
  try {
    const endpoint = urlHelper(event);

    let response: void | HandlerResponse | PromiseLike<void | HandlerResponse>;

    switch (endpoint) {
      case 'signup':
        response = signup(event, context);
        break;
      case 'login':
      case 'logout':
      default:
        response = {
          statusCode: 400,
          body: JSON.stringify({ message: 'whoops' })
        };
    }
    return response;
  } catch (error) {
    return {
      statusCode: 500,
      body: 'oh shit'
    };
  }
};

export { handler };
