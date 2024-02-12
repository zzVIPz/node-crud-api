import 'dotenv/config';
import CrudApiServer from './src/server/server';
import { printError } from './src/utils';
import routes from './src/routes/routes';

const init = () => {
  try {
    const crudApiServer = new CrudApiServer(
      process.argv.includes('--withLoadBalancer'),
      process.env.PORT,
    );

    crudApiServer.setRoutes(routes);
  } catch (e) {
    printError(
      'Something went during starting server. Please reinstall dependencies and try again.',
    );
  }

  return;
};

init();
