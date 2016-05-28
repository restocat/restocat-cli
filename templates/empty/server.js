'use strict';

const isRelease = process.argv.length === 3 ? process.argv[2] === 'release' : undefined;
const bodyParser = require('body-parser');
const Restocat = require('restocat');
const config = {isRelease};
const rest = new Restocat(config);
const server = rest.createServer();

// Register logger
const Logger = require('restocat-logger');
const logger = Logger.register(rest.locator);

// Register connect-style middleware
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server
  .listen(3000)
  .then(() => logger.info('Restocat listen on 3000 port'))
  .catch(reason => logger.error(reason));