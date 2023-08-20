const express = require('express');
const cors = require('cors');
const { create_router } = require('./router');

const NODE_PORT = process.env.NODE_PORT || 3001;

async function start_server(db) {
  const app = express();

  // Enable CORS for all requests.
  app.use(cors());

  // Define routes
  const router = create_router(db);
  app.use(router);

  // Error Handler
  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: {err: 'An error occurred'},
    };

    const errorObj = Object.assign(defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  return new Promise((resolve) => {
    const server = app.listen(NODE_PORT, () => {
      console.log(`listening on port ${NODE_PORT}`);
      resolve(server);
    });
  });
}

async function stop_server(server) {
  return new Promise((resolve) => {
    server.close(() => resolve());
  });
}

module.exports = {
  start_server,
  stop_server,
};
