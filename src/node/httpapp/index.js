import express from 'express';
import { Server } from 'http';
import path from 'path';

const app = express();
const http = Server(app);
let server;

function start(port, staticAssetsDirectory, callback) {
  const staticPath = path.resolve(__dirname, '../../../', staticAssetsDirectory);
  app.use(express.static(staticPath));
  server = http.listen(port || 3000, () => {
    if (callback) callback();
  });
}

function stop() {
  if (server) {
    server.close();
  }
}

export default {
  start,
  stop,
  app,
  http,
};
