"use strict";
import express from "express";
import {getChFhirServiceInstance} from "ch-fhir-services";
import {ServiceMapper} from "./ServiceMapper";
import {ServiceMapperMaster} from "../../reusable/ServiceMapperMaster";
import loggInstance from "../../util/FhirApiLogger";

let {NODE_ENV} = process.env,
  nodeEnv = NODE_ENV || "local",
  config = Object.freeze(require("../../../config/" + nodeEnv)),
  chFhirServiceInstance = getChFhirServiceInstance(
    config.logger,
    config.mongoDb,
    config.rabbitMQ,
    config.fhirValidator
  ),
  urlBase = `${config.http.protocol}://${config.http.domain}:${config.http.port}/focus`,
  serviceInstance = chFhirServiceInstance.serviceInstance,
  events = chFhirServiceInstance.events,
  loggerInstance = loggInstance,
  serviceMapperMasterIns = new ServiceMapperMaster(urlBase, loggerInstance),
  serviceMapperInstance = new ServiceMapper(
    serviceInstance, events, loggerInstance, serviceMapperMasterIns),
  router = express.Router(),
  focusfhirRoute = router.route("/fourthlevel"),
  focusParamRoute = router.route("/:resourceType/:clientSqlId");

focusParamRoute
  .get(serviceMapperInstance.retrieveResourceByIdentifier.bind(serviceMapperInstance));

focusfhirRoute
  .post(serviceMapperInstance.retrieveResourceByIdentifierMulti.bind(serviceMapperInstance));

export default router;
