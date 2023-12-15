import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/tripList.css';

const TripList = () => {
    const [trips, setTrips] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCountryId, setSelectedCountryId] = useState('');
    const [find, setFind] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            console.log('msg', localStorage.getItem('msg'));
            try {
                let url = 'http://localhost:8000/trip';

                if (sortOption) {
                    url += `?sort=${sortOption}`;
                }

                console.log(selectedCountry);
                if (selectedCountry != null && selectedCountry != 'All' && selectedCountry != '') {
                    if (sortOption) {
                        url += `&filterCountry=${selectedCountry}`;
                    } else {
                        url += `?filterCountry=${selectedCountry}`;
                    }
                }

                if (find != null && find != '') {
                    if (sortOption || (selectedCountry != null && selectedCountry != 'All' && selectedCountry != '')) {
                        url += `&find=${find}`;
                    } else {
                        url += `?find=${find}`;
                    }
                }

                console.log(url);

                const response = await axios.get(url);
                console.log(response);
                setTrips(response.data);
            } catch (error) {
                console.error('Error fetching trips:', error.message);
            }
        };

        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://localhost:8000/country');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error.message);
            }
        };

        fetchData();
        fetchCountries();
    }, [sortOption, selectedCountry, find]);

    const handleSortChange = (newSortOption) => {
        setSortOption(newSortOption);
    };

    const handleCountryChange = (event) => {
        var index = event.nativeEvent.target.selectedIndex;
        setSelectedCountry(event.nativeEvent.target[index].text);
        setSelectedCountryId(event.target.value);
    };

    const handleFindChange = (event) => {
        setFind(event.target.value);
    }

    return (
        <div className="container">
            <div className="sort-buttons">
                <button onClick={() => handleSortChange('asc')}>Sort by Price (Asc)</button>
                <button onClick={() => handleSortChange('desc')}>Sort by Price (Desc)</button>
                <select id="countrySelect" onChange={handleCountryChange} value={selectedCountryId}>
                    <option value="">All</option>
                    {countries.map((country) => (
                        <option className='select-dropdown__list-item' key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <input type="text" onChange={handleFindChange} />
            </div>
            <div className="listTripCenter">
                <ul className="trip-list">
                    {trips.map((trip) => (
                        <li key={trip.id} className="trip-item">
                            <Link to={`/trip/${trip.id}`} className="trip-link">
                                <p className="trip-details">{trip.name} {trip.description}</p>
                            </Link>
                            <p className="trip-price">Price: {trip.price}$</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TripList;