import Trip from './trip.entities.js';
import jwt, { decode } from 'jsonwebtoken';

function check_jwt(token) {

    const decoded = jwt.verify(token, 'privatekey', (err, decoded) => {
        if (err) {
        } else {
            return decoded;
        }
    });
    console.log(decoded);
    if (decoded == undefined) {
        return false;
    }

    return true;
}

class TripController {
    constructor(tripService) {
        this.tripService = tripService;
    }

    createTrip = async (req, res) => {
        const token = req.get('Authorization');

        if (!check_jwt(token))
            return res.status(403).send('Forbidden');
        const trip = new Trip({ name: req.body.name, duration: req.body.duration, departureDate: req.body.departureDate, price: req.body.price, country_id: req.body.country_id, description: req.body.description });
        console.log(trip);
        if (req.body.price < 0) {
            return res.status(404).send('Price cannot be negative');
        }

        if (req.body.duration != 1 && req.body.duration != 2 && req.body.duration != 4) {
            return res.status(404).send('Duration cannot be negative');
        }

        const ret = await this.tripService.addTrip(trip);

        if (ret.data == null)
            return res.status(ret.status_code).send(ret.msg);

        return res.status(ret.status_code).send(ret.data);
    };

    getTrips = async (req, res) => {
        const filterCountry = req.query.filterCountry;
        const sort = req.query.sort;
        const find = req.query.find;

        const ret = await this.tripService.getTrips(filterCountry, sort, find);
        return res.status(ret.status_code).send(ret.data);
    }

    getTrip = async (req, res) => {
        const { id } = req.params;

        const ret = await this.tripService.getTrip(id);

        if (ret.data == null)
            return res.status(ret.status_code).send(ret.msg);

        return res.status(ret.status_code).send(ret.data);
    };

    putTrip = async (req, res) => {
        const { id } = req.params;

        if (req.body.price < 0) {
            return res.status(404).send('Price cannot be negative');
        }

        if (req.body.duration != 1 && req.body.duration != 2 && req.body.duration != 4) {
            return res.status(404).send('Duration cannot be negative');
        }

        const token = req.get('Authorization');

        if (!check_jwt(token))
            return res.status(403).send('Forbidden');

        const trip = new Trip({ name: req.body.name, duration: req.body.duration, departureDate: req.body.departureDate, price: req.body.price, country_id: req.body.country_id, description: req.body.description });
        const ret = await this.tripService.putTrip(id, trip);

        if (ret.data == null)
            return res.status(ret.status_code).send(ret.msg);

        return res.status(ret.status_code).send(ret.data);
    };

    deleteTrip = async (req, res) => {
        const token = req.get('Authorization');

        if (!check_jwt(token))
            return res.status(403).send('Forbidden');

        const { id } = req.params;
        const ret = await this.tripService.deleteTrip(id);

        if (ret.data == null)
            return res.status(ret.status_code).send(ret.msg);

        return res.status(ret.status_code).send(ret.data);
    };
}

export default TripController;