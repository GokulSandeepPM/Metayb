import React, { useEffect, useState, useRef } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import Header from '../components/Header';
import { fetchAssemblyStats, fetchEmployeeProductionStats } from '../services/api';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement, // Required for Pie chart
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import '../styles/AdminDashboard.scss'
// Register Chart.js components
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [bikeStats, setBikeStats] = useState([]);
  const [employeeStats, setEmployeeStats] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [bikeChartType, setBikeChartType] = useState('line'); // Toggle between Line, Bar, Pie
  const [employeeChartType, setEmployeeChartType] = useState('bar');

  const bikeChartRef = useRef(null);
  const employeeChartRef = useRef(null);

  useEffect(() => {
    // Initialize default dates
    const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    setFromDate(sevenDaysAgo.toISOString().split('T')[0]);
    setToDate(currentDate.toISOString().split('T')[0]);
    setSelectedDate(currentDate.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    if (fromDate && toDate) {
      // Fetch Bike Assembly Stats
      fetchAssemblyStats(fromDate, toDate)
        .then((response) => {
          setBikeStats(response.data);
          if (bikeChartRef.current) {
            bikeChartRef.current.update(); // Refresh chart when data changes
          }
        })
        .catch((err) => console.error(err));
    }

    if (selectedDate) {
      // Fetch Employee Production Stats
      fetchEmployeeProductionStats(selectedDate)
        .then((response) => {
          setEmployeeStats(response.data);
          if (employeeChartRef.current) {
            employeeChartRef.current.update(); // Refresh chart when data changes
          }
        })
        .catch((err) => console.error(err));
    }
  }, [fromDate, toDate, selectedDate]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  const chartBGColors = [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ];

  const bikeAssemblyChartData = {
    labels: bikeStats.map((stat) => stat._id),
    datasets: [
      {
        label: 'Bikes Assembled',
        data: bikeStats.map((stat) => stat.totalAssembled),
        backgroundColor: bikeChartType === 'pie' ? chartBGColors : 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const employeeProductionChartData = {
    labels: employeeStats.map((stat) => stat.employeeName),
    datasets: [
      {
        label: 'Bikes Assembled',
        data: employeeStats.map((stat) => stat.totalAssembled),
        backgroundColor: employeeChartType === 'pie' ? chartBGColors : 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="admin-dashboard">
      <Header role="admin" />
      <h2>Admin Panel</h2>
      <div className="dashboard-content">
        {/* Left Side: Bike Assembly Stats */}
        <div className="chart-section">
          <h3>Bike Assembly Stats</h3>
          <div>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="chart-toggle">
            <button onClick={() => setBikeChartType('line')}>Line</button>
            <button onClick={() => setBikeChartType('bar')}>Bar</button>
            <button onClick={() => setBikeChartType('pie')}>Pie</button>
          </div>
          <div className="chart-container">
            {bikeChartType === 'line' && (
              <Line
                data={bikeAssemblyChartData}
                options={chartOptions}
                ref={bikeChartRef}
              />
            )}
            {bikeChartType === 'bar' && (
              <Bar
                data={bikeAssemblyChartData}
                options={chartOptions}
                ref={bikeChartRef}
              />
            )}
            {bikeChartType === 'pie' && (
              <Pie
                data={bikeAssemblyChartData}
                options={chartOptions}
                ref={bikeChartRef}
              />
            )}
          </div>
        </div>

        {/* Right Side: Employee Production Stats */}
        <div className="chart-section">
          <h3>Employee Production</h3>
          <div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className="chart-toggle">
            <button onClick={() => setEmployeeChartType('line')}>Line</button>
            <button onClick={() => setEmployeeChartType('bar')}>Bar</button>
            <button onClick={() => setEmployeeChartType('pie')}>Pie</button>
          </div>
          <div className="chart-container">
            {employeeChartType === 'line' && (
              <Line
                data={employeeProductionChartData}
                options={chartOptions}
                ref={employeeChartRef}
              />
            )}
            {employeeChartType === 'bar' && (
              <Bar
                data={employeeProductionChartData}
                options={chartOptions}
                ref={employeeChartRef}
              />
            )}
            {employeeChartType === 'pie' && (
              <Pie
                data={employeeProductionChartData}
                options={chartOptions}
                ref={employeeChartRef}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
