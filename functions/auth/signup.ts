import { Handler } from '@netlify/functions';

const signup: Handler = async (event, context) => {
  try {
    if (event.httpMethod === 'POST' && (event.body)?.includes('email')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: context })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Server error' })
      }
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: error
    }
  }
};

export default signup;
