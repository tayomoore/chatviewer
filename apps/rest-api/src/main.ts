import userRouter from './routers/v1/userRouter';
import { db_initializer } from './utilities';
import * as express from 'express';
import * as cors from "cors";

/**
 * Main function to start the server.
 */
async function main() {
  // initialize the database and sync models
  try {
    console.log('Initializing the database... ↻');
    await db_initializer();
    console.log('Database initialized ✓');
  } catch (error) {
    console.log(`Failed ❌ ${error}\n`);
    process.exit(1);
  }

  // get the server port from variable
  const port = process.env.SERVER_PORT || 3000;

  // create a new express application
  const app = express();

  // middleware to handle json body
  app.use(express.json());

  // middleware to handle CORS
  app.use(cors());

  // start the express application
  app.listen(port, () => {
    console.log(`Server started!, Click Below Link`);
    console.log(`http://localhost:${port}`);
  });

  // add the user router
  app.use('/api/v1/users', userRouter);

  // add the error handler
  app.get('/', (req, res) => {
    res.send('Hey, welcome to the API!');
  });
}

// start the server
if (require.main === module) {
  main().then(() => {
    console.log('Start using the API!');
  });
}