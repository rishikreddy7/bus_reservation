import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService } from '../services/api';
import '../styles/admin.css';

const AdminPanel = () => {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState('buses');
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form states
  const [busForm, setBusForm] = useState({ busNumber: '', totalSeats: '', busType: 'Deluxe' });
  const [routeForm, setRouteForm] = useState({ source: '', destination: '', travelTime: '' });
  const [scheduleForm, setScheduleForm] = useState({ busId: '', routeId: '', dateOfJourney: '', departureTime: '', arrivalTime: '' });

  useEffect(() => {
    if (activeTab === 'buses') fetchBuses();
    else if (activeTab === 'routes') fetchRoutes();
    else if (activeTab === 'schedules') fetchSchedules();
  }, [activeTab, token]);

  const fetchBuses = async () => {
    setLoading(true);
    try {
      const response = await adminService.getBuses(token);
      setBuses(response.data.buses || []);
    } catch (err) {
      setError('Error fetching buses');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoutes = async () => {
    setLoading(true);
    try {
      const response = await adminService.getRoutes(token);
      setRoutes(response.data.routes || []);
    } catch (err) {
      setError('Error fetching routes');
    } finally {
      setLoading(false);
    }
  };

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await adminService.getSchedules(token);
      setSchedules(response.data.schedules || []);
    } catch (err) {
      setError('Error fetching schedules');
    } finally {
      setLoading(false);
    }
  };

  const handleAddBus = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await adminService.addBus(busForm.busNumber, parseInt(busForm.totalSeats), busForm.busType, token);
      setSuccess('Bus added successfully!');
      setBusForm({ busNumber: '', totalSeats: '', busType: 'Deluxe' });
      fetchBuses();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding bus');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRoute = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await adminService.addRoute(routeForm.source, routeForm.destination, parseInt(routeForm.travelTime), token);
      setSuccess('Route added successfully!');
      setRouteForm({ source: '', destination: '', travelTime: '' });
      fetchRoutes();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding route');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await adminService.addSchedule(
        scheduleForm.busId,
        scheduleForm.routeId,
        scheduleForm.dateOfJourney,
        scheduleForm.departureTime,
        scheduleForm.arrivalTime,
        token
      );
      setSuccess('Schedule added successfully!');
      setScheduleForm({ busId: '', routeId: '', dateOfJourney: '', departureTime: '', arrivalTime: '' });
      fetchSchedules();
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding schedule');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="container"><div className="alert alert-danger">Access denied. Admin only.</div></div>;
  }

  return (
    <div className="container admin-container">
      <h2>Admin Panel</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="admin-tabs">
        <button 
          className={`tab ${activeTab === 'buses' ? 'active' : ''}`}
          onClick={() => setActiveTab('buses')}
        >
          Buses
        </button>
        <button 
          className={`tab ${activeTab === 'routes' ? 'active' : ''}`}
          onClick={() => setActiveTab('routes')}
        >
          Routes
        </button>
        <button 
          className={`tab ${activeTab === 'schedules' ? 'active' : ''}`}
          onClick={() => setActiveTab('schedules')}
        >
          Schedules
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'buses' && (
          <div className="admin-section">
            <h3>Add Bus</h3>
            <form onSubmit={handleAddBus} className="admin-form">
              <div className="form-group">
                <label>Bus Number</label>
                <input
                  type="text"
                  value={busForm.busNumber}
                  onChange={(e) => setBusForm({ ...busForm, busNumber: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Total Seats</label>
                <input
                  type="number"
                  value={busForm.totalSeats}
                  onChange={(e) => setBusForm({ ...busForm, totalSeats: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Bus Type</label>
                <select
                  value={busForm.busType}
                  onChange={(e) => setBusForm({ ...busForm, busType: e.target.value })}
                  className="form-control"
                  required
                >
                  <option value="Deluxe">Deluxe</option>
                  <option value="Sleeper">Sleeper</option>
                  <option value="Standard">Standard</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Bus'}
              </button>
            </form>

            <h3 style={{ marginTop: '30px' }}>Existing Buses</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Bus Number</th>
                    <th>Total Seats</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus._id}>
                      <td>{bus.busNumber}</td>
                      <td>{bus.totalSeats}</td>
                      <td>{bus.busType}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'routes' && (
          <div className="admin-section">
            <h3>Add Route</h3>
            <form onSubmit={handleAddRoute} className="admin-form">
              <div className="form-group">
                <label>Source</label>
                <input
                  type="text"
                  value={routeForm.source}
                  onChange={(e) => setRouteForm({ ...routeForm, source: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Destination</label>
                <input
                  type="text"
                  value={routeForm.destination}
                  onChange={(e) => setRouteForm({ ...routeForm, destination: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Travel Time (minutes)</label>
                <input
                  type="number"
                  value={routeForm.travelTime}
                  onChange={(e) => setRouteForm({ ...routeForm, travelTime: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Route'}
              </button>
            </form>

            <h3 style={{ marginTop: '30px' }}>Existing Routes</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Destination</th>
                    <th>Travel Time (mins)</th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((route) => (
                    <tr key={route._id}>
                      <td>{route.source}</td>
                      <td>{route.destination}</td>
                      <td>{route.travelTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'schedules' && (
          <div className="admin-section">
            <h3>Add Schedule</h3>
            <form onSubmit={handleAddSchedule} className="admin-form">
              <div className="form-group">
                <label>Bus</label>
                <select
                  value={scheduleForm.busId}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, busId: e.target.value })}
                  className="form-control"
                  required
                >
                  <option value="">Select Bus</option>
                  {buses.map((bus) => (
                    <option key={bus._id} value={bus._id}>{bus.busNumber}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Route</label>
                <select
                  value={scheduleForm.routeId}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, routeId: e.target.value })}
                  className="form-control"
                  required
                >
                  <option value="">Select Route</option>
                  {routes.map((route) => (
                    <option key={route._id} value={route._id}>{route.source} → {route.destination}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Date of Journey</label>
                <input
                  type="date"
                  value={scheduleForm.dateOfJourney}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, dateOfJourney: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Departure Time</label>
                <input
                  type="time"
                  value={scheduleForm.departureTime}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, departureTime: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Arrival Time</label>
                <input
                  type="time"
                  value={scheduleForm.arrivalTime}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, arrivalTime: e.target.value })}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Schedule'}
              </button>
            </form>

            <h3 style={{ marginTop: '30px' }}>Existing Schedules</h3>
            {loading ? <p>Loading...</p> : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Bus</th>
                    <th>Route</th>
                    <th>Date</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((schedule) => (
                    <tr key={schedule._id}>
                      <td>{schedule.busId?.busNumber}</td>
                      <td>{schedule.routeId?.source} → {schedule.routeId?.destination}</td>
                      <td>{new Date(schedule.dateOfJourney).toLocaleDateString()}</td>
                      <td>{schedule.departureTime}</td>
                      <td>{schedule.arrivalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
