import Response from '../../response.js';
import countryModule from '../country/country.module.js';
import Trip from './trip.entities.js';

class TripService {
    constructor() {
        this.trips = [];
    }

    addTrip = async (trip) => {
        if (trip.country_id == null || trip.description == null || trip.departureDate == null ||
            trip.duration == null || trip.price == null || trip.name == null)
            return new Response(null, 400, "Trip fields cannot be null");

        const country_ret = await countryModule.service.getCountry(trip.country_id);
        const country = country_ret.data;

        console.log(country);

        if (country == null)
            return new Response(null, 400, "No such country");

        const trips = await Trip.find({});

        if (trips.length == 0)
            trip.id = 0;
        else
            trip.id = trips[trips.length - 1].id + 1;


        await trip.save();
        return new Response(trip, 201, "Create Successfull");
    };

    getTrips = async (filterCountry, sort, find) => {
        var trips = await Trip.find({});

        if (filterCountry != null) {
            var _countries = await countryModule.service.getCountries();
            var countries = JSON.parse(JSON.stringify(_countries.data));
            var country = countries.find((c) => c.name == filterCountry);
            if (country != null)
                trips = trips.filter((trip) => trip.country_id == country.id);
            else
                trips = trips.filter((trip) => trip.country_id == -1);
        }

        if (sort != null) {
            if (sort == 'asc') {
                trips.sort((a, b) => {
                    if (a.price > b.price) {
                        return 1;
                    }
                    if (a.price < b.price) {
                        return -1;
                    }
                    return 0;
                });
            } else if (sort == 'desc') {
                trips.sort((a, b) => {
                    if (a.price > b.price) {
                        return -1;
                    }
                    if (a.price < b.price) {
                        return 1;
                    }
                    return 0;
                });
            }
        }

        if (find != null) {
            trips = trips.filter((trip) => trip.name.startsWith(find));
        }

        return new Response(trips, 200, "Get Successfull");
    }

    getTrip = async (id) => {
        const trip = await Trip.findOne({ id: id }, 'id name country_id duration description departureDate price');

        if (trip == null) {
            return new Response(null, 400, "No such trip");
        }

        return new Response(trip, 200, "Get successfull");
    };

    putTrip = async (id, trip) => {
        console.log(trip);
        const _trip = await Trip.findOne({ id: id }, 'id name country_id duration description departureDate price');

        if (_trip == null) {
            return new Response(null, 400, "No such trip");
        }

        console.log(trip);

        if (trip.country_id == null || trip.description == null || trip.departureDate == null ||
            trip.duration == null || trip.price == null || trip.name == null)
            return new Response(null, 400, "Trip fields cannot be null");

        const country_ret = await countryModule.service.getCountry(trip.country_id);
        const country = country_ret.data;

        console.log(country);

        if (country == null)
            return new Response(null, 400, "No such country");

        const ret = await Trip.findOneAndUpdate({ id: id }, { name: trip.name, duration: trip.duration, departureDate: trip.departureDate, price: trip.price, country_id: trip.country_id }, { new: true });

        return new Response(ret, 200, "Put successfull");
    };

    deleteTrip = async (id) => {
        const _trip = await Trip.findOne({ id: id });

        if (_trip == null)
            return new Response(null, 400, "No such trip");

        await Trip.findOneAndDelete({ id: id });

        return new Response(_trip, 200, "Delete successfull");
    }
}

export default TripService;