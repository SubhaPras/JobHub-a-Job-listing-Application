import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import Login from './pages/Login/Login.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero.jsx';
import JobSeekers from './pages/JobSeekers/JobSeekers.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element = <Hero /> />
        <Route path="/login" element= <Login /> />
        <Route path='/jobSeekers' element = <JobSeekers /> />
      </Routes>
    </Router>
  )
}

export default App