// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import DetailedFeedback from './DetailedFeedback';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import AddFeedback from './AddFeedback';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app d-flex flex-column min-vh-100">
        <Header />
        <br />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/feedback/:id" element={<DetailedFeedback />} />
            <Route path="/add-feedback" element={<AddFeedback />} />
          </Routes>
        </main>
        <br />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
