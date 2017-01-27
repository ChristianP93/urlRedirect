'use strict';

// var babel = require("babel-core");

import express from "express";
import bodyParser from "body-parser";
import { PORT, SERVER_NAME } from "./CONFIG/properties";
import { Client } from "./app/database/db";

// const client = Client.connect();
const app = express();

const LISTENING_PORT = PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//API
import { controllerUrl } from './app/url/index'
app.get('/link', controllerUrl.create); //TODO test
app.get('/api/v1/url/link', controllerUrl.readAll); //TODO test
app.get('/api/v1/url/link/:urlId', controllerUrl.readSingle); //TODO test
app.get('/api/v1/url/userId/:userId', controllerUrl.getLinkByUser); //TODO test
app.get('/api/v1/url/product/:productId', controllerUrl.getLinkByProduct); //TODO test
app.get('/api/v1/url/brand/:vendorId', controllerUrl.getLinkByBrand); //TODO test
app.get('/api/v1/url/user/:userId/brand/:brandId', controllerUrl.getLinkByUserToBrand); //TODO function and test
app.get('/api/v1/url/user/:userId/product/:productId', controllerUrl.getLinkByUserByProduct); //TODO function and test


const ServerListening = (req, res, next) => {
    console.log(SERVER_NAME + " [listening on port: " + LISTENING_PORT + "].");
};


const server = app.listen(LISTENING_PORT, ServerListening);

process.on( 'SIGINT', () => {
  if (server) {
    console.log('Shutting down server');
    server.close();
  }
  // if (client) {
  //   console.log('Shutting down connection with postgres');
  //   Client.end();
  // }
  return process.exit();
});

export { server }
