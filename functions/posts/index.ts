import { HandlerEvent } from '@netlify/functions';

import { genericError, urlHelper, authHelper as authenticate } from '../utils';
import fetchPosts from './fetchPosts';
import createPost from './createPost';

const handler = async (event: HandlerEvent) => {
  try {
    const endpoint = urlHelper(event);

    let response;

    switch (endpoint) {
      case 'create':
        response = (event: HandlerEvent) => createPost(event);
        break;
      default:
        response = fetchPosts();
    }
    const authLinks = ['create'];
    if (authLinks.includes(endpoint)) {
      return authenticate(event, response);
    }
    return response;
  } catch (error) {
    return genericError();
  }
};

export { handler };