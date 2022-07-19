import { HandlerEvent, HandlerResponse } from '@netlify/functions';

import { genericError, urlHelper } from '../utils';
import fetchPosts from './fetchPosts';

const handler = async (event: HandlerEvent) => {
  try {
    const endpoint = urlHelper(event);

    let response: void | HandlerResponse | PromiseLike<void | HandlerResponse>;

    switch (endpoint) {
      default:
        response = fetchPosts();
    }
    return response;
  } catch (error) {
    return genericError();
  }
};

export { handler };