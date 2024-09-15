// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css"
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import About from './components/About/About';
import FAQ from './components/FAQ/FAQ';
import Chatbot from './components/ChatBot/Chatbot';
import AddFAQForm from './components/FAQ/AddFAQForm';
import Welcome from './components/Welcome/Welcome';
import Translator from './components/Translator/Translator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/chatbot" element={< Chatbot />} />
        <Route path="/new" element={< AddFAQForm />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/translator" element={< Translator />} />
      </Routes>
    </Router>
  );
}

export default App;
