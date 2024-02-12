import 'dotenv/config';
import CrudApiServer from './src/server/server';
import { print, printError } from './src/utils/print';
import routes from './src/routes/routes';

const init = () => {
  try {
    const PORT = process.env.PORT;
    const crudApiServer = new CrudApiServer();

    crudApiServer.setRoutes(routes);

    crudApiServer.listen(PORT, () => print(`Server started on PORT ${PORT}`, 'green'));
  } catch (e) {
    printError(
      'Something went during starting server. Please reinstall dependencies and try again.',
    );
  }
};

init();
