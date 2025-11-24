import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";

import { FaUsers, FaBriefcase, FaClipboardList, FaEnvelope } from "react-icons/fa";

import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    employers: 0,
    jobs: 0,
    messages: 0,
  });

  const [loading, setLoading] = useState(true);
  const [trendData, setTrendData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/stats", {
          withCredentials: true,
        });

        if (res.data.success) setStats(res.data.stats);

        try {
          const trendRes = await axios.get(
            "http://localhost:3000/api/admin/stats/trends",
            { withCredentials: true }
          );

          if (trendRes?.data?.success) setTrendData(trendRes.data.trends);
        } catch {
          const sample = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            users: [10, 20, 30, 45, 60, stats.users],
            jobs: [5, 12, 9, 14, 18, stats.jobs],
            messages: [2, 5, 6, 8, 10, stats.messages],
          };
          setTrendData(sample);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const lineData =
    trendData && {
      labels: trendData.labels,
      datasets: [
        {
          label: "New Users",
          data: trendData.users,
          borderColor: "#4e73df",
          backgroundColor: "rgba(78,115,223,0.12)",
          tension: 0.3,
        },
        {
          label: "New Jobs",
          data: trendData.jobs,
          borderColor: "#1cc88a",
          backgroundColor: "rgba(28,200,138,0.12)",
          tension: 0.3,
        },
      ],
    };

  const barData =
    trendData && {
      labels: trendData.labels,
      datasets: [
        {
          label: "Jobs",
          data: trendData.jobs,
          backgroundColor: ["#0A66C2","deeppink", "#f1c40f", "#1cc88a"],
        },
      ],
    };

  const pieData = {
    labels: ["Users", "Employers", "Jobs", "Messages"],
    datasets: [
      {
        data: [
          stats.users,
          stats.employers,
          stats.jobs,
          stats.messages,
        ],
        backgroundColor: ["deeppink", "yellow", "green", "#0A66C2"],
      },
    ],
  };

  if (loading) return <p className="loading-text">Loading...</p>;

  return (
    <div className="dashboard-wrap">
      <h2 className="dashboard-title">Overview</h2>

      {/* Top Stat Cards */}
      <div className="cards-grid">
        <div className="stat-card gradient-blue">
          <div className="card-head">
            <FaUsers className="card-icon" />
            <div>
              <div className="card-title">Total Users</div>
              <div className="card-number">
                <CountUp end={stats.users} duration={1.4} />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={() => (window.location.href = "/jobseekers")}>
              View all
            </button>
          </div>
        </div>

        <div className="stat-card gradient-green">
          <div className="card-head">
            <FaBriefcase className="card-icon" />
            <div>
              <div className="card-title">Employers</div>
              <div className="card-number">
                <CountUp end={stats.employers} duration={1.4} />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={() => (window.location.href = "/employers")}>
              View all
            </button>
          </div>
        </div>

        <div className="stat-card gradient-teal">
          <div className="card-head">
            <FaClipboardList className="card-icon" />
            <div>
              <div className="card-title">Jobs</div>
              <div className="card-number">
                <CountUp end={stats.jobs} duration={1.4} />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={() => (window.location.href = "/jobs")}>
              View all
            </button>
          </div>
        </div>

        <div className="stat-card gradient-yellow">
          <div className="card-head">
            <FaEnvelope className="card-icon" />
            <div>
              <div className="card-title">Messages</div>
              <div className="card-number">
                <CountUp end={stats.messages} duration={1.4} />
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button onClick={() => (window.location.href = "/messages")}>
              View all
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <h4>Users & Jobs Trend</h4>
          {lineData ? (
            <Line
              data={lineData}
              options={{
                responsive: true,
                plugins: { legend: { position: "bottom" } },
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        <div className="chart-card">
          <h4>Jobs this period</h4>
          {barData ? (
            <Bar
              data={barData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        <div className="chart-card">
          <h4>Distribution</h4>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
