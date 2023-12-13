import Country from './country.entities.js';
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

class CountryController {
    constructor(countryService) {
        this.countryService = countryService;
    }

    createCountry = async (req, res) => {
        const token = req.get('Authorization');

        if (!check_jwt(token))
            return res.status(403).send('Forbidden');

        const country = new Country({ name: req.body.name });
        console.log(country);
        const ret = await this.countryService.addCountry(country);

        if (ret.data == null)
            return res.status(ret.status_code).send(ret.msg);

        return res.status(ret.status_code).send(ret.data);
    };

    getCountries = async (_, res) => {
        const ret = await this.countryService.getCountries();
        res.status(200).send(ret.data);
    }

    getCountry = async (req, res) => {
        const { id } = req.params;
        const ret = await this.countryService.getCountry(id);
        if (ret.data == null)
            return res.status(ret.status_code).send(ret.msg);



        return res.status(ret.status_code).send(ret.data);
    };
}

export default CountryController;