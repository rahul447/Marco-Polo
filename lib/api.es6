"use strict";

import express from "express";
import routes from "./routes/index";
import bodyParser from "body-parser";
import ApiError from "./util/apiError";
import mwAllowCrossDomain from "./middleware_services/mwAllowCrossDomain";
import mwErrorHandler from "./middleware_services/mwErrorHandler";
import cluster from "cluster";
import os from "os";

let nodeEnv = "local",
  config = Object.freeze(require("../config/" + nodeEnv)),
  app = express();

console.log(" NODE_ENV Set as", config.nodeEnv);

if (config.nodeEnv !== 'test') {
  if (cluster.isMaster) {
    let numWorkers = os.cpus().length;
    console.log('Master cluster setting up ' + numWorkers + ' workers...');
    // Fork workers.
    for(let i = 0; i < numWorkers; i++) {
      cluster.fork();
    }

    cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
    });

  } else {
    serverSetup();
  }
} else {
  serverSetup();
}

function serverSetup() {
  //parse application/json and look for raw text
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.text());
  app.use(bodyParser.json({type: 'application/json'}));
  app.use(mwAllowCrossDomain);
  app.use(mwErrorHandler);
  app.use('/', routes());

  // Sets the relevant config app-wise
  app.set("port", config.http.port);

  app.use(function resourceNotFound(req, res, next) {
    let apiError = new ApiError(req.id, "Error", [`Resource doesn't exists for RequestId ${req.id}`], "", 404);

    next(apiError);
  });

  // Starts the app
  app.listen(app.get("port"), () => {
    console.log(new Date(), "Server has started and is listening on port: " + app.get("port") + ' with process '
      + process.pid);
  });
}

module.exports = app; // for testing