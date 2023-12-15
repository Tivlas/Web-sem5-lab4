import React, { useState, useEffect } from 'react';
import './styles/utils.css';

const ApiFactAboutCat = () => {
  const [fact, setFact] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoginStatus = () => {
    // Perform the necessary logic to determine the user's login status
    // Return true if the user is logged in, false otherwise
    // Example:
    return localStorage.getItem('accessToken') !== null;
  };

  useEffect(() => {
    const fetchFact = async () => {
      try {
        const response = await fetch('https://catfact.ninja/fact');
        const factData = await response.json();

        if (factData.fact) {
          setFact(factData.fact);
        } else {
          console.error('Invalid fact data');
        }
      } catch (error) {
        console.error('Error fetching fact:', error.message);
      }
    };

    fetchFact();
    setIsLoggedIn(checkLoginStatus());
  }, []);

  return (
    <div className='container'>
      {isLoggedIn ? (
        <div className="fact-container">
          <p className="fact-text">{fact}</p>
        </div>
      ) : (
        <p>Please log in to view the cat fact.</p>
      )}
    </div>
  );
};

export default ApiFactAboutCat;