import React, { useState, useEffect } from 'react';
import './styles/utils.css';

const ApiFactAboutCat = () => {
    const [joke, setJoke] = useState({ setup: '', punchline: '' });

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const response = await fetch('https://catfact.ninja/fact');

                const factData = await response.json();

                console.log(factData[0]);

                if (factData[0] && factData[0].setup && factData[0].punchline) {
                    setJoke({ setup: factData[0].setup, punchline: factData[0].punchline });
                } else {
                    console.error('Invalid fact data');
                }
            } catch (error) {
                console.error('Error fetching fact:', error.message);
            }
        };

        fetchFact();
    }, []);
    return (
        <div className='container'>
            <div className="joke-container">
                <p className="joke-setup">{joke.setup}</p>
                <p className="joke-punchline">{joke.punchline}</p>
            </div>
        </div>
    );
};

export default ApiFactAboutCat;