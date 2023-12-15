import jwt from 'jsonwebtoken'

function check_jwt(token) {

    const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
        if (err) {
        } else {
            return decoded;
        }
    });

    if (decoded == undefined) {
        return false;
    }

    const role = decoded.user.role;

    if (role != "Staff" && role != 'Admin') {
        return false;
    }

    return true;
}

class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }

    getNews = async (_, res) => {
        const ret = await this.newsService.getNews();
        res.status(200).send(ret.data);
    }
}

export default NewsController;