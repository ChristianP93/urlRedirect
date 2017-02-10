'use strict';

import express from "express";
import bodyParser from "body-parser";
import path from "path";
import methodOverride from "method-override";
import { PORT, SERVER_NAME } from "./CONFIG/properties";
import { Client } from "./app/database/db";
import passport from 'passport';
import  auth  from './app/auth/auth';

import 'babel-polyfill';
const app = express();

const LISTENING_PORT = PORT;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(passport.initialize());

app.use(require('serve-favicon')(path.join(__dirname,"..","app","favicon.ico")));
app.use('/', express.static(path.join(__dirname, '..', 'app')));
app.use('/node_modules', express.static(path.join(__dirname, '..', 'node_modules')));

//API
import { controllerUrl } from './app/url/index'
import { controllerAuth } from './app/auth/index'
app.post('/api/v1/user/create', controllerAuth.createUser);
app.post('/api/v1/get/token', controllerAuth.getToken);

app.get('/link', controllerUrl.create);
app.get('/api/v1/url/link', auth.bearer(), controllerUrl.readAll);
app.get('/api/v1/url/link/:urlId', auth.bearer(),controllerUrl.readSingle);
app.get('/api/v1/url/userId/:userId', auth.bearer(),controllerUrl.getLinkByUser);
app.get('/api/v1/url/product/:productId', auth.bearer(),controllerUrl.getLinkByProduct);
app.get('/api/v1/url/brand/:vendorId', auth.bearer(),controllerUrl.getLinkByBrand);
app.get('/api/v1/url/user/:userId/brand/:brandId', auth.bearer(),controllerUrl.getLinkByUserToBrand); //TODO function and test
app.get('/api/v1/url/user/:userId/product/:productId', auth.bearer(), controllerUrl.getLinkByUserByProduct); //TODO function and test


const ServerListening = (req, res, next) => {
    console.log(SERVER_NAME + " [listening on port: " + LISTENING_PORT + "].");
};

const server = app.listen(LISTENING_PORT, ServerListening);

process.on( 'SIGINT', () => {
  if (server) {
    console.log('Shutting down server');
    server.close();
  }
  return process.exit();
});

export { server }
