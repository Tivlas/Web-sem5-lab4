import express from 'express';

class NewsRouter {
    constructor(newsController) {
        this.newsController = newsController;
    }

    getRouter() {
        const router = express.Router();
        router.route('/').get(this.newsController.getNews);
        return router;
    }
}

export default NewsRouter;