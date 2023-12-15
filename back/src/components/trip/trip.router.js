
import express from 'express';

class TripRouter {
  constructor(tripController) {
    this.tripController = tripController;
  }

  getRouter() {
    const router = express.Router();
    router.route('/:id').get(this.tripController.getTrip);
    router.route('/:id').put(this.tripController.putTrip);
    router.route('/:id').delete(this.tripController.deleteTrip);
    router.route('/').get(this.tripController.getTrips);
    router.route('/').post(this.tripController.createTrip);
    return router;
  }
}

export default TripRouter;