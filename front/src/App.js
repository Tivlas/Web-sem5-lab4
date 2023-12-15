import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/home';
import TripDetails from './pages/tripDetails';
import EditTrip from './pages/editTrip'
import AddTrip from './pages/addTrip'
import Login from './pages/login'
import Register from './pages/register'
import FAQ from './pages/faq'
import News from './pages/news'
import axios from 'axios';
import GoogleCallback from './pages/googleCallback'

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'), 'tokentoken');
    if (token) {
      axios.post('http://localhost:8000/auth/auth', {
        headers: {
          Authorization: `${token}`,
        },
      })
        .then(response => {
          console.log(response);
          setUser(response.data);
          setLoggedInUser(response.data);
        })
        .catch(error => {
          console.error('Token verification error:', error.message, token);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedInUser(null);
    window.location.reload();
  };

  const handleLogin = (user) => {
    console.log(user, ' :user');
    setLoggedInUser(user);
  }

  return (
    <Router>
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/login" element={loggedInUser ? <Navigate to="/" /> : <Login onLogin={(user) => { setLoggedInUser(user); console.log(loggedInUser, ' jaba'); }} />} />
        <Route path="/register" element={loggedInUser ? <Navigate to="/" /> : <Register onRegister={(user) => { setLoggedInUser(user); console.log(loggedInUser); }} />} />
        <Route path="google-callback" element={<GoogleCallback onLogin={handleLogin} />} />
        <Route exact path="/add-trip" element={<AddTrip />} />
        <Route exact path="/" element={<Home loggedInUser={!!loggedInUser} onLogout={handleLogout} />} />
        <Route exact path="/edit-trip/:id" element={<EditTrip />} />
        <Route path="/trip/:id" element={<TripDetails loggedInUser={!!loggedInUser} />} />
      </Routes>
    </Router>
  );
}

export default App;