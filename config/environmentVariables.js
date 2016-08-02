"use strict";

// eslint disable no-var

var environmentVariables = {
  "FHIR_MONGO_CONNECTION_STRING": process.env.FHIR_MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/fhir", // "mongodb://127.0.0.1:27017/fhir"
  "FHIR_LOGGING_LEVEL": process.env.FHIR_LOGGING_LEVEL || "debug", // debug
  "FHIR_REDIS_HOST": process.env.FHIR_REDIS_HOST,
  "FHIR_REDIS_PORT": process.env.FHIR_REDIS_PORT,
  "FHIR_RABBITMQ_URL": process.env.FHIR_RABBITMQ_URL || "amqp://shakti:shakti@127.0.0.1:5672",
  "FHIR_QUEUE_NAME": process.env.FHIR_QUEUE_NAME || "test",
  "FHIR_EXCHANGE_NAME": process.env.FHIR_EXCHANGE_NAME || "test-cantaHealth",
  "FHIR_PREFETCH_COUNT": process.env.FHIR_PREFETCH_COUNT || 1,
  "NODE_BRIDGE_QUEUE_COUNT": process.NODE_BRIDGE_QUEUE_COUNT || 1,
  "API_SECRET_KEY": process.env.API_SECRET_KEY || "SECRETKEY"
};

module.exports = environmentVariables;

// eslint enable no-var
