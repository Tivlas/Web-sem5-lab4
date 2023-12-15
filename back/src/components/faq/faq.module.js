import FaqController from './faq.controller.js';
import FaqService from './faq.service.js';
import FaqRouter from './faq.router.js';

const faqService = new FaqService();
const faqController = new FaqController(faqService);
const faqRouter = new FaqRouter(faqController);

export default {
    service: faqService,
    controller: faqController,
    router: faqRouter.getRouter(),
};