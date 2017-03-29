"use strict";

// eslint disable no-var

var environmentVariables = require("./environmentVariables"),
  config = {
    "http": {
      "protocol": "http",
      "domain": "127.0.0.1",
      "port": 8050
    },
    "appName": "marco-polo",
    "nodeEnv": environmentVariables.NODE_ENV
  };

module.exports = config;

// eslint enable no-var
