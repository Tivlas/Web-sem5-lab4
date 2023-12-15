import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import './styles/faq.css';

const FAQ = () => {
    const [faq, setFaq] = useState([]);

    useEffect(() => {
        const fetchFaq = async () => {
            try {
                const response = await axios.get('http://localhost:8000/faq');
                setFaq(response.data);
            } catch (error) {
                console.error('Error fetching faqs:', error.message);
            }
        };

        fetchFaq();
    }, []);

    return (
        <div>
            <Header />
            <div className="faq-container">
                {faq.map((item) => (
                    <div key={item.id} className="faqs">
                        <details>
                            <summary><span className="faq_question">{item.question}</span></summary>
                            <p className="faq_answer">{item.answer}</p>
                        </details>
                        <p className="faq_postDate">{item.postDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;