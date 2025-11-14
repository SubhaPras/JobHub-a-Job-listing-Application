import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Jobs.css";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/jobs/getalljobs", {
        withCredentials: true,
      });
      if (res.data.success) {
        setJobs(res.data.jobs);
        setFilteredJobs(res.data.jobs);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    let result = jobs.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchesLocation = job.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const matchesType =
        filters.jobType === "" || job.jobType === filters.jobType;
      return matchesKeyword && matchesLocation && matchesType;
    });
    setFilteredJobs(result);
  };

  const resetFilters = () => {
    setFilters({ keyword: "", location: "", jobType: "" });
    setFilteredJobs(jobs);
  };

  return (
    <div className="jobs-page">
      <div className="filters-container">
        <h2 className="filter-title">Find Your Next Job</h2>

        <div className="filter-fields">
          <input
            type="text"
            name="keyword"
            placeholder="Search title or description"
            value={filters.keyword}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          <select
            name="jobType"
            value={filters.jobType}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="Remote">Romote</option>
          </select>

          <div className="filter-actions">
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
            <button className="reset-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="jobs-grid">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job._id} className="job-card">
              <div className="job-header">
                <h3>{job.title}</h3>
                <span className="job-type">{job.jobType}</span>
              </div>

              <p className="company">Posted by {job.employer?.name}</p>

              <p className="location">📍 {job.location}</p>

              <p className="desc">
                {job.description?.slice(0, 30)}...
              </p>

              <div className="salary-row">
                💰 {job.salaryRange.min} - {job.salaryRange.max}
              </div>

              <button
                className="details-btn"
                onClick={() => navigate(`/jobs/${job._id}`)}
              >
                View Details
              </button>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
