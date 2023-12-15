import NewsController from './news.controller.js';
import NewsService from './news.service.js';
import NewsRouter from './news.router.js';

const newsService = new NewsService();
const newsController = new NewsController(newsService);
const newsRouter = new NewsRouter(newsController);

export default {
    service: newsService,
    controller: newsController,
    router: newsRouter.getRouter(),
};