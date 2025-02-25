import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

const cwd = process.cwd();

await db();

const PORT = 3001;
const app = express();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
const activity = cwd.includes('Social Network')
  ? cwd.split('Social Network')[1]
  : cwd;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);


    app.listen(PORT, () => {
      console.log(`API server for ${activity} running on port ${PORT}!`);
    });


