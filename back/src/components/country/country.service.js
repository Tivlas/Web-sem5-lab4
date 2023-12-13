import Response from '../../response.js';
import Contry from './country.entities.js';

class CountryService {
    constructor() {
        this.countries = [];
    }

    addCountry = async (country) => {
        console.log(country);

        if (country.name == null) {
            return new Response(null, 400, "Name cannot be null");
        }

        const countries = await Contry.find({});

        if (countries.length == 0)
            country.id = 0;
        else
            country.id = countries[countries.length - 1].id + 1;

        this.countries.push(country);

        await country.save();

        return new Response(country, 201, "Create successfull");
    };

    getCountries = async () => {
        var _countries = await Contry.find({}, 'id name');

        return new Response(_countries, 200, "Get successfull");
    }

    getCountry = async (id) => {

        console.log(id);
        const country = await Contry.findOne({ id: id }, 'id name');
        console.log(country);

        if (country == null)
            return new Response(null, 400, "No such country");

        return new Response(country, 200, "Get successfull");
    };
}

export default CountryService;