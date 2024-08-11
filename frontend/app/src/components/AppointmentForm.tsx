import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AppointmentFormProps {
  onClose?: () => void; 
  onUpdate?: () => void; 
  isAddForm: boolean; 
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({
  onClose,
  onUpdate,
  isAddForm,
}) => {
  const [date, setDate] = useState('');
  const [service, setService] = useState('Consultation');
  const [doctor, setDoctor] = useState('Dr. John Doe');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const appointmentData = {
      date,
      service,
      doctor,
      startTime,
      endTime,
    };

    try {
      const url = 'http://host.docker.internal:5000/api/bookings';
      await axios.post(url, appointmentData);
      toast.success(isAddForm ? 'Appointment added successfully!' : 'Appointment booked successfully!');
      if (isAddForm) {
        onUpdate && onUpdate(); 
        onClose && onClose(); 
      } else {
        setDate('');
        setService('Consultation');
        setDoctor('Dr. John Doe');
        setStartTime('');
        setEndTime('');
        window.location.href = '/BookingList'; 
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to save appointment. Please try again.');
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
      {isAddForm && onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      )}
      <h3 className="text-2xl font-bold mb-4 text-gray-900 text-center">
        {isAddForm ? 'Add New Appointment' : 'Book an Appointment'}
      </h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Consultation</option>
            <option>Checkup</option>
            <option>Surgery</option>
            <option>Therapy</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Doctor</label>
          <select
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Dr. John Doe</option>
            <option>Dr. Jane Smith</option>
            <option>Dr. Albert Brown</option>
            <option>Dr. Nancy White</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full px-4 py-2 mt-2 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isAddForm ? 'Add Appointment' : 'Book Now'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AppointmentForm;
