import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import './styles/tripDetails.css';

const TripDetails = ({ loggedInUser }) => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [country, setCountry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTripDetails = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get(`http://localhost:8000/trip/${id}`);
                setTrip(response.data);
                console.log("RESPONSE", response);
                const countryId = response.data.country_id;
                console.log("CID", countryId);
                if (countryId != null && countryId != undefined) {
                    const countryResponse = await axios.get(`http://localhost:8000/country/${countryId}`);
                    console.log(countryResponse);
                    setCountry(countryResponse.data.name);
                }
            } catch (error) {
                console.error('Error fetching trip details:', error.message);
            }
        };


        fetchTripDetails();
    }, [id,]);


    const handleDeleteTrip = async () => {
        try {
            const token = localStorage.getItem('token');
            const resp = await axios.delete(`http://localhost:8000/trip/${id}`, {
                headers: {
                    Authorization: token
                },
            });
            console.log(resp);
            navigate("/");

        } catch (error) {
            console.error('Error deleting trip:', error.message);
        }
    };

    if (!trip) {
        return <p>Loading...</p>;
    }
    return (

        <div><Header />
            <div className="containerr">

                <p className="trip-detailsss">Name: {trip.name}</p>
                <p className="trip-detailsss">Description: {trip.description}</p>
                <p className="trip-detailsss">Country: {country || 'Unknown'}</p>
                <p className="trip-detailsss">Price: {trip.price}</p>
                <p className="trip-detailsss">Departure date: {trip.departureDate}</p>

                {loggedInUser && (
                    <button className="trip-detailss" onClick={handleDeleteTrip}>Delete trip</button>
                )}
                {loggedInUser && (
                    <Link to={`/edit-trip/${id}`}>
                        <button className="trip-detailss">Edit trip</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default TripDetails;