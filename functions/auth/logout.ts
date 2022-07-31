import { HandlerResponse } from '@netlify/functions';

import { dbHelper, genericError } from '../utils';

const destroyLogin = () => {
  delete process.env['TOKEN'];
  delete process.env['AUTH_SECRET'];
  return;
};

const logout = async (): Promise<HandlerResponse> => {
  let { client, q } = dbHelper();
  try {
    destroyLogin();
    await client.query(
      q.Logout(true)
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ isAuthenticated: false })
    };
  } catch (error) {
    return genericError();
  };
};

export { destroyLogin }; // FIXME: Is this needed?
export default logout;
