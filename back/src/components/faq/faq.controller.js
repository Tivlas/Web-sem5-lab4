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

class FaqController {
    constructor(faqService) {
        this.faqService = faqService;
    }

    getFaqs = async (_, res) => {
        const ret = await this.faqService.getFaqs();
        res.status(200).send(ret.data);
    }
}

export default FaqController;