import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const EditTripForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        country_id: 0,
        duration: 1,
        description: '',
        departureDate: '',
        price: 0,
    });
    const [countries, setCountries] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            try {
                const tripResponse = await axios.get(`http://localhost:8000/trip/${id}`, {
                    headers: {
                        Authorization: token,
                    },
                });

                const countriesResponse = await axios.get(`http://localhost:8000/country`);

                setFormData({
                    name: tripResponse.data.name,
                    country_id: tripResponse.data.country_id,
                    duration: tripResponse.data.duration,
                    description: tripResponse.data.description,
                    departureDate: tripResponse.data.departureDate,
                    price: tripResponse.data.price,
                });

                setCountries(countriesResponse.data);
            } catch (error) {
                console.error('Error fetching details:', error.message);
            }
        };

        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            console.log(formData);
            await axios.put(`http://localhost:8000/trip/${id}`, formData, {
                headers: {
                    Authorization: token,
                },
            });

            navigate(`/trip/${id}`);
        } catch (error) {
            console.error('Error editing trip:', error.message);

            if (error.response && error.response.data) {
                setFormError(error.response.data);
            } else {
                setFormError('Error editing trip. Please try again.');
            }
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <label className="form-label">
                Name:
                <input
                    className="form-input"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
            </label>

            <label className="form-label">
                Description:
                <input
                    className="form-input"
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </label>

            <label className="form-label">
                Price:
                <input
                    className="form-input"
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </label>

            <label className="form-label">
                Departure date:
                <input
                    className="form-textarea"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                />
            </label>

            <label className="form-label">
                Country:
                <select
                    className="form-select"
                    name="country_id"
                    value={formData.country_id}
                    onChange={handleChange}
                >
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </label>

            <button className="form-button" type="submit">
                Update trip.
            </button>

            {formError && <p className="form-error">{formError}</p>}
        </form>
    );
};

export default EditTripForm;