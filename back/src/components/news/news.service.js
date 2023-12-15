import Response from '../../response.js';
import News from './news.entities.js';

class NewsService {
    constructor() {
        this.news = [];
    }

    getNews = async () => {
        var _news = await News.find({}, 'id title briefDescription url');

        return new Response(_news, 200, "Get successfull");
    }

}

export default NewsService;