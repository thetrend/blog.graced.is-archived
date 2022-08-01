import { HandlerResponse } from '@netlify/functions';

import { dbHelper, genericError } from '../utils';

const destroyLogin = () => {
  delete process.env['TOKEN'];
  delete process.env['AUTH_SECRET'];
  return;
};

const logout = async (): Promise<HandlerResponse> => {
  if (process.env['TOKEN']) {
    destroyLogin();
    let { client, q } = dbHelper();
    await client.query(
      q.Logout(true)
    );
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ isAuthenticated: false })
  };
};

export { destroyLogin }; // FIXME: Is this needed?
export default logout;
