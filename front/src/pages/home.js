import { Link } from 'react-router-dom';
import TripList from '../components/tripList';
import ApiJoke from '../components/apiJoke';
import ApiImage from '../components/apiFactAboutCat';
import Header from '../components/header';
import { useLocation } from 'react-router-dom';

import './styles/utils.css';

const Home = ({ loggedInUser, onLogout }) => {
    console.log(loggedInUser, "jaba2");
    const location = useLocation();
    return (
        <div>
            <Header logout={onLogout} />

            <TripList />
            <div className='container'>
                {loggedInUser && <Link to="/add-trip" className="add-trip-link">Add trip</Link>}
            </div>

            <ApiJoke />
            <ApiImage />
        </div>
    );
};

export default Home;