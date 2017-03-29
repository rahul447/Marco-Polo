"use strict";

// eslint disable no-var

var environmentVariables = {
  "NODE_ENV": process.env.NODE_ENV || "test"    // test (for mocha)  , dev
};

module.exports = environmentVariables;

// eslint enable no-var
