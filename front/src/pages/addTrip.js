import React from 'react';
import AddTripForm from '../components/addTripForm';
import { useNavigate } from "react-router-dom";

const AddTripPage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <AddTripForm />
        </div>
    );
};

export default AddTripPage;