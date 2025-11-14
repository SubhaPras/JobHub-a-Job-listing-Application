import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Home from "./pages/Home/Home.jsx";
import Register from "./pages/Register/Register.jsx";
import Login from "./pages/Login/Login.jsx";
import Jobs from "./pages/Jobs/Jobs.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import JobDetails from "./pages/JobDetail/JobDetails.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import MyApplications from "./pages/MyApplications/MyApplications.jsx";
import EmployerDashboard from "./pages/EmployerDashboard/EmployerDashboard.jsx";
import CreateJob from "./pages/CreateJob/CreateJob.jsx";
import ViewApplicants from "./pages/ViewApplicants/ViewApplicants.jsx";
import About from "./pages/About/About.jsx";
import Contact from "./pages/Contact/Contact.jsx";

const App = () => {
  return (
      <Router>
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={< About />} />
          <Route path="/contact" element={< Contact />} />
          <Route path="/myapplications" element={<MyApplications />} />
          <Route path="/employerdashboard" element={<EmployerDashboard />} />
          <Route path="/createjob" element={<CreateJob />} />
          <Route path="/employer/applicants/:jobId" element={<ViewApplicants />} />

        </Routes>
        <Footer />
      </Router>

  );
};


export default App;
