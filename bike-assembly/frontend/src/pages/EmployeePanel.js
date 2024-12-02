import React, { useEffect, useState } from 'react';
import { fetchUnassembledBikes, assignBike, completeBike, fetchUnderAssemblyBike } from '../services/api';
import Header from '../components/Header';
import { ToastContainer,toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import '../styles/EmployeePanel.scss';

const EmployeePanel = () => {
  const [bikes, setBikes] = useState([]);
  const [currentBike, setCurrentBike] = useState(null);
  const [currentBikeType, setCurrentBikeType] = useState(null);
  const [selectedTime, setSelectedTime] = useState(''); 

  const fetchBikes = async () => {
    try {
      const { data } = await fetchUnassembledBikes();
      setBikes(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch unassembled bikes.");
    }
  };

  const fetchUnderAssembly = async () => {
    try {
      const { data } = await fetchUnderAssemblyBike();
      if (data) {
        setCurrentBike(data._id);
        setCurrentBikeType(data.bikeType);
      }else{
        fetchBikes();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch under-assembly bike.");
    }
  };

  const handleAssign = async (bike) => {
    try {
      await assignBike(bike._id);
      setCurrentBike(bike._id);
      setCurrentBikeType(bike.bikeType);
      toast.success(`Started assembly of bike ${bike.bikeType}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign bike for assembly.");
    }
  };

  const handleComplete = async () => {
    if (!selectedTime) {
      toast.error("Please select a time duration");
      return;
    }
    try {
      await completeBike(currentBike, selectedTime);
      setCurrentBike(null);
      setCurrentBikeType(null);
      setSelectedTime(''); 
      fetchBikes();
      toast.success("Bike assembly completed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error completing bike assembly.");
    }
  };

  useEffect(() => {
    fetchUnderAssembly(); 
  }, []);

  return (
    <div>
      <Header role="employee" />
      <h2>Employee Panel</h2>
      {!currentBike && (
      <div className="bike-tiles">
        {bikes.length === 0 ? (
          <p>No bikes available for assembly.</p>
        ) : (
          bikes.map((bike) => (
            <div key={bike._id} className="bike-tile">
              <h3>{bike.bikeType}</h3>
              <button onClick={() => handleAssign(bike)}>Start Assembly</button>
            </div>
          ))
        )}
      </div>
      )}

      {currentBike && (
        <div className="bike-completion">
          <h3>Currently Assembling: {currentBikeType}</h3>

          <div className="time-dropdown">
            <label htmlFor="time">Select Time:</label>
            <select
              id="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="">Select Time</option>
              <option value="50 minutes">50 minutes</option>
              <option value="1 hour">1 hour</option>
              <option value="1 hour 20 minutes">1 hour 20 minutes</option>
            </select>
          </div>

          <button onClick={handleComplete}>Mark as Complete</button>
        </div>
      )}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={true} />
    </div>
  );
};

export default EmployeePanel;
