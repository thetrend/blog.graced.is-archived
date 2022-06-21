import { Event } from '@netlify/functions/dist/function/event';

const urlHelper = (event: Event) => {
  const path = event.path.replace(/\/api\/+/, '');
  const segments = path.split('/').filter(segment => segment);
  const endpoint = segments[segments.length - 1];
  return endpoint;
}

export { urlHelper };