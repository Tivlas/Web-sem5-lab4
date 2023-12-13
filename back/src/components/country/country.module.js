import CountryController from './country.controller.js';
import CountryService from './country.service.js';
import CountryRouter from './country.router.js';

const countryService = new CountryService();
const countryController = new CountryController(countryService);
const countryRouter = new CountryRouter(countryController);

export default {
    service: countryService,
    controller: countryController,
    router: countryRouter.getRouter(),
};