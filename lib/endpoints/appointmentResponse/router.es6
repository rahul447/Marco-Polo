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
  uniqueIdService = chFhirServiceInstance.uniqueIdService,
  serviceInstance = chFhirServiceInstance.serviceInstance,
  events = chFhirServiceInstance.events,
  urlBase = `${config.http.protocol}://${config.http.domain}:${config.http.port}/appointmentRes`,
  loggerInstance = loggInstance,
  serviceMapperMasterIns = new ServiceMapperMaster(urlBase, loggerInstance),
  serviceMapperInstance = new ServiceMapper(
    serviceInstance, events, uniqueIdService, serviceMapperMasterIns, loggerInstance),
  router = express.Router(),
  appointmentResRootRoute = router.route("/"),
  appointmentResParamRoute = router.route("/:id");

appointmentResParamRoute
  .get(serviceMapperInstance.retrieveAppointmentRes.bind(serviceMapperInstance));

appointmentResRootRoute
  .post(serviceMapperInstance.createAppointmentRes.bind(serviceMapperInstance));

export default router;
