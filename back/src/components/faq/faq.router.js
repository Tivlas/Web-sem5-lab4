
import express from 'express';

class FaqRouter {
    constructor(faqController) {
        this.faqController = faqController;
    }

    getRouter() {
        const router = express.Router();
        router.route('/').get(this.faqController.getFaqs);
        return router;
    }
}

export default FaqRouter;