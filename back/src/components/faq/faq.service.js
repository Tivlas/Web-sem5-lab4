import Response from '../../response.js';
import Faq from './faq.entities.js';

class FaqService {
    constructor() {
        this.faqs = [];
    }

    getFaqs = async () => {
        var _faqs = await Faq.find({}, 'id question answer postDate');

        return new Response(_faqs, 200, "Get successfull");
    }

}

export default FaqService;