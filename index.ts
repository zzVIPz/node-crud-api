import 'dotenv/config';
import CrudApiServer from './src/api/server';
import { print, printError } from './src/utils/print';

const init = () => {
  try {
    const PORT = process.env.PORT;
    const crudApiServer = new CrudApiServer();

    crudApiServer.listen(PORT, () => print(`Server started on PORT ${PORT}`, 'green'));
  } catch (e) {
    printError(
      'Something went during starting server. Please reinstall dependencies and try again.',
    );
  }
};

init();
