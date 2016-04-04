"use strict";

import express from "express";
import {getChFhirServiceInstance} from "ch-fhir-services";
import {ServiceMapper} from "./ServiceMapper";
import {ServiceMapperMaster} from "../../reusable/ServiceMapperMaster";
import {getLoggerInstance} from "ch-logger";

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../../config/" + nodeEnv)),
  chFhirServiceInstance = getChFhirServiceInstance(
    config.logger,
    config.mongoDb,
    config.rabbitMQ,
    config.fhirValidator
  ),
  uniqueIdService = chFhirServiceInstance.uniqueIdService,
  serviceInstance = chFhirServiceInstance.serviceInstance,
  events = chFhirServiceInstance.events,
  urlBase = `${config.http.protocol}://${config.http.domain}:${config.http.port}/practitioner`,
  loggerInstance = getLoggerInstance("ch-fhir-api", {
    "console": config.logger.console
  }),
  serviceMapperMasterIns = new ServiceMapperMaster(urlBase, loggerInstance),
  serviceMapperInstance = new ServiceMapper(
    serviceInstance, events, uniqueIdService, serviceMapperMasterIns, loggerInstance),
  router = express.Router(),
  practitionerRootRoute = router.route("/"),
  practitionerParamRoute = router.route("/:id");

practitionerParamRoute
  .get(serviceMapperInstance.retrievePractitioner.bind(serviceMapperInstance));

practitionerRootRoute
  .post(serviceMapperInstance.createPractitioner.bind(serviceMapperInstance));

export default router;
