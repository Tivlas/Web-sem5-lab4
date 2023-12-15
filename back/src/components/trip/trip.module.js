import TripController from './trip.controller.js';
import TripService from './trip.service.js';
import TripRouter from './trip.router.js';

const tripService = new TripService();
const tripController = new TripController(tripService);
const tripRouter = new TripRouter(tripController);

export default {
  service: tripService,
  controller: tripController,
  router: tripRouter.getRouter(),
};