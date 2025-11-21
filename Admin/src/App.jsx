import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import Login from './pages/Login/Login.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import JobSeekers from './pages/JobSeekers/JobSeekers.jsx';
import Employers from './pages/Employeers/Employers.jsx';
import Jobs from './pages/Jobs/Jobs.jsx';
import AdminMessages from './pages/Messages/Messages.jsx';
import AdminDashboard from './pages/Dashboard/Dashboard.jsx';

const App = () => {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path='/' element = <AdminDashboard /> />
        <Route path="/login" element= <Login /> />
        <Route path='/jobSeekers' element = <JobSeekers /> />
        <Route path='/employers' element = <Employers /> />
        <Route path='/jobs' element = <Jobs /> />
        <Route path='/messages' element = <AdminMessages /> />
      </Routes>
    </Router>
  )
}

export default App