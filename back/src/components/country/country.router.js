
import express from 'express';

class CountryRouter {
    constructor(countryController) {
        this.countryController = countryController;
    }

    getRouter() {
        const router = express.Router();
        router.route('/:id').get(this.countryController.getCountry);
        router.route('/').get(this.countryController.getCountries);
        router.route('/').post(this.countryController.createCountry);
        return router;
    }
}

export default CountryRouter;