import { HandlerEvent } from '@netlify/functions';

import { genericError } from '../utils';

const handler = async (event: HandlerEvent) => {
  try {
    return {
      statusCode: 200,
      body: JSON.stringify({
        flags: [
          {
            disableSignup: process.env['LIMIT_SIGNUPS'],
          },
          {
            darkTheme: 'some string',
          }
        ]
      })
    };
  } catch (error) {
    return genericError();
  }
};

export { handler };
